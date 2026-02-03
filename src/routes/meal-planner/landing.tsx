import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Check,
	ChefHat,
	Clock,
	Heart,
	Leaf,
	Menu,
	Sparkles,
	Star,
	TrendingUp,
	Users,
	X,
} from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/meal-planner/landing")({
	component: MealPlannerLandingPage,
});

const navLinks = [
	{ label: "Features", href: "#features" },
	{ label: "How It Works", href: "#how-it-works" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Recipes", href: "#recipes" },
];

const features = [
	{
		icon: ChefHat,
		title: "Smart Meal Planning",
		description:
			"AI-powered meal suggestions based on your dietary preferences, allergies, and nutritional goals.",
		color: "bg-emerald-100 text-emerald-600",
	},
	{
		icon: Clock,
		title: "Save Time",
		description:
			"Plan your entire week in minutes. Generate shopping lists automatically and reduce food waste.",
		color: "bg-blue-100 text-blue-600",
	},
	{
		icon: Heart,
		title: "Eat Healthier",
		description:
			"Track your nutrition goals with detailed breakdowns of calories, protein, carbs, and fats.",
		color: "bg-rose-100 text-rose-600",
	},
	{
		icon: Leaf,
		title: "Sustainable Living",
		description:
			"Reduce food waste by planning meals efficiently. Choose eco-friendly recipes and portions.",
		color: "bg-green-100 text-green-600",
	},
	{
		icon: Users,
		title: "Family Friendly",
		description:
			"Customize meal plans for your entire family. Account for different tastes and dietary needs.",
		color: "bg-amber-100 text-amber-600",
	},
	{
		icon: TrendingUp,
		title: "Track Progress",
		description:
			"Monitor your nutrition goals over time. Get insights and recommendations for improvement.",
		color: "bg-purple-100 text-purple-600",
	},
];

const steps = [
	{
		number: "01",
		title: "Set Your Goals",
		description:
			"Tell us about your dietary preferences, allergies, and nutrition targets.",
	},
	{
		number: "02",
		title: "Get Personalized Plans",
		description:
			"Our AI generates weekly meal plans tailored specifically to your needs.",
	},
	{
		number: "03",
		title: "Cook & Enjoy",
		description:
			"Follow easy recipes, track your nutrition, and enjoy delicious healthy meals.",
	},
];

const testimonials = [
	{
		name: "Sarah Johnson",
		role: "Busy Mom",
		content:
			"Yummy Planner has transformed our family's eating habits. We save so much time and money!",
		avatar: "SJ",
	},
	{
		name: "Mike Chen",
		role: "Fitness Enthusiast",
		content:
			"The nutrition tracking is incredible. I've hit my protein goals every day for 3 months!",
		avatar: "MC",
	},
	{
		name: "Emma Davis",
		role: "Working Professional",
		content:
			"Finally, a meal planner that understands my busy schedule. The quick recipes are a lifesaver!",
		avatar: "ED",
	},
];

const pricingPlans = [
	{
		name: "Free",
		price: "$0",
		period: "forever",
		description: "Perfect for getting started",
		features: [
			"Up to 3 meal plans per week",
			"Basic nutrition tracking",
			"50+ recipes",
			"Shopping list generation",
		],
		cta: "Get Started Free",
		popular: false,
	},
	{
		name: "Pro",
		price: "$9.99",
		period: "per month",
		description: "Best for health enthusiasts",
		features: [
			"Unlimited meal plans",
			"Advanced nutrition analytics",
			"500+ premium recipes",
			"AI meal suggestions",
			"Family sharing (up to 5)",
			"Priority support",
		],
		cta: "Start Pro Trial",
		popular: true,
	},
	{
		name: "Family",
		price: "$19.99",
		period: "per month",
		description: "For the whole family",
		features: [
			"Everything in Pro",
			"Unlimited family members",
			"Kids meal plans",
			"Grocery delivery integration",
			"Meal prep guides",
			"1-on-1 nutritionist consultation",
		],
		cta: "Choose Family Plan",
		popular: false,
	},
];

function MealPlannerLandingPage() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const featuresId = useId();
	const howItWorksId = useId();
	const pricingId = useId();

	return (
		<div className="min-h-screen bg-white">
			<nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<Link to="/" className="flex items-center gap-2">
							<div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
								<Sparkles className="w-5 h-5 text-emerald-600" />
							</div>
							<span className="font-bold text-xl text-gray-800">
								YUMMY PLANNER
							</span>
						</Link>

						<div className="hidden md:flex items-center gap-8">
							{navLinks.map((link) => (
								<a
									key={link.label}
									href={link.href}
									className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
								>
									{link.label}
								</a>
							))}
						</div>

						<div className="hidden md:flex items-center gap-4">
							<Link
								to="/meal-planner"
								className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
							>
								Sign In
							</Link>
							<Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6">
								Get Started
								<ArrowRight className="w-4 h-4 ml-2" />
							</Button>
						</div>

						<button
							type="button"
							className="md:hidden p-2 rounded-lg hover:bg-gray-100"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							{mobileMenuOpen ? (
								<X className="w-6 h-6 text-gray-600" />
							) : (
								<Menu className="w-6 h-6 text-gray-600" />
							)}
						</button>
					</div>
				</div>

				{mobileMenuOpen && (
					<div className="md:hidden bg-white border-t border-gray-100">
						<div className="px-4 py-4 space-y-3">
							{navLinks.map((link) => (
								<a
									key={link.label}
									href={link.href}
									className="block text-sm font-medium text-gray-600 hover:text-emerald-600 py-2"
									onClick={() => setMobileMenuOpen(false)}
								>
									{link.label}
								</a>
							))}
							<div className="pt-3 border-t border-gray-100 space-y-3">
								<Link
									to="/meal-planner"
									className="block text-sm font-medium text-gray-600 hover:text-emerald-600 py-2"
								>
									Sign In
								</Link>
								<Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-full">
									Get Started
									<ArrowRight className="w-4 h-4 ml-2" />
								</Button>
							</div>
						</div>
					</div>
				)}
			</nav>

			<section className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						<div className="text-center lg:text-left">
							<div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
								<Star className="w-4 h-4 fill-emerald-500" />
								Trusted by 50,000+ happy meal planners
							</div>
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
								Plan Your Meals,
								<br />
								<span className="text-emerald-500">Live Healthier</span>
							</h1>
							<p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
								AI-powered meal planning that adapts to your lifestyle. Save
								time, eat better, and reach your nutrition goals with
								personalized weekly plans.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
								<Button
									size="lg"
									className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 h-14 text-base"
								>
									Start Free Trial
									<ArrowRight className="w-5 h-5 ml-2" />
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="rounded-full px-8 h-14 text-base border-gray-300 hover:bg-gray-50"
								>
									<Link to="/meal-planner">View Demo</Link>
								</Button>
							</div>
							<div className="mt-8 flex items-center gap-4 justify-center lg:justify-start text-sm text-gray-500">
								<div className="flex -space-x-2">
									{[1, 2, 3, 4].map((i) => (
										<div
											key={i}
											className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-300 border-2 border-white flex items-center justify-center text-xs font-medium text-emerald-700"
										>
											{String.fromCharCode(64 + i)}
										</div>
									))}
								</div>
								<span>Join 50,000+ users</span>
							</div>
						</div>
						<div className="relative">
							<div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 lg:p-12">
								<div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
												<ChefHat className="w-5 h-5 text-emerald-600" />
											</div>
											<div>
												<p className="font-semibold text-gray-800">
													Weekly Plan
												</p>
												<p className="text-xs text-gray-500">Oct 24 - Oct 30</p>
											</div>
										</div>
										<span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
											Active
										</span>
									</div>

									<div className="grid grid-cols-3 gap-3">
										{[
											{
												name: "Oatmeal",
												cal: "350",
												color: "from-amber-100 to-orange-100",
											},
											{
												name: "Salad",
												cal: "420",
												color: "from-green-100 to-emerald-100",
											},
											{
												name: "Pasta",
												cal: "580",
												color: "from-yellow-100 to-amber-100",
											},
										].map((meal) => (
											<div
												key={meal.name}
												className="bg-gradient-to-br rounded-xl p-3 text-center"
												style={{
													background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
												}}
											>
												<div
													className={`w-full h-12 rounded-lg bg-gradient-to-br ${meal.color} mb-2 flex items-center justify-center`}
												>
													<ChefHat className="w-5 h-5 text-gray-400/50" />
												</div>
												<p className="text-xs font-medium text-gray-700">
													{meal.name}
												</p>
												<p className="text-[10px] text-gray-500">
													{meal.cal} kcal
												</p>
											</div>
										))}
									</div>

									<div className="pt-4 border-t border-gray-100">
										<div className="flex items-center justify-between mb-2">
											<span className="text-xs text-gray-500">Daily Goal</span>
											<span className="text-xs font-medium text-emerald-600">
												1,240 / 2,000 kcal
											</span>
										</div>
										<div className="h-2 bg-gray-100 rounded-full overflow-hidden">
											<div className="h-full w-[62%] bg-emerald-500 rounded-full" />
										</div>
									</div>
								</div>

								<div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
									<div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
										<Check className="w-4 h-4 text-green-600" />
									</div>
									<span className="text-xs font-medium text-gray-700">
										Goal Reached!
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id={featuresId} className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
							Everything You Need to Eat Better
						</h2>
						<p className="text-lg text-gray-600">
							Powerful features designed to make meal planning effortless and
							enjoyable.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((feature) => (
							<div
								key={feature.title}
								className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow"
							>
								<div
									className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}
								>
									<feature.icon className="w-6 h-6" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									{feature.title}
								</h3>
								<p className="text-gray-600 text-sm leading-relaxed">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id={howItWorksId} className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
							How It Works
						</h2>
						<p className="text-lg text-gray-600">
							Get started with Yummy Planner in three simple steps
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{steps.map((step, index) => (
							<div key={step.number} className="relative">
								{index < steps.length - 1 && (
									<div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gray-200" />
								)}
								<div className="text-center">
									<div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
										<span className="text-2xl font-bold text-emerald-600">
											{step.number}
										</span>
									</div>
									<h3 className="text-xl font-semibold text-gray-900 mb-3">
										{step.title}
									</h3>
									<p className="text-gray-600">{step.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
							Loved by Thousands
						</h2>
						<p className="text-lg text-gray-600">
							See what our users are saying about Yummy Planner
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial) => (
							<div
								key={testimonial.name}
								className="bg-white rounded-2xl p-6 shadow-sm"
							>
								<div className="flex items-center gap-1 mb-4">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className="w-4 h-4 fill-amber-400 text-amber-400"
										/>
									))}
								</div>
								<p className="text-gray-700 mb-6 leading-relaxed">
									"{testimonial.content}"
								</p>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-300 flex items-center justify-center text-sm font-medium text-emerald-700">
										{testimonial.avatar}
									</div>
									<div>
										<p className="font-semibold text-gray-900">
											{testimonial.name}
										</p>
										<p className="text-sm text-gray-500">{testimonial.role}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id={pricingId} className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
							Simple, Transparent Pricing
						</h2>
						<p className="text-lg text-gray-600">
							Choose the plan that works best for you
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{pricingPlans.map((plan) => (
							<div
								key={plan.name}
								className={`rounded-2xl p-8 ${
									plan.popular
										? "bg-emerald-500 text-white shadow-xl scale-105"
										: "bg-white border border-gray-200"
								}`}
							>
								{plan.popular && (
									<div className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
										Most Popular
									</div>
								)}
								<h3
									className={`text-xl font-semibold mb-2 ${
										plan.popular ? "text-white" : "text-gray-900"
									}`}
								>
									{plan.name}
								</h3>
								<div className="mb-4">
									<span
										className={`text-4xl font-bold ${
											plan.popular ? "text-white" : "text-gray-900"
										}`}
									>
										{plan.price}
									</span>
									<span
										className={`text-sm ${
											plan.popular ? "text-emerald-100" : "text-gray-500"
										}`}
									>
										/{plan.period}
									</span>
								</div>
								<p
									className={`text-sm mb-6 ${
										plan.popular ? "text-emerald-100" : "text-gray-600"
									}`}
								>
									{plan.description}
								</p>
								<ul className="space-y-3 mb-8">
									{plan.features.map((feature) => (
										<li key={feature} className="flex items-start gap-3">
											<Check
												className={`w-5 h-5 flex-shrink-0 ${
													plan.popular ? "text-white" : "text-emerald-500"
												}`}
											/>
											<span
												className={`text-sm ${
													plan.popular ? "text-white" : "text-gray-600"
												}`}
											>
												{feature}
											</span>
										</li>
									))}
								</ul>
								<Button
									className={`w-full rounded-full h-12 ${
										plan.popular
											? "bg-white text-emerald-600 hover:bg-gray-100"
											: "bg-emerald-500 text-white hover:bg-emerald-600"
									}`}
								>
									{plan.cta}
								</Button>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 bg-emerald-500">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
						Ready to Start Eating Better?
					</h2>
					<p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
						Join 50,000+ users who have transformed their meal planning with
						Yummy Planner. Start your free trial today.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							size="lg"
							className="bg-white text-emerald-600 hover:bg-gray-100 rounded-full px-8 h-14 text-base"
						>
							Start Free Trial
							<ArrowRight className="w-5 h-5 ml-2" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full px-8 h-14 text-base"
						>
							<Link to="/meal-planner">View Demo</Link>
						</Button>
					</div>
				</div>
			</section>

			<footer className="bg-gray-900 text-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-4 gap-8 mb-8">
						<div className="col-span-2">
							<div className="flex items-center gap-2 mb-4">
								<div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
									<Sparkles className="w-5 h-5 text-white" />
								</div>
								<span className="font-bold text-xl">YUMMY PLANNER</span>
							</div>
							<p className="text-gray-400 max-w-sm">
								AI-powered meal planning that adapts to your lifestyle. Eat
								better, save time, and live healthier.
							</p>
						</div>
						<div>
							<h4 className="font-semibold mb-4">Product</h4>
							<ul className="space-y-2 text-sm text-gray-400">
								<li>
									<a
										href="#features"
										className="hover:text-white transition-colors"
									>
										Features
									</a>
								</li>
								<li>
									<a
										href="#pricing"
										className="hover:text-white transition-colors"
									>
										Pricing
									</a>
								</li>
								<li>
									<Link
										to="/meal-planner"
										className="hover:text-white transition-colors"
									>
										Dashboard
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">Company</h4>
							<ul className="space-y-2 text-sm text-gray-400">
								<li>
									<span className="hover:text-white transition-colors cursor-pointer">
										About
									</span>
								</li>
								<li>
									<span className="hover:text-white transition-colors cursor-pointer">
										Blog
									</span>
								</li>
								<li>
									<span className="hover:text-white transition-colors cursor-pointer">
										Contact
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-sm text-gray-500">
							© 2024 Yummy Planner. All rights reserved.
						</p>
						<div className="flex gap-6 text-sm text-gray-500">
							<span className="hover:text-white transition-colors cursor-pointer">
								Privacy Policy
							</span>
							<span className="hover:text-white transition-colors cursor-pointer">
								Terms of Service
							</span>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default MealPlannerLandingPage;
