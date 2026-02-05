import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import {
	ArrowLeft,
	ChefHat,
	Clock,
	Loader2,
	Plus,
	Trash2,
	Utensils,
} from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";

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
	tags: z.string().optional(),
	ingredients: z.array(z.object({
		name: z.string().min(1, "Ingredient name required"),
		amount: z.string().min(1, "Amount required"),
		unit: z.string().optional(),
	})),
	instructions: z.string().min(10, "Instructions must be at least 10 characters"),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

export const Route = createFileRoute("/recipes/new")({
	component: CreateRecipePage,
});

function CreateRecipePage() {
	const { data: session, isPending: sessionPending } = authClient.useSession();
	const navigate = useNavigate();
	const createRecipe = useMutation(api.recipes.create);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RecipeFormData>({
		resolver: zodResolver(recipeSchema),
		defaultValues: {
			name: "",
			description: "",
			prepTimeMinutes: 0,
			cookTimeMinutes: 0,
			servings: 1,
			calories: 0,
			protein: 0,
			carbs: 0,
			fat: 0,
			imageUrl: "",
			tags: "",
			ingredients: [{ name: "", amount: "", unit: "" }],
			instructions: "",
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "ingredients",
	});

	const onSubmit = async (data: RecipeFormData) => {
		try {
			await createRecipe({
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
				instructions: data.instructions,
				ingredients: data.ingredients,
				tags: data.tags ? data.tags.split(",").map(t => t.trim()) : [],
			});
			navigate({ to: "/recipes" });
		} catch (error) {
			console.error("Failed to create recipe:", error);
		}
	};

	if (sessionPending) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-[#F8F9FA]">
				<Loader2 className="w-8 h-8 text-[#13EC5B] animate-spin" />
			</div>
		);
	}

	if (!session?.user) {
		navigate({ to: "/login" });
		return null;
	}

	return (
		<div className="flex min-h-screen bg-[#F8F9FA]">
			<Sidebar userName={session.user.name} activePath="/recipes" />

			<main className="flex-1 ml-64 p-8">
				<div className="max-w-4xl mx-auto">
					<button
						type="button"
						onClick={() => navigate({ to: "/recipes" })}
						className="flex items-center gap-2 text-sm font-bold text-[#4A5568] hover:text-[#13EC5B] mb-6 transition-colors"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Recipes
					</button>

					<div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
						<div className="p-8 border-b border-[#E2E8F0] bg-[#F8F9FA]">
							<h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight flex items-center gap-3">
								<div className="w-10 h-10 bg-[#13EC5B] rounded-xl flex items-center justify-center">
									<Plus className="w-6 h-6 text-white" />
								</div>
								Create New Recipe
							</h1>
							<p className="text-[#4A5568] mt-2 font-medium">
								Share your culinary masterpiece with the sahani community.
							</p>
						</div>

						<form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
							{/* Basic Info */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2 md:col-span-2">
									<Label htmlFor="name" className="text-sm font-bold text-[#1A1A1A]">Recipe Name</Label>
									<Input
										id="name"
										placeholder="e.g. Chocolate and peanut butter overnight oats"
										{...register("name")}
										className="h-12 border-[#E2E8F0] focus-visible:ring-[#13EC5B]/50"
									/>
									{errors.name && <p className="text-xs text-red-500 font-bold">{errors.name.message}</p>}
								</div>

								<div className="space-y-2 md:col-span-2">
									<Label htmlFor="description" className="text-sm font-bold text-[#1A1A1A]">Description</Label>
									<Textarea
										id="description"
										placeholder="Describe your recipe..."
										{...register("description")}
										className="min-h-[100px] border-[#E2E8F0] focus-visible:ring-[#13EC5B]/50"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="imageUrl" className="text-sm font-bold text-[#1A1A1A]">Image URL</Label>
									<Input
										id="imageUrl"
										placeholder="https://images.unsplash.com/..."
										{...register("imageUrl")}
										className="h-12 border-[#E2E8F0] focus-visible:ring-[#13EC5B]/50"
									/>
									{errors.imageUrl && <p className="text-xs text-red-500 font-bold">{errors.imageUrl.message}</p>}
								</div>

								<div className="space-y-2">
									<Label htmlFor="tags" className="text-sm font-bold text-[#1A1A1A]">Tags (comma separated)</Label>
									<Input
										id="tags"
										placeholder="Vegan, Breakfast, Quick"
										{...register("tags")}
										className="h-12 border-[#E2E8F0] focus-visible:ring-[#13EC5B]/50"
									/>
								</div>
							</div>

							{/* Cooking Details */}
							<div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-[#E2E8F0]">
								<div className="space-y-2">
									<Label htmlFor="prepTimeMinutes" className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
										<Clock className="w-4 h-4 text-blue-500" /> Prep Time (min)
									</Label>
									<Input
										id="prepTimeMinutes"
										type="number"
										{...register("prepTimeMinutes", { valueAsNumber: true })}
										className="h-12 border-[#E2E8F0]"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="cookTimeMinutes" className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
										<Clock className="w-4 h-4 text-orange-500" /> Cook Time (min)
									</Label>
									<Input
										id="cookTimeMinutes"
										type="number"
										{...register("cookTimeMinutes", { valueAsNumber: true })}
										className="h-12 border-[#E2E8F0]"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="servings" className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
										<Utensils className="w-4 h-4 text-[#13EC5B]" /> Servings
									</Label>
									<Input
										id="servings"
										type="number"
										{...register("servings", { valueAsNumber: true })}
										className="h-12 border-[#E2E8F0]"
									/>
								</div>
							</div>

							{/* Nutrition */}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[#E2E8F0]">
								<div className="space-y-2">
									<Label htmlFor="calories" className="text-sm font-bold text-[#1A1A1A]">Calories</Label>
									<Input
										id="calories"
										type="number"
										{...register("calories", { valueAsNumber: true })}
										className="h-12 border-[#E2E8F0]"
									/>
									{errors.calories && <p className="text-xs text-red-500 font-bold">{errors.calories.message}</p>}
								</div>
								<div className="space-y-2">
									<Label htmlFor="protein" className="text-sm font-bold text-[#1A1A1A]">Protein (g)</Label>
									<Input
										id="protein"
										type="number"
										{...register("protein", { valueAsNumber: true })}
										className="h-12 border-[#E2E8F0]"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="carbs" className="text-sm font-bold text-[#1A1A1A]">Carbs (g)</Label>
									<Input
										id="carbs"
										type="number"
										{...register("carbs", { valueAsNumber: true })}
										className="h-12 border-[#E2E8F0]"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="fat" className="text-sm font-bold text-[#1A1A1A]">Fat (g)</Label>
									<Input
										id="fat"
										type="number"
										{...register("fat", { valueAsNumber: true })}
										className="h-12 border-[#E2E8F0]"
									/>
								</div>
							</div>

							{/* Ingredients */}
							<div className="space-y-4 pt-6 border-t border-[#E2E8F0]">
								<div className="flex items-center justify-between">
									<Label className="text-lg font-black text-[#1A1A1A]">Ingredients</Label>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={() => append({ name: "", amount: "", unit: "" })}
										className="border-[#13EC5B] text-[#13EC5B] hover:bg-[#13EC5B]/10 rounded-lg font-bold"
									>
										<Plus className="w-4 h-4 mr-1" /> Add Ingredient
									</Button>
								</div>
								<div className="space-y-3">
									{fields.map((field, index) => (
										<div key={field.id} className="flex gap-3 items-start">
											<div className="flex-1">
												<Input
													placeholder="Ingredient Name (e.g. Rolled oats)"
													{...register(`ingredients.${index}.name` as const)}
													className="h-11 border-[#E2E8F0]"
												/>
												{errors.ingredients?.[index]?.name && (
													<p className="text-[10px] text-red-500 font-bold mt-1">{errors.ingredients[index]?.name?.message}</p>
												)}
											</div>
											<div className="w-24">
												<Input
													placeholder="Amount"
													{...register(`ingredients.${index}.amount` as const)}
													className="h-11 border-[#E2E8F0]"
												/>
											</div>
											<div className="w-24">
												<Input
													placeholder="Unit"
													{...register(`ingredients.${index}.unit` as const)}
													className="h-11 border-[#E2E8F0]"
												/>
											</div>
											{fields.length > 1 && (
												<Button
													type="button"
													variant="ghost"
													size="icon"
													onClick={() => remove(index)}
													className="h-11 w-11 text-[#A0AEC0] hover:text-red-500"
												>
													<Trash2 className="w-5 h-5" />
												</Button>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Instructions */}
							<div className="space-y-2 pt-6 border-t border-[#E2E8F0]">
								<Label htmlFor="instructions" className="text-lg font-black text-[#1A1A1A]">Instructions</Label>
								<p className="text-xs text-[#4A5568] mb-2">Write each step on a new line.</p>
								<Textarea
									id="instructions"
									placeholder="1. Prepare oats...&#10;2. Add milk...&#10;3. Let it sit overnight..."
									{...register("instructions")}
									className="min-h-[200px] border-[#E2E8F0] focus-visible:ring-[#13EC5B]/50 leading-relaxed"
								/>
								{errors.instructions && <p className="text-xs text-red-500 font-bold">{errors.instructions.message}</p>}
							</div>

							<div className="pt-8 flex gap-4">
								<Button
									type="submit"
									disabled={isSubmitting}
									className="flex-1 h-14 bg-[#13EC5B] hover:bg-[#10B981] text-[#1A1A1A] text-lg font-black rounded-2xl shadow-lg shadow-[#13EC5B]/20 transition-all"
								>
									{isSubmitting ? (
										<span className="flex items-center gap-2">
											<Loader2 className="w-5 h-5 animate-spin" /> Saving Recipe...
										</span>
									) : (
										"Create Recipe"
									)}
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => navigate({ to: "/recipes" })}
									className="h-14 px-8 border-[#E2E8F0] text-[#4A5568] font-bold rounded-2xl"
								>
									Cancel
								</Button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}
