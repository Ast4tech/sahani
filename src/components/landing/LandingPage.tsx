import { Link } from "@tanstack/react-router";
import {
	BarChart2,
	BookOpen,
	CalendarDays,
	ChevronDown,
	Menu,
	ShoppingCart,
	Utensils,
	UtensilsCrossed,
	X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// ─── Navigation ──────────────────────────────────────────────────────────────

const NAV_LINKS = [
	{ label: "Features", href: "#features" },
	{ label: "How It Works", href: "#how-it-works" },
	{ label: "Recipes", href: "#recipes" },
];

function LandingNav() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link to="/" className="flex items-center gap-2">
						<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
							<Utensils className="w-4 h-4 text-white" />
						</div>
						<span className="font-bold text-lg text-foreground">sahani</span>
					</Link>

					{/* Desktop links */}
					<div className="hidden md:flex items-center gap-8">
						{NAV_LINKS.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
							>
								{link.label}
							</a>
						))}
					</div>

					{/* Desktop auth */}
					<div className="hidden md:flex items-center gap-4">
						<Link
							to="/login"
							className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
						>
							Login
						</Link>
						<Link to="/signup">
							<Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg px-5 py-2 text-sm">
								Sign Up
							</Button>
						</Link>
					</div>

					{/* Mobile hamburger */}
					<button
						type="button"
						className="md:hidden p-2 rounded-lg hover:bg-secondary"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? (
							<X className="w-5 h-5 text-muted-foreground" />
						) : (
							<Menu className="w-5 h-5 text-muted-foreground" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			{mobileMenuOpen && (
				<div className="md:hidden bg-card border-t border-border">
					<div className="px-4 py-4 space-y-3">
						{NAV_LINKS.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="block text-sm font-medium text-muted-foreground hover:text-primary py-2"
								onClick={() => setMobileMenuOpen(false)}
							>
								{link.label}
							</a>
						))}
						<div className="pt-3 border-t border-border space-y-3">
							<Link
								to="/login"
								className="block text-sm font-medium text-muted-foreground hover:text-primary py-2"
							>
								Login
							</Link>
							<Link to="/signup" className="block">
								<Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg">
									Sign Up
								</Button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
	{ icon: <CalendarDays className="w-4 h-4" />, label: "Weekly meal planner" },
	{ icon: <BarChart2 className="w-4 h-4" />, label: "Nutrition tracking" },
	{ icon: <ShoppingCart className="w-4 h-4" />, label: "Auto shopping lists" },
];

