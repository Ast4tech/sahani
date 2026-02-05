import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import {
	Calendar,
	CheckCircle2,
	ChevronRight,
	Download,
	Lightbulb,
	Loader2,
	Plus,
	Printer,
	Search,
	Settings,
	Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/shopping")({
	component: ShoppingListPage,
});

function ShoppingListPage() {
	const { data: session, isPending: sessionPending } = authClient.useSession();
	const navigate = useNavigate();
	const shoppingLists = useQuery(api.shoppingLists.list);
	const toggleItem = useMutation(api.shoppingLists.toggleItem);
	const deleteList = useMutation(api.shoppingLists.deleteList);
	
	const [searchQuery, setSearchQuery] = useState("");

	const currentList = useMemo(() => {
		return shoppingLists?.[0] || null;
	}, [shoppingLists]);

	const filteredItems = useMemo(() => {
		if (!currentList) return [];
		if (!searchQuery) return currentList.items;
		return currentList.items.filter(item => 
			item.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [currentList, searchQuery]);

	const handleToggle = async (index: number) => {
		if (!currentList) return;
		await toggleItem({
			listId: currentList._id,
			itemIndex: index
		});
	};

	const handleDelete = async () => {
		if (!currentList) return;
		if (confirm("Are you sure you want to delete this shopping list?")) {
			await deleteList({ id: currentList._id });
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
			<Sidebar userName={session.user.name} activePath="/shopping" />

			<main className="flex-1 ml-64 flex overflow-hidden h-screen">
				{/* Column 2: Main List */}
				<div className="flex-1 flex flex-col bg-[#F8F9FA] overflow-y-auto">
					<div className="p-8 pb-4">
						<div className="flex items-start justify-between mb-2">
							<div>
								<h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">
									{currentList ? currentList.name : "Shopping List"}
								</h1>
								<p className="text-sm text-[#4A5568] mt-1 font-medium">
									{currentList 
										? `${currentList.items.filter(i => !i.checked).length} items pending.`
										: "No active shopping list. Generate one from the planner!"}
								</p>
							</div>
							<div className="flex gap-3">
								<Button 
									variant="outline" 
									className="rounded-xl border-[#E2E8F0] bg-white h-11 font-bold text-[#1A1A1A]"
									onClick={() => navigate({ to: "/meal-planner" })}
								>
									<Calendar className="w-4 h-4 mr-2" />
									Plan Week
								</Button>
								{currentList && (
									<Button 
										variant="ghost" 
										className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 h-11 px-4 font-bold"
										onClick={handleDelete}
									>
										<Trash2 className="w-5 h-5" />
									</Button>
								)}
							</div>
						</div>

						{currentList && (
							<>
								<div className="relative mt-6 mb-8">
									<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0AEC0]" />
									<Input 
										placeholder="Search for items..." 
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="h-14 pl-12 bg-white border-[#E2E8F0] rounded-2xl shadow-sm focus-visible:ring-[#13EC5B]/50 text-lg"
									/>
								</div>

								<div className="space-y-6 pb-10">
									<div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
										<div className="px-6 py-4 flex items-center justify-between border-b border-[#F8F9FA]">
											<div className="flex items-center gap-3">
												<div className="w-1 h-6 rounded-full bg-[#13EC5B]" />
												<h3 className="font-black text-[#1A1A1A]">Ingredients</h3>
											</div>
										</div>
										<div className="divide-y divide-[#F8F9FA]">
											{filteredItems.length === 0 ? (
												<div className="p-10 text-center">
													<p className="text-[#A0AEC0] font-bold">No items found.</p>
												</div>
											) : (
												filteredItems.map((item, idx) => (
													<div 
														key={`${item.name}-${idx}`} 
														className={`p-6 flex items-center justify-between group transition-colors ${item.checked ? 'bg-[#F8F9FA]/50' : 'hover:bg-[#F8F9FA]'}`}
													>
														<div className="flex items-center gap-4">
															<div 
																onClick={() => handleToggle(idx)}
																className={`w-7 h-7 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all ${
																	item.checked 
																		? "border-[#13EC5B] bg-[#13EC5B]" 
																		: "border-[#E2E8F0] bg-white hover:border-[#13EC5B]"
																}`}
															>
																{item.checked && <CheckCircle2 className="w-5 h-5 text-white" />}
															</div>
															<div>
																<p className={`font-bold transition-all ${item.checked ? 'text-[#A0AEC0] line-through' : 'text-[#1A1A1A]'}`}>
																	{item.name}
																</p>
																<p className="text-xs text-[#A0AEC0] font-medium mt-0.5">
																	{item.amount} {item.unit}
																</p>
															</div>
														</div>
													</div>
												))
											)}
										</div>
									</div>
								</div>
							</>
						)}

						{!currentList && shoppingLists !== undefined && (
							<div className="mt-20 text-center max-w-md mx-auto">
								<div className="w-20 h-20 bg-[#F8F9FA] rounded-3xl flex items-center justify-center mx-auto mb-6">
									<Calendar className="w-10 h-10 text-[#A0AEC0]" />
								</div>
								<h2 className="text-2xl font-black text-[#1A1A1A] mb-2">No shopping list yet</h2>
								<p className="text-[#4A5568] font-medium mb-8">
									Go to your meal planner to select your recipes for the week, then click "Generate Shopping List".
								</p>
								<Button 
									onClick={() => navigate({ to: "/meal-planner" })}
									className="bg-[#13EC5B] hover:bg-[#10B981] text-[#1A1A1A] rounded-2xl h-14 px-8 font-black shadow-lg shadow-[#13EC5B]/20"
								>
									Open Meal Planner
								</Button>
							</div>
						)}
					</div>
				</div>

				{/* Column 3: Stats & Actions */}
				<div className="w-[380px] bg-white border-l border-[#E2E8F0] p-8 flex flex-col gap-8 overflow-y-auto">
					<div className="flex gap-3">
						<Button variant="outline" className="flex-1 rounded-xl border-[#E2E8F0] font-bold h-12" disabled={!currentList}>
							<Printer className="w-4 h-4 mr-2" />
							Print
						</Button>
						<Button variant="outline" className="flex-1 rounded-xl border-[#E2E8F0] font-bold h-12" disabled={!currentList}>
							<Download className="w-4 h-4 mr-2" />
							Export
						</Button>
					</div>

					{currentList && (
						<div className="bg-[#F8F9FA] rounded-3xl border border-[#E2E8F0] p-6">
							<div className="flex items-center justify-between mb-6">
								<h3 className="font-black text-[#1A1A1A] text-lg">List Summary</h3>
								<Settings className="w-5 h-5 text-[#A0AEC0] cursor-pointer hover:text-[#1A1A1A] transition-colors" />
							</div>

							<div className="text-center mb-6">
								<p className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-widest mb-1">Progress</p>
								<p className="text-4xl font-black text-[#1A1A1A]">
									{Math.round((currentList.items.filter(i => i.checked).length / currentList.items.length) * 100)}%
								</p>
								<p className="text-[11px] font-bold text-[#4A5568] mt-1">
									<span className="text-[#1A1A1A]">{currentList.items.filter(i => i.checked).length}</span> of {currentList.items.length} items collected
								</p>
							</div>

							<div className="relative pt-1">
								<div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-[#E2E8F0]">
									<div 
										style={{ width: `${(currentList.items.filter(i => i.checked).length / currentList.items.length) * 100}%` }} 
										className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#13EC5B] rounded-full transition-all duration-500"
									></div>
								</div>
							</div>
						</div>
					)}

					<div className="bg-[#13EC5B]/5 border border-[#13EC5B]/20 rounded-3xl p-6 relative overflow-hidden">
						<div className="flex items-start gap-4 relative z-10">
							<div className="w-12 h-12 bg-[#13EC5B] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#13EC5B]/20">
								<Lightbulb className="w-6 h-6 text-white" />
							</div>
							<div>
								<h4 className="font-black text-[#1A1A1A] text-sm">Pro Tip</h4>
								<p className="text-xs text-[#4A5568] font-medium mt-1 leading-relaxed">
									Shop the perimeter of the grocery store first for fresh produce, meat, and dairy.
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
