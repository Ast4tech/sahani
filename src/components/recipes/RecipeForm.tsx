import { zodResolver } from "@hookform/resolvers/zod";
import {
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
	arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import {
	ArrowLeft,
	ArrowRight,
	Check,
	ChefHat,
	Clock,
	GripVertical,
	Loader2,
	Plus,
	Trash2,
	Upload,
	Utensils,
	X,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RECIPE_TAG_CATEGORIES, encodeTag } from "@/lib/recipe-tags";

// ── Schema ──────────────────────────────────────────────────────────────────
const stepSchema = z.object({
	id: z.string(),
	text: z.string().min(1, "Step text required"),
	imageStorageId: z.string().optional(),
});

const recipeSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),
	description: z.string().optional(),
	prepTimeMinutes: z.number().min(0).optional(),
	cookTimeMinutes: z.number().min(0).optional(),
	servings: z.number().min(1).optional(),
	calories: z.number().min(0),
	protein: z.number().min(0).optional(),
	carbs: z.number().min(0).optional(),
	fat: z.number().min(0).optional(),
	imageUrl: z.string().url("Please enter a valid URL").or(z.string().length(0)).optional(),
	ingredients: z.array(z.object({
		id: z.string(),
		name: z.string().min(1, "Ingredient name required"),
		amount: z.string().min(1, "Amount required"),
		unit: z.string().optional(),
	})),
	steps: z.array(stepSchema).min(1, "At least one instruction step required"),
	tags: z.array(z.string()).optional(),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;

// ── Steps config ────────────────────────────────────────────────────────────
const STEPS = [
	{ id: "basics", label: "Basics", icon: ChefHat },
	{ id: "ingredients", label: "Ingredients", icon: Utensils },
	{ id: "instructions", label: "Instructions", icon: Clock },
	{ id: "nutrition", label: "Nutrition", icon: Check },
] as const;

const STEP_FIELDS: Record<number, (keyof RecipeFormData)[]> = {
	0: ["name"],
	1: ["ingredients"],
	2: ["steps"],
	3: ["calories"],
};

// ── Props ───────────────────────────────────────────────────────────────────
interface RecipeFormProps {
	mode: "create" | "edit";
	initialData?: Partial<RecipeFormData> & { _id?: Id<"recipes">; imageStorageId?: string; instructions?: string };
	onSuccess?: () => void;
}

// ── Sortable Item ───────────────────────────────────────────────────────────
function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};
	return (
		<div ref={setNodeRef} style={style} className="flex items-start gap-2">
			<button type="button" className="mt-3 cursor-grab text-muted-foreground hover:text-foreground touch-none" {...attributes} {...listeners}>
				<GripVertical className="w-4 h-4" />
			</button>
			<div className="flex-1">{children}</div>
		</div>
	);
}

// ── Image Upload ────────────────────────────────────────────────────────────
function ImageUpload({ currentImageUrl, onUploaded }: { currentImageUrl?: string; onUploaded: (storageId: string) => void }) {
	const generateUploadUrl = useMutation(api.recipes.generateUploadUrl);
	const [uploading, setUploading] = useState(false);
	const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
	const [dragOver, setDragOver] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFile = useCallback(async (file: File) => {
		if (!file.type.startsWith("image/")) return;
		if (file.size > 5 * 1024 * 1024) { alert("Image must be under 5MB"); return; }
		setPreview(URL.createObjectURL(file));
		setUploading(true);
		try {
			const uploadUrl = await generateUploadUrl();
			const result = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": file.type }, body: file });
			const { storageId } = await result.json();
			onUploaded(storageId);
		} catch (e) { console.error("Upload failed:", e); }
		finally { setUploading(false); }
	}, [generateUploadUrl, onUploaded]);

	return (
		<div
			className={`relative rounded-2xl border-2 border-dashed transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border"} ${preview ? "p-0 overflow-hidden" : "p-8"}`}
			onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
			onDragLeave={() => setDragOver(false)}
			onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
		>
			{preview ? (
				<div className="relative aspect-video">
					<img src={preview} alt="Recipe preview" className="w-full h-full object-cover" />
					{uploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Loader2 className="w-8 h-8 text-white animate-spin" /></div>}
					<button type="button" onClick={() => { setPreview(null); if (inputRef.current) inputRef.current.value = ""; }} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"><X className="w-4 h-4" /></button>
				</div>
			) : (
				<div className="flex flex-col items-center gap-3 cursor-pointer" onClick={() => inputRef.current?.click()} onKeyDown={() => {}}>
					<div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center"><Upload className="w-7 h-7 text-primary" /></div>
					<p className="text-sm font-bold text-foreground">Drop an image here or click to upload</p>
					<p className="text-xs text-muted-foreground">JPG, PNG, WebP — max 5 MB</p>
				</div>
			)}
			<input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
		</div>
	);
}

