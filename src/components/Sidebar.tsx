import { Link } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import {
	BookOpen,
	CalendarDays,
	LayoutDashboard,
	LogOut,
	PieChart,
	Plus,
	ShoppingCart,
	Sparkles,
	User,
} from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface SidebarProps {
	userName?: string | null;
	activePath: string;
}

export function Sidebar({ userName, activePath }: SidebarProps) {
	const shoppingLists = useQuery(api.shoppingLists.list);
	
	const pendingItemsCount = useMemo(() => {
		const currentList = shoppingLists?.[0];
		if (!currentList) return 0;
		return currentList.items.filter(i => !i.checked).length;
	}, [shoppingLists]);

	const navItems = [
		{ icon: LayoutDashboard, label: "Dashboard", href: "/", active: false },
		{
			icon: CalendarDays,
			label: "Weekly Planner",
			href: "/meal-planner",
			active: true,
		},
		{ icon: BookOpen, label: "Recipes", href: "/recipes", active: false },
		{
			icon: ShoppingCart,
			label: "Shopping List",
			href: "/shopping",
			active: false,
			badge: pendingItemsCount > 0 ? pendingItemsCount : undefined,
		},
		{ icon: PieChart, label: "Nutrition", href: "/nutrition", active: false },
		{ icon: User, label: "User Account", href: "/account", active: false },
	];

	return (
		<aside className="w-64 bg-white border-r border-[#E2E8F0] flex flex-col fixed h-full z-30">
			<link
				href="https://fonts.googleapis.com/icon?family=Material+Icons"
				rel="stylesheet"
			/>
			
			<div className="p-6 flex items-center gap-2">
				<Link to="/" className="flex items-center gap-2">
					<div className="w-8 h-8 bg-[#13EC5B] rounded-lg flex items-center justify-center">
						<span className="material-icons text-white text-lg">
							restaurant_menu
						</span>
					</div>
					<span className="font-bold text-lg text-[#1A1A1A]">sahani</span>
				</Link>
			</div>

			<div className="px-6 py-4">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#13EC5B]/20 to-[#13EC5B]/10 flex items-center justify-center">
						<span className="text-sm font-bold text-[#1A1A1A]">
							{userName?.charAt(0).toUpperCase() || "U"}
						</span>
					</div>
					<div className="min-w-0">
						<p className="font-semibold text-sm text-[#1A1A1A] truncate">
							{userName || "User"}
						</p>
						<Link
							to="/account"
							className="text-xs text-[#4A5568] hover:text-[#13EC5B] flex items-center gap-1 transition-colors"
						>
							Edit profile <span className="text-[10px]">✎</span>
						</Link>
					</div>
				</div>
			</div>

			<div className="px-6 py-3">
				<Button asChild className="w-full bg-[#13EC5B] hover:bg-[#10B981] text-[#1A1A1A] rounded-xl h-12 font-bold shadow-lg shadow-[#13EC5B]/20 transition-all">
					<Link to="/recipes/new">
						<Plus className="w-5 h-5 mr-2" />
						Add New Recipe
					</Link>
				</Button>
			</div>

			<nav className="flex-1 px-4 py-4 overflow-y-auto">
				<p className="text-xs font-bold text-[#A0AEC0] uppercase tracking-wider mb-3 px-2">
					Menu
				</p>
				<ul className="space-y-1">
					{navItems.map((item) => {
						const isActive = activePath === item.href;
						return (
							<li key={item.label}>
								<Link
									to={item.href}
									className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
										isActive
											? "bg-[#13EC5B]/10 text-[#1A1A1A]"
											: "text-[#4A5568] hover:bg-[#F8F9FA] hover:text-[#1A1A1A]"
									}`}
								>
									<item.icon className={`w-5 h-5 ${isActive ? "text-[#13EC5B]" : ""}`} />
									<span>{item.label}</span>
									{item.badge && (
										<span className="ml-auto bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
											{item.badge}
										</span>
									)}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			<div className="p-4 mx-4 mb-4">
				<div className="bg-[#F8F9FA] border border-[#E2E8F0] rounded-2xl p-4">
					<div className="flex items-center gap-2 mb-1">
						<Sparkles className="w-4 h-4 text-[#13EC5B]" />
						<p className="font-bold text-sm text-[#1A1A1A]">Pro Plan</p>
					</div>
					<p className="text-xs text-[#4A5568] mt-1">
						Get unlimited AI recipes and insights
					</p>
					<Button
						variant="outline"
						size="sm"
						className="mt-3 w-full bg-white border-[#E2E8F0] text-[#1A1A1A] font-bold hover:bg-[#13EC5B] hover:border-[#13EC5B] rounded-lg transition-all"
					>
						Upgrade
					</Button>
				</div>
			</div>

			<div className="p-4 border-t border-[#E2E8F0]">
				<button
					type="button"
					onClick={() => authClient.signOut()}
					className="flex items-center gap-3 px-2 py-2 text-sm font-bold text-[#4A5568] hover:text-[#EF4444] transition-colors w-full text-left"
				>
					<LogOut className="w-5 h-5" />
					<span>Logout</span>
				</button>
			</div>
		</aside>
	);
}
