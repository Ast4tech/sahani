import { createFileRoute, Link } from "@tanstack/react-router";
import {
	CheckCircle,
	ChevronLeft,
	ChevronRight,
	PlayCircle,
} from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: MealMasterLandingPage,
});

const navLinks = [
	{ label: "Features", href: "#features" },
	{ label: "How it Works", href: "#how-it-works" },
	{ label: "Recipes", href: "#recipes" },
	{ label: "Pricing", href: "#pricing" },
];

const steps = [
	{
		icon: "calendar_month",
		number: "1",
		title: "Plan",
		description:
			"Choose your diet and personal health goals with our AI-powered smart meal planner.",
	},
	{
		icon: "shopping_cart",
		number: "2",
		title: "Shop",
		description:
			"Get an automated, sorted grocery list sent to your phone or delivered to your door.",
	},
	{
		icon: "restaurant",
		number: "3",
		title: "Cook",
		description:
			"Follow simple, chef-tested recipes with step-by-step instructions and video guides.",
	},
];

const recipes = [
	{
		name: "Zesty Lemon Salmon",
		time: "25 mins",
		calories: "450 kcal",
		image: "salmon",
		popular: true,
		id: "recipe-1",
	},
	{
		name: "Vegan Buddha Bowl",
		time: "15 mins",
		calories: "380 kcal",
		image: "buddha",
		popular: false,
		id: "recipe-2",
	},
	{
		name: "Mediterranean Quinoa",
		time: "20 mins",
		calories: "410 kcal",
		image: "quinoa",
		popular: false,
		id: "recipe-3",
	},
	{
		name: "Classic Avocado Toast",
		time: "10 mins",
		calories: "320 kcal",
		image: "avocado",
		popular: false,
		id: "recipe-4",
	},
];

const pricingPlans = [
	{
		name: "Basic",
		price: "$0",
		period: "forever",
		description: "Perfect for individuals getting started with meal planning.",
		features: [
			{ name: "5 Weekly Recipes", included: true },
			{ name: "Standard Grocery List", included: false },
			{ name: "Community Access", included: false },
		],
		cta: "Get Started",
		popular: false,
	},
	{
		name: "Pro",
		price: "$9.99",
		period: "month",
		description: "Everything you need to master your nutrition.",
		features: [
			{ name: "Unlimited Personalized Recipes", included: true },
			{ name: "Automated Shopping Lists", included: true },
			{ name: "Nutritional Tracking", included: true },
			{ name: "Priority Support", included: true },
		],
		cta: "Go Pro Now",
		popular: true,
	},
];