function LandingHero() {
	return (
		<section className="pt-24 pb-16 lg:pt-28 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-card">
			<div className="max-w-7xl mx-auto">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left: copy */}
					<div>
						<p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
							Meal planning, simplified
						</p>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
							Take Control of{" "}
							<span className="text-primary">Your Nutrition</span>
						</h1>
						<p className="text-base text-muted-foreground mb-8 max-w-md leading-relaxed">
							Plan your week, discover recipes, and track your macros — all in
							one place. No spreadsheets, no guesswork.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 mb-10">
							<Link to="/signup">
								<Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg px-6 py-3 text-sm">
									Start Planning Free
								</Button>
							</Link>
							<a href="#how-it-works">
								<Button
									variant="outline"
									className="border-border text-foreground hover:bg-secondary rounded-lg px-6 py-3 text-sm"
								>
									<ChevronDown className="w-4 h-4 mr-2" />
									See How It Works
								</Button>
							</a>
						</div>

						{/* Trust strip */}
						<div className="flex flex-wrap gap-5">
							{TRUST_ITEMS.map((item) => (
								<div
									key={item.label}
									className="flex items-center gap-2 text-sm text-muted-foreground"
								>
									<span className="text-primary">{item.icon}</span>
									{item.label}
								</div>
							))}
						</div>
					</div>

					{/* Right: product preview placeholder */}
					<div className="relative">
						<div className="relative rounded-2xl overflow-hidden shadow-lg bg-secondary aspect-[4/3] flex items-center justify-center">
							<div className="text-center text-muted-foreground p-8">
								<CalendarDays className="w-16 h-16 mx-auto mb-4 text-primary/40" />
								<p className="text-sm font-medium">Weekly Planner Preview</p>
								<p className="text-xs mt-1 text-muted-foreground/60">
									Replace with screenshot
								</p>
							</div>
						</div>
						{/* Floating badge */}
						<div className="absolute -bottom-4 left-4 bg-card rounded-lg shadow-lg px-4 py-3 flex items-center gap-3">
							<div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
								<CalendarDays className="w-5 h-5 text-primary" />
							</div>
							<div>
								<p className="text-xs text-muted-foreground uppercase tracking-wide">
									Setup time
								</p>
								<p className="text-sm font-semibold text-foreground">
									Under 5 minutes
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── How It Works ─────────────────────────────────────────────────────────────

const HOW_IT_WORKS_STEPS = [
	{
		icon: <CalendarDays className="w-6 h-6 text-primary" />,
		title: "Plan Your Week",
		description:
			"Add meals to your weekly schedule — breakfast through dinner. Switch to daily view for a closer look.",
	},
	{
		icon: <UtensilsCrossed className="w-6 h-6 text-primary" />,
		title: "Discover Recipes",
		description:
			"Browse 100+ recipes, save your favourites, and fill your plan with meals you'll actually enjoy.",
	},
	{
		icon: <BarChart2 className="w-6 h-6 text-primary" />,
		title: "Track Your Nutrition",
		description:
			"Set daily goals for calories, protein, carbs, and fats. Watch your macros stack up across the week.",
	},
];

function LandingHowItWorks() {
	return (
		<section
			id="how-it-works"
			className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-secondary"
		>
			<div className="max-w-7xl mx-auto">
				<div className="text-center max-w-xl mx-auto mb-12">
					<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
						How it works
					</h2>
					<p className="text-base text-muted-foreground">
						Three steps from zero to a week of meals you're excited about.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{HOW_IT_WORKS_STEPS.map((step, i) => (
						<div key={step.title} className="bg-card rounded-xl p-6 text-left">
							<div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
								{step.icon}
							</div>
							<p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">
								Step {i + 1}
							</p>
							<h3 className="text-lg font-semibold text-foreground mb-2">
								{step.title}
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Feature Sections ─────────────────────────────────────────────────────────

type Feature = {
	id: string;
	headline: string;
	body: string;
	icon: React.ReactNode;
	imageAlt: string;
	reverse?: boolean;
};

const FEATURES: Feature[] = [
	{
		id: "features",
		headline: "Plan every meal, for every day",
		body: "See your whole week at a glance. Add breakfast, lunch, dinner, and snacks — then drag and rearrange as your week changes. Switch between weekly overview and daily detail view.",
		icon: <CalendarDays className="w-8 h-8 text-primary" />,
		imageAlt: "Weekly meal planner grid",
		reverse: false,
	},
	{
		id: "shopping",
		headline: "Your grocery list writes itself",
		body: "When your week is planned, sahani consolidates every ingredient across all your recipes into a single shopping list. One click. No duplicates, no forgotten items.",
		icon: <ShoppingCart className="w-8 h-8 text-primary" />,
		imageAlt: "Shopping list view",
		reverse: true,
	},
	{
		id: "nutrition",
		headline: "See exactly what you're eating",
		body: "Set daily targets for calories, protein, carbs, and fats. Track your weekly trends and spot where you're hitting — or missing — your goals with clear, visual breakdowns.",
		icon: <BarChart2 className="w-8 h-8 text-primary" />,
		imageAlt: "Nutrition analytics dashboard",
		reverse: false,
	},
	{
		id: "recipes",
		headline: "100+ recipes and growing",
		body: "Search, filter by category, and save your favourites. A living collection that keeps expanding — so your week never looks the same twice.",
		icon: <BookOpen className="w-8 h-8 text-primary" />,
		imageAlt: "Recipe discovery grid",
		reverse: true,
	},
];

function FeatureImage({
	icon,
	imageAlt,
}: {
	icon: React.ReactNode;
	imageAlt: string;
}) {
	return (
		<div className="rounded-2xl overflow-hidden shadow-md bg-secondary aspect-[4/3] flex flex-col items-center justify-center gap-3">
			<div className="opacity-30">{icon}</div>
			<p className="text-xs text-muted-foreground">{imageAlt}</p>
			<p className="text-xs text-muted-foreground/50">
				Replace with screenshot
			</p>
		</div>
	);
}

function LandingFeatures() {
	return (
		<section className="py-4">
			{FEATURES.map((feature) => (
				<div
					key={feature.id}
					id={feature.id}
					className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
				>
					<div className="max-w-7xl mx-auto">
						<div
							className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
								feature.reverse ? "lg:[&>*:first-child]:order-2" : ""
							}`}
						>
							{/* Text */}
							<div>
								<div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6">
									{feature.icon}
								</div>
								<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
									{feature.headline}
								</h2>
								<p className="text-base text-muted-foreground leading-relaxed max-w-md">
									{feature.body}
								</p>
							</div>

							{/* Image placeholder */}
							<FeatureImage icon={feature.icon} imageAlt={feature.imageAlt} />
						</div>
					</div>
				</div>
			))}
		</section>
	);
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function LandingCTABanner() {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
			<div className="max-w-3xl mx-auto text-center">
				<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
					Ready to eat better?
				</h2>
				<p className="text-base text-white/80 mb-8">
					Stop guessing, start planning.
				</p>
				<Link to="/signup">
					<Button className="bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-lg px-8 py-3 text-sm">
						Start Planning Free →
					</Button>
				</Link>
			</div>
		</section>
	);
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function LandingFooter() {
	return (
		<footer className="bg-card border-t border-border py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-3 gap-8 mb-8">
					{/* Brand */}
					<div className="md:col-span-1">
						<div className="flex items-center gap-2 mb-4">
							<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
								<Utensils className="w-4 h-4 text-white" />
							</div>
							<span className="font-bold text-lg text-foreground">sahani</span>
						</div>
						<p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
							Making healthy eating accessible, sustainable, and enjoyable.
						</p>
					</div>

					{/* Product */}
					<div>
						<h4 className="font-semibold text-foreground mb-4 text-sm">
							Product
						</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									to="/meal-planner"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									Meal Planner
								</Link>
							</li>
							<li>
								<Link
									to="/recipes"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									Recipes
								</Link>
							</li>
							<li>
								<Link
									to="/shopping"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									Shopping List
								</Link>
							</li>
						</ul>
					</div>

					{/* Account */}
					<div>
						<h4 className="font-semibold text-foreground mb-4 text-sm">
							Account
						</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									to="/login"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									Log In
								</Link>
							</li>
							<li>
								<Link
									to="/signup"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									Sign Up
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-border pt-8">
					<p className="text-xs text-muted-foreground">
						© 2026 sahani. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function LandingPage() {
	return (
		<div className="min-h-screen bg-card">
			<LandingNav />
			<LandingHero />
			<LandingHowItWorks />
			<LandingFeatures />
			<LandingCTABanner />
			<LandingFooter />
		</div>
	);
}