// ── Ingredient Combobox ─────────────────────────────────────────────────────
function IngredientCombobox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
	const allIngredients = useQuery(api.recipes.listAllIngredients) ?? [];
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState(value);

	const filtered = useMemo(() => {
		if (!inputValue.trim()) return allIngredients.slice(0, 8);
		const lower = inputValue.toLowerCase();
		return allIngredients.filter((n) => n.toLowerCase().includes(lower)).slice(0, 8);
	}, [inputValue, allIngredients]);

	return (
		<div className="relative">
			<Input
				value={inputValue}
				placeholder={placeholder}
				className="h-11 border-border"
				onChange={(e) => { setInputValue(e.target.value); onChange(e.target.value); setOpen(true); }}
				onFocus={() => setOpen(true)}
				onBlur={() => setTimeout(() => setOpen(false), 150)}
			/>
			{open && filtered.length > 0 && inputValue.trim() && (
				<div className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg max-h-48 overflow-y-auto">
					{filtered.map((name) => (
						<button
							key={name}
							type="button"
							className="w-full text-left px-3 py-2 text-sm hover:bg-secondary transition-colors first:rounded-t-xl last:rounded-b-xl"
							onMouseDown={(e) => { e.preventDefault(); setInputValue(name); onChange(name); setOpen(false); }}
						>
							{name}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

// ── Tag Selector ────────────────────────────────────────────────────────────
function TagSelector({ selectedTags, onChange }: { selectedTags: string[]; onChange: (tags: string[]) => void }) {
	const toggle = (categoryId: string, tag: string) => {
		const encoded = encodeTag(categoryId, tag);
		if (selectedTags.includes(encoded)) {
			onChange(selectedTags.filter((t) => t !== encoded));
		} else {
			onChange([...selectedTags, encoded]);
		}
	};

	return (
		<div className="space-y-4">
			{RECIPE_TAG_CATEGORIES.map((cat) => (
				<div key={cat.id}>
					<p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{cat.label}</p>
					<div className="flex flex-wrap gap-2">
						{cat.tags.map((tag) => {
							const encoded = encodeTag(cat.id, tag);
							const isSelected = selectedTags.includes(encoded);
							return (
								<button
									key={encoded}
									type="button"
									onClick={() => toggle(cat.id, tag)}
									className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
										isSelected
											? "bg-primary text-white shadow-sm"
											: "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
									}`}
								>
									{tag}
								</button>
							);
						})}
					</div>
				</div>
			))}
		</div>
	);
}

// ── Main Component ──────────────────────────────────────────────────────────
export function RecipeForm({ mode, initialData, onSuccess }: RecipeFormProps) {
	const navigate = useNavigate();
	const createRecipe = useMutation(api.recipes.create);
	const updateRecipe = useMutation(api.recipes.update);

	const [step, setStep] = useState(0);
	const [imageStorageId, setImageStorageId] = useState<string | undefined>(initialData?.imageStorageId);

	// Convert legacy initialData
	const defaultSteps = initialData?.steps?.length
		? initialData.steps
		: initialData?.instructions
			? initialData.instructions.split("\n").filter(Boolean).map((text: string) => ({ id: crypto.randomUUID(), text: text.replace(/^\d+\.\s*/, ""), imageStorageId: undefined }))
			: [{ id: crypto.randomUUID(), text: "", imageStorageId: undefined }];

	const defaultIngredients = (initialData?.ingredients?.length
		? initialData.ingredients.map((ing) => ({ ...ing, id: (ing as any).id || crypto.randomUUID() }))
		: [{ id: crypto.randomUUID(), name: "", amount: "", unit: "" }]);

	// Decode legacy comma-separated tags into encoded format
	const defaultTags = initialData?.tags ?? [];

	const {
		register,
		control,
		handleSubmit,
		trigger,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<RecipeFormData>({
		resolver: zodResolver(recipeSchema),
		defaultValues: {
			name: initialData?.name ?? "",
			description: initialData?.description ?? "",
			prepTimeMinutes: initialData?.prepTimeMinutes ?? 0,
			cookTimeMinutes: initialData?.cookTimeMinutes ?? 0,
			servings: initialData?.servings ?? 1,
			calories: initialData?.calories ?? 0,
			protein: initialData?.protein ?? 0,
			carbs: initialData?.carbs ?? 0,
			fat: initialData?.fat ?? 0,
			imageUrl: initialData?.imageUrl ?? "",
			ingredients: defaultIngredients,
			steps: defaultSteps,
			tags: defaultTags,
		},
	});

	const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient, replace: replaceIngredients } = useFieldArray({ control, name: "ingredients" });
	const { fields: stepFields, append: appendStep, remove: removeStep, replace: replaceSteps } = useFieldArray({ control, name: "steps" });
	const watchedTags = watch("tags") ?? [];

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
	);

	const handleIngredientDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const oldIndex = ingredientFields.findIndex((f) => f.id === active.id);
		const newIndex = ingredientFields.findIndex((f) => f.id === over.id);
		replaceIngredients(arrayMove(ingredientFields, oldIndex, newIndex));
	};

	const handleStepDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const oldIndex = stepFields.findIndex((f) => f.id === active.id);
		const newIndex = stepFields.findIndex((f) => f.id === over.id);
		replaceSteps(arrayMove(stepFields, oldIndex, newIndex));
	};

	const goNext = async () => {
		const fieldsToValidate = STEP_FIELDS[step];
		if (fieldsToValidate) {
			const valid = await trigger(fieldsToValidate);
			if (!valid) return;
		}
		setStep((s) => Math.min(s + 1, STEPS.length - 1));
	};

	const goBack = () => setStep((s) => Math.max(s - 1, 0));

	const onSubmit = async (data: RecipeFormData) => {
		try {
			const payload = {
				name: data.name,
				description: data.description,
				prepTimeMinutes: data.prepTimeMinutes,
				cookTimeMinutes: data.cookTimeMinutes,
				servings: data.servings,
				calories: data.calories,
				protein: data.protein,
				carbs: data.carbs,
				fat: data.fat,
				imageUrl: data.imageUrl || undefined,
				imageStorageId: imageStorageId || undefined,
				instructions: data.steps.map((s, i) => `${i + 1}. ${s.text}`).join("\n"),
				ingredients: data.ingredients.map(({ id: _id, ...rest }) => rest),
				tags: data.tags ?? [],
				steps: data.steps.map((s, i) => ({ text: s.text, imageStorageId: s.imageStorageId, order: i })),
			};

			if (mode === "edit" && initialData?._id) {
				await updateRecipe({ id: initialData._id, ...payload });
			} else {
				await createRecipe(payload);
			}

			if (onSuccess) onSuccess();
			else navigate({ to: "/recipes" });
		} catch (error) {
			console.error(`Failed to ${mode} recipe:`, error);
		}
	};

	// ── Progress Bar ────────────────────────────────────────────────────────
	const ProgressBar = () => (
		<div className="flex items-center gap-2 mb-8">
			{STEPS.map((s, i) => {
				const Icon = s.icon;
				const isActive = i === step;
				const isDone = i < step;
				return (
					<div key={s.id} className="flex items-center gap-2 flex-1">
						<button
							type="button"
							onClick={() => i < step && setStep(i)}
							className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all w-full ${
								isActive ? "bg-primary text-white shadow-md shadow-primary/20"
									: isDone ? "bg-primary/10 text-primary cursor-pointer"
									: "bg-secondary text-muted-foreground"
							}`}
						>
							<Icon className="w-4 h-4 flex-shrink-0" />
							<span className="hidden sm:inline">{s.label}</span>
						</button>
						{i < STEPS.length - 1 && <div className={`h-0.5 w-4 flex-shrink-0 rounded ${isDone ? "bg-primary" : "bg-border"}`} />}
					</div>
				);
			})}
		</div>
	);

	// ── Step: Basics ────────────────────────────────────────────────────────
	const StepBasics = () => (
		<div className="space-y-6">
			<div className="space-y-2">
				<Label htmlFor="name" className="text-sm font-bold text-foreground">Recipe Name *</Label>
				<Input id="name" placeholder="e.g. Chocolate and peanut butter overnight oats" {...register("name")} className="h-12 border-border focus-visible:ring-primary/50" />
				{errors.name && <p className="text-xs text-red-500 font-bold">{errors.name.message}</p>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="description" className="text-sm font-bold text-foreground">Description</Label>
				<Textarea id="description" placeholder="Describe your recipe..." {...register("description")} className="min-h-[100px] border-border focus-visible:ring-primary/50" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm font-bold text-foreground">Recipe Image</Label>
				<ImageUpload currentImageUrl={initialData?.imageUrl} onUploaded={setImageStorageId} />
				<div className="flex items-center gap-2 mt-2">
					<span className="text-xs text-muted-foreground">or paste a URL:</span>
					<Input placeholder="https://..." {...register("imageUrl")} className="h-9 text-xs border-border flex-1" />
				</div>
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div className="space-y-2">
					<Label className="text-sm font-bold text-foreground flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500" /> Prep (min)</Label>
					<Input type="number" {...register("prepTimeMinutes", { valueAsNumber: true })} className="h-12 border-border" />
				</div>
				<div className="space-y-2">
					<Label className="text-sm font-bold text-foreground flex items-center gap-2"><Clock className="w-4 h-4 text-orange-500" /> Cook (min)</Label>
					<Input type="number" {...register("cookTimeMinutes", { valueAsNumber: true })} className="h-12 border-border" />
				</div>
				<div className="space-y-2">
					<Label className="text-sm font-bold text-foreground flex items-center gap-2"><Utensils className="w-4 h-4 text-primary" /> Servings</Label>
					<Input type="number" {...register("servings", { valueAsNumber: true })} className="h-12 border-border" />
				</div>
			</div>
		</div>
	);

	// ── Step: Ingredients (with DnD + autocomplete) ─────────────────────────
	const StepIngredients = () => (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<Label className="text-lg font-black text-foreground">Ingredients</Label>
				<Button type="button" variant="outline" size="sm" onClick={() => appendIngredient({ id: crypto.randomUUID(), name: "", amount: "", unit: "" })} className="border-primary text-primary hover:bg-primary/10 rounded-lg font-bold">
					<Plus className="w-4 h-4 mr-1" /> Add
				</Button>
			</div>
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleIngredientDragEnd}>
				<SortableContext items={ingredientFields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
					<div className="space-y-3">
						{ingredientFields.map((field, index) => (
							<SortableItem key={field.id} id={field.id}>
								<div className="flex gap-3 items-start">
									<div className="flex-1">
										<IngredientCombobox
											value={field.name}
											onChange={(v) => setValue(`ingredients.${index}.name`, v, { shouldValidate: false })}
											placeholder="Ingredient (e.g. Rolled oats)"
										/>
										{errors.ingredients?.[index]?.name && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.ingredients[index]?.name?.message}</p>}
									</div>
									<div className="w-24">
										<Input placeholder="Amount" {...register(`ingredients.${index}.amount` as const)} className="h-11 border-border" />
									</div>
									<div className="w-24">
										<Input placeholder="Unit" {...register(`ingredients.${index}.unit` as const)} className="h-11 border-border" />
									</div>
									{ingredientFields.length > 1 && (
										<Button type="button" variant="ghost" size="icon" onClick={() => removeIngredient(index)} className="h-11 w-11 text-muted-foreground hover:text-red-500">
											<Trash2 className="w-4 h-4" />
										</Button>
									)}
								</div>
							</SortableItem>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);

	// ── Step: Instructions (structured step builder with DnD) ────────────────
	const StepInstructions = () => (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<Label className="text-lg font-black text-foreground">Instructions</Label>
				<Button type="button" variant="outline" size="sm" onClick={() => appendStep({ id: crypto.randomUUID(), text: "", imageStorageId: undefined })} className="border-primary text-primary hover:bg-primary/10 rounded-lg font-bold">
					<Plus className="w-4 h-4 mr-1" /> Add Step
				</Button>
			</div>
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleStepDragEnd}>
				<SortableContext items={stepFields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
					<div className="space-y-4">
						{stepFields.map((field, index) => (
							<SortableItem key={field.id} id={field.id}>
								<div className="bg-secondary border border-border rounded-2xl p-4">
									<div className="flex items-center justify-between mb-2">
										<span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">Step {index + 1}</span>
										{stepFields.length > 1 && (
											<Button type="button" variant="ghost" size="icon" onClick={() => removeStep(index)} className="h-8 w-8 text-muted-foreground hover:text-red-500">
												<Trash2 className="w-4 h-4" />
											</Button>
										)}
									</div>
									<Textarea
										placeholder={`Describe step ${index + 1}...`}
										{...register(`steps.${index}.text` as const)}
										className="min-h-[80px] border-border focus-visible:ring-primary/50 bg-card"
									/>
									{errors.steps?.[index]?.text && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.steps[index]?.text?.message}</p>}
								</div>
							</SortableItem>
						))}
					</div>
				</SortableContext>
			</DndContext>
			{errors.steps?.message && <p className="text-xs text-red-500 font-bold">{errors.steps.message}</p>}
		</div>
	);

	// ── Step: Nutrition & Tags ──────────────────────────────────────────────
	const StepNutrition = () => (
		<div className="space-y-6">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
				<div className="space-y-2">
					<Label className="text-sm font-bold text-foreground">Calories *</Label>
					<Input type="number" {...register("calories", { valueAsNumber: true })} className="h-12 border-border" />
					{errors.calories && <p className="text-xs text-red-500 font-bold">{errors.calories.message}</p>}
				</div>
				<div className="space-y-2">
					<Label className="text-sm font-bold text-foreground">Protein (g)</Label>
					<Input type="number" {...register("protein", { valueAsNumber: true })} className="h-12 border-border" />
				</div>
				<div className="space-y-2">
					<Label className="text-sm font-bold text-foreground">Carbs (g)</Label>
					<Input type="number" {...register("carbs", { valueAsNumber: true })} className="h-12 border-border" />
				</div>
				<div className="space-y-2">
					<Label className="text-sm font-bold text-foreground">Fat (g)</Label>
					<Input type="number" {...register("fat", { valueAsNumber: true })} className="h-12 border-border" />
				</div>
			</div>

			<div className="pt-6 border-t border-border">
				<Label className="text-lg font-black text-foreground mb-4 block">Tags</Label>
				<TagSelector selectedTags={watchedTags} onChange={(tags) => setValue("tags", tags)} />
			</div>
		</div>
	);

	const stepContent = [<StepBasics key="b" />, <StepIngredients key="i" />, <StepInstructions key="s" />, <StepNutrition key="n" />];
	const isLastStep = step === STEPS.length - 1;

	return (
		<div className="max-w-4xl mx-auto">
			<button type="button" onClick={() => navigate({ to: "/recipes" })} className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary mb-6 transition-colors">
				<ArrowLeft className="w-4 h-4" /> Back to Recipes
			</button>

			<div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
				<div className="p-8 border-b border-border bg-secondary">
					<h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-3">
						<div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
							{mode === "edit" ? <ChefHat className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
						</div>
						{mode === "edit" ? "Edit Recipe" : "Create New Recipe"}
					</h1>
					<p className="text-muted-foreground mt-2 font-medium">
						{mode === "edit" ? "Update your recipe details below." : "Share your culinary masterpiece with the sahani community."}
					</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="p-8">
					<ProgressBar />
					<div className="min-h-[320px]">{stepContent[step]}</div>

					<div className="pt-8 flex gap-4 border-t border-border mt-8">
						{step > 0 && (
							<Button type="button" variant="outline" onClick={goBack} className="h-14 px-8 border-border text-muted-foreground font-bold rounded-2xl">
								<ArrowLeft className="w-4 h-4 mr-2" /> Back
							</Button>
						)}
						<div className="flex-1" />
						{!isLastStep ? (
							<Button type="button" onClick={goNext} className="h-14 px-8 bg-primary hover:bg-sahani-green-hover text-foreground text-lg font-black rounded-2xl shadow-lg shadow-primary/20">
								Next <ArrowRight className="w-4 h-4 ml-2" />
							</Button>
						) : (
							<Button type="submit" disabled={isSubmitting} className="flex-1 h-14 bg-primary hover:bg-sahani-green-hover text-foreground text-lg font-black rounded-2xl shadow-lg shadow-primary/20 transition-all">
								{isSubmitting ? <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Saving...</span> : mode === "edit" ? "Update Recipe" : "Create Recipe"}
							</Button>
						)}
						<Button type="button" variant="outline" onClick={() => navigate({ to: "/recipes" })} className="h-14 px-8 border-border text-muted-foreground font-bold rounded-2xl">
							Cancel
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