function MealMasterLandingPage() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const howItWorksId = useId();
	const recipesId = useId();
	const pricingId = useId();

	return (
		<div className="min-h-screen bg-white">
			<link
				href="https://fonts.googleapis.com/icon?family=Material+Icons"
				rel="stylesheet"
			/>

			<nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E2E8F0]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<Link to="/" className="flex items-center gap-2">
							<div className="w-8 h-8 bg-[#13EC5B] rounded-lg flex items-center justify-center">
								<span className="material-icons text-white text-lg">
									restaurant_menu
								</span>
							</div>
							<span className="font-bold text-lg text-[#1A1A1A]">
								sahani
							</span>
						</Link>

						<div className="hidden md:flex items-center gap-8">
							{navLinks.map((link) => (
								<a
									key={link.label}
									href={link.href}
									className="text-sm font-medium text-[#4A5568] hover:text-[#13EC5B] transition-colors"
								>
									{link.label}
								</a>
							))}
						</div>

						<div className="hidden md:flex items-center gap-4">
							<Link
								to="/login"
								className="text-sm font-medium text-[#4A5568] hover:text-[#13EC5B] transition-colors"
							>
								Login
							</Link>
							<Link to="/signup">
								<Button className="bg-[#13EC5B] hover:bg-[#10B981] text-white font-semibold rounded-lg px-5 py-2 text-sm">
									Sign Up
								</Button>
							</Link>
						</div>

						<button
							type="button"
							className="md:hidden p-2 rounded-lg hover:bg-[#F8F9FA]"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							<span className="material-icons text-[#4A5568]">
								{mobileMenuOpen ? "close" : "menu"}
							</span>
						</button>
					</div>
				</div>

				{mobileMenuOpen && (
					<div className="md:hidden bg-white border-t border-[#E2E8F0]">
						<div className="px-4 py-4 space-y-3">
							{navLinks.map((link) => (
								<a
									key={link.label}
									href={link.href}
									className="block text-sm font-medium text-[#4A5568] hover:text-[#13EC5B] py-2"
									onClick={() => setMobileMenuOpen(false)}
								>
									{link.label}
								</a>
							))}
							<div className="pt-3 border-t border-[#E2E8F0] space-y-3">
								<Link
									to="/login"
									className="block text-sm font-medium text-[#4A5568] hover:text-[#13EC5B] py-2"
								>
									Login
								</Link>
								<Link to="/signup" className="block">
									<Button className="w-full bg-[#13EC5B] hover:bg-[#10B981] text-white font-semibold rounded-lg">
										Sign Up
									</Button>
								</Link>
							</div>
						</div>
					</div>
				)}
			</nav>

			<section className="pt-24 pb-16 lg:pt-28 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						<div>
							<p className="text-xs font-medium text-[#13EC5B] uppercase tracking-wider mb-4">
								Welcome to the future of eating
							</p>
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight mb-6">
								Eat Better,
								<br />
								<span className="text-[#13EC5B]">Stress Less.</span>
							</h1>
							<p className="text-base text-[#4A5568] mb-8 max-w-md">
								Custom meal plans tailored to your lifestyle. Save 5+ hours on
								grocery shopping and cooking every single week.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 mb-8">
								<Link to="/signup">
									<Button className="bg-[#13EC5B] hover:bg-[#10B981] text-white font-semibold rounded-lg px-6 py-3 text-sm">
										Start Planning Free
									</Button>
								</Link>
								<Button
									variant="outline"
									className="border-[#E2E8F0] text-[#1A1A1A] hover:bg-[#F8F9FA] rounded-lg px-6 py-3 text-sm"
								>
									<PlayCircle className="w-4 h-4 mr-2" />
									See how it works
								</Button>
							</div>
							<div className="flex items-center gap-3">
								<div className="flex -space-x-2">
									{[1, 2, 3].map((i) => (
										<div
											key={i}
											className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white flex items-center justify-center"
										/>
									))}
								</div>
								<p className="text-sm text-[#A0AEC0]">
									Joined by{" "}
									<span className="text-[#1A1A1A] font-medium">10,000+</span>{" "}
									healthy eaters
								</p>
							</div>
						</div>

						<div className="relative">
							<div className="relative rounded-2xl overflow-hidden shadow-lg">
								<img
									src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=500&fit=crop"
									alt="Healthy meal prep bowls with various fresh ingredients"
									className="w-full h-auto object-cover"
								/>
							</div>
							<div className="absolute -bottom-4 left-4 bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-3">
								<div className="w-10 h-10 bg-[#F8F9FA] rounded-full flex items-center justify-center">
									<span className="material-icons text-[#13EC5B] text-lg">
										timer
									</span>
								</div>
								<div>
									<p className="text-xs text-[#A0AEC0]">AVG COOK TIME</p>
									<p className="text-sm font-semibold text-[#1A1A1A]">
										15-20 Mins
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section
				id={howItWorksId}
				className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white"
			>
				<div className="max-w-7xl mx-auto">
					<div className="text-center max-w-2xl mx-auto mb-12">
						<h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
							The smarter way to eat
						</h2>
						<p className="text-base text-[#4A5568]">
							We handle the planning, so you can enjoy the cooking. Three simple
							steps to a healthier you.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{steps.map((step) => (
							<div
								key={step.number}
								className="bg-[#F8F9FA] rounded-xl p-6 text-left"
							>
								<div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
									<span className="material-icons text-[#13EC5B] text-xl">
										{step.icon}
									</span>
								</div>
								<h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
									{step.number}. {step.title}
								</h3>
								<p className="text-sm text-[#4A5568] leading-relaxed">
									{step.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section
				id={recipesId}
				className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]"
			>
				<div className="max-w-7xl mx-auto">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2">
								Community Favorites
							</h2>
							<p className="text-sm text-[#4A5568]">
								The most cooked recipes this week by our members.
							</p>
						</div>
						<div className="hidden sm:flex gap-2">
							<button
								type="button"
								className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8F9FA]"
							>
								<ChevronLeft className="w-5 h-5 text-[#4A5568]" />
							</button>
							<button
								type="button"
								className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8F9FA]"
							>
								<ChevronRight className="w-5 h-5 text-[#4A5568]" />
							</button>
						</div>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{recipes.map((recipe) => (
							<div
								key={recipe.id}
								className="bg-white rounded-xl overflow-hidden"
							>
								<div className="relative h-48">
									<img
										src={
											recipe.image === "salmon"
												? "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop"
												: recipe.image === "buddha"
													? "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
													: recipe.image === "quinoa"
														? "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=300&fit=crop"
														: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?w=400&h=300&fit=crop"
										}
										alt={recipe.name}
										className="w-full h-full object-cover"
									/>
									{recipe.popular && (
										<span className="absolute top-3 left-3 bg-white/90 text-[#1A1A1A] text-xs font-semibold px-2 py-1 rounded">
											POPULAR
										</span>
									)}
								</div>
								<div className="p-4">
									<h3 className="font-semibold text-[#1A1A1A] mb-2 text-sm">
										{recipe.name}
									</h3>
									<div className="flex items-center gap-2 text-xs text-[#A0AEC0]">
										<span className="material-icons text-xs">schedule</span>
										<span>{recipe.time}</span>
										<span className="mx-1">•</span>
										<span className="material-icons text-xs">bolt</span>
										<span>{recipe.calories}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section
				id={pricingId}
				className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white"
			>
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-3">
							Simple, honest pricing
						</h2>
						<p className="text-base text-[#4A5568]">
							Join over 10,000 members making healthy eating effortless.
						</p>
						<p className="text-sm text-[#A0AEC0] mt-1">
							Choose your plan. Change anytime.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-6">
						{pricingPlans.map((plan) => (
							<div
								key={plan.name}
								className={`rounded-xl p-6 border ${
									plan.popular
										? "border-[#13EC5B] bg-white"
										: "border-[#E2E8F0] bg-white"
								}`}
							>
								{plan.popular && (
									<span className="inline-block bg-[#13EC5B] text-white text-xs font-semibold px-3 py-1 rounded mb-4">
										MOST POPULAR
									</span>
								)}
								<h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">
									{plan.name}
								</h3>
								<div className="mb-4">
									<span className="text-3xl font-bold text-[#1A1A1A]">
										{plan.price}
									</span>
									<span className="text-sm text-[#A0AEC0]">
										/ {plan.period}
									</span>
								</div>
								<p className="text-sm text-[#4A5568] mb-6">
									{plan.description}
								</p>

								<ul className="space-y-3 mb-6">
									{plan.features.map((feature) => (
										<li key={feature.name} className="flex items-center gap-3">
											<CheckCircle
												className={`w-5 h-5 flex-shrink-0 ${
													feature.included ? "text-[#13EC5B]" : "text-[#A0AEC0]"
												}`}
											/>
											<span
												className={`text-sm ${
													feature.included ? "text-[#1A1A1A]" : "text-[#A0AEC0]"
												}`}
											>
												{feature.name}
											</span>
										</li>
									))}
								</ul>

								<Link to="/signup" className="block">
									<Button
										className={`w-full rounded-lg py-3 font-semibold ${
											plan.popular
												? "bg-[#13EC5B] text-white hover:bg-[#10B981]"
												: "bg-white border border-[#13EC5B] text-[#13EC5B] hover:bg-[#F8F9FA]"
										}`}
									>
										{plan.cta}
									</Button>
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>

			<footer className="bg-white border-t border-[#E2E8F0] py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-4 gap-8 mb-8">
						<div className="col-span-2">
							<div className="flex items-center gap-2 mb-4">
								<div className="w-8 h-8 bg-[#13EC5B] rounded-lg flex items-center justify-center">
									<span className="material-icons text-white text-lg">
										restaurant_menu
									</span>
								</div>
								<span className="font-bold text-lg text-[#1A1A1A]">
									sahani
								</span>
							</div>
							<p className="text-sm text-[#4A5568] max-w-xs leading-relaxed">
								Making healthy eating accessible, sustainable, and enjoyable for
								everyone. Join our community and change your life today.
							</p>
						</div>
						<div>
							<h4 className="font-semibold text-[#1A1A1A] mb-4 text-sm">
								Product
							</h4>
							<ul className="space-y-2 text-sm">
								<li>
									<Link
										to="/meal-planner"
										className="text-[#4A5568] hover:text-[#13EC5B] transition-colors"
									>
										Meal Planner
									</Link>
								</li>
								<li>
									<span className="text-[#4A5568] hover:text-[#13EC5B] transition-colors cursor-pointer">
										Grocery List
									</span>
								</li>
								<li>
									<span className="text-[#4A5568] hover:text-[#13EC5B] transition-colors cursor-pointer">
										Recipe Index
									</span>
								</li>
								<li>
									<a
										href="#pricing"
										className="text-[#4A5568] hover:text-[#13EC5B] transition-colors"
									>
										Pro Pricing
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold text-[#1A1A1A] mb-4 text-sm">
								Company
							</h4>
							<ul className="space-y-2 text-sm">
								<li>
									<span className="text-[#4A5568] hover:text-[#13EC5B] transition-colors cursor-pointer">
										About Us
									</span>
								</li>
								<li>
									<span className="text-[#4A5568] hover:text-[#13EC5B] transition-colors cursor-pointer">
										Careers
									</span>
								</li>
								<li>
									<span className="text-[#4A5568] hover:text-[#13EC5B] transition-colors cursor-pointer">
										Privacy Policy
									</span>
								</li>
								<li>
									<span className="text-[#4A5568] hover:text-[#13EC5B] transition-colors cursor-pointer">
										Terms of Service
									</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="border-t border-[#E2E8F0] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-xs text-[#A0AEC0]">
							© 2024 sahani Inc. All rights reserved.
						</p>
						<div className="flex gap-4">
							<button
								type="button"
								className="text-[#A0AEC0] hover:text-[#13EC5B] transition-colors"
								aria-label="Follow us on X (Twitter)"
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<title>X (Twitter)</title>
									<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
								</svg>
							</button>
							<button
								type="button"
								className="text-[#A0AEC0] hover:text-[#13EC5B] transition-colors"
								aria-label="Follow us on Instagram"
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Instagram</title>
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default MealMasterLandingPage;
