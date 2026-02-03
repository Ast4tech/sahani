import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  ChefHat,
  Clock,
  LayoutDashboard,
  LogOut,
  PieChart,
  Plus,
  Search,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/meal-planner/")({
  component: MealPlannerPage,
});

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", active: false },
  {
    icon: CalendarDays,
    label: "Weekly Planner",
    href: "/meal-planner",
    active: true,
  },
  { icon: BookOpen, label: "My Recipes", href: "/recipes", active: false },
  {
    icon: ShoppingCart,
    label: "Shopping List",
    href: "/shopping",
    active: false,
    badge: 3,
  },
  { icon: PieChart, label: "Nutrition", href: "/nutrition", active: false },
];

const days = [
  { day: "MON", date: 18, id: "mon-18" },
  { day: "TUE", date: 19, id: "tue-19" },
  { day: "WED", date: 20, id: "wed-20" },
  { day: "THU", date: 21, id: "thu-21" },
  { day: "FRI", date: 22, id: "fri-22" },
  { day: "SAT", date: 23, id: "sat-23" },
  { day: "SUN", date: 24, id: "sun-24" },
];

const mealSlots = {
  breakfast: [
    { name: "Blueberry Oats", calories: 350, image: "oats", id: "b1" },
    { name: "Avocado Toast", calories: 280, image: "toast", id: "b2" },
    null,
    { name: "Green Smoothie", calories: 180, image: "smoothie", id: "b4" },
    null,
    null,
    null,
  ],
  lunch: [
    { name: "Chicken Caesar", calories: 450, image: "salad", id: "l1" },
    null,
    { name: "Veggie Wrap", calories: 320, image: "wrap", id: "l3" },
    null,
    null,
    null,
    null,
  ],
  dinner: [
    { name: "Pesto Pasta", calories: 650, image: "pasta", id: "d1" },
    { name: "Steak & Veg", calories: 700, image: "steak", id: "d2" },
    null,
    null,
    null,
    null,
    null,
  ],
};

const quickAddRecipes = [
  {
    name: "Low Carb Salad",
    desc: "Fresh veggies with grilled...",
    calories: 300,
    time: "15m",
    image: "salad",
    id: "qa-1",
  },
  {
    name: "Salmon Poke",
    desc: "Fresh salmon with...",
    calories: 450,
    time: "20m",
    image: "poke",
    id: "qa-2",
  },
  {
    name: "Vegan Tacos",
    desc: "Mushroom walnut meat...",
    calories: 320,
    time: "25m",
    image: "tacos",
    id: "qa-3",
  },
  {
    name: "Ramen Bowl",
    desc: "Spicy miso broth with egg...",
    calories: 520,
    time: "40m",
    image: "ramen",
    id: "qa-4",
  },
];

function MealCard({
  meal,
}: {
  meal: { name: string; calories: number; image: string; id: string } | null;
}) {
  if (!meal) {
    return (
      <div className="bg-white rounded-2xl p-4 min-h-[140px] flex items-center justify-center border-2 border-dashed border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all cursor-pointer group">
        <Plus className="w-6 h-6 text-gray-300 group-hover:text-emerald-400" />
      </div>
    );
  }

  const gradients: Record<string, string> = {
    oats: "from-amber-100 to-orange-100",
    toast: "from-yellow-100 to-amber-100",
    smoothie: "from-green-100 to-emerald-100",
    salad: "from-green-100 to-lime-100",
    wrap: "from-red-100 to-orange-100",
    pasta: "from-yellow-100 to-amber-100",
    steak: "from-red-100 to-rose-100",
    poke: "from-orange-100 to-red-100",
    tacos: "from-amber-100 to-yellow-100",
    ramen: "from-yellow-100 to-orange-100",
  };

  return (
    <div className="bg-white rounded-2xl p-3 hover:shadow-md transition-shadow cursor-pointer">
      <div
        className={`w-full h-24 rounded-xl bg-gradient-to-br ${gradients[meal.image] || "from-gray-100 to-gray-200"} mb-3 flex items-center justify-center`}
      >
        <ChefHat className="w-8 h-8 text-gray-400/50" />
      </div>
      <h4 className="font-semibold text-sm text-gray-800">{meal.name}</h4>
      <p className="text-xs text-gray-500 mt-1">{meal.calories} kcal</p>
    </div>
  );
}

function RecipeQuickAdd({ recipe }: { recipe: (typeof quickAddRecipes)[0] }) {
  const gradients: Record<string, string> = {
    salad: "from-green-100 to-emerald-100",
    poke: "from-orange-100 to-red-100",
    tacos: "from-amber-100 to-yellow-100",
    ramen: "from-yellow-100 to-orange-100",
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
      <div
        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradients[recipe.image] || "from-gray-100 to-gray-200"} flex items-center justify-center flex-shrink-0`}
      >
        <ChefHat className="w-6 h-6 text-gray-400/50" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-gray-800">{recipe.name}</h4>
        <p className="text-xs text-gray-500 truncate">{recipe.desc}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-medium text-orange-500">
            {recipe.calories} kcal
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {recipe.time}
          </span>
        </div>
      </div>
    </div>
  );
}

function MealPlannerPage() {
  const [filterTab, setFilterTab] = useState("All");

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="font-bold text-lg text-gray-800">YUMMY PLAN</span>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
              <span className="text-sm font-medium text-amber-700">A</span>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">
                Amanda Ajmal
              </p>
              <button
                type="button"
                className="text-xs text-gray-400 hover:text-emerald-500 flex items-center gap-1"
              >
                Edit profile <span className="text-[10px]">✎</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-3">
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-12 font-medium shadow-lg shadow-emerald-200">
            <Plus className="w-5 h-5 mr-2" />
            Add New Recipe
          </Button>
        </div>

        <nav className="flex-1 px-4 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
            Menu
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 mx-4 mb-4">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4">
            <p className="font-semibold text-sm text-gray-800">Pro Plan</p>
            <p className="text-xs text-gray-500 mt-1">
              Get unlimited AI recipes
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 bg-white border-0 text-emerald-600 font-medium hover:bg-emerald-100 rounded-lg"
            >
              Upgrade
            </Button>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button
            type="button"
            className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 mr-80 p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Weekly Planner</h1>
            <p className="text-sm text-gray-400 mt-1">
              September 18 - 24, 2023
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-lg p-1 border border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-md bg-gray-100 text-gray-700 font-medium"
              >
                Weekly
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-md text-gray-400 hover:text-gray-600"
              >
                Daily
              </Button>
            </div>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6 shadow-lg shadow-emerald-200">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Generate Shopping List
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 mb-6">
          {days.map((day) => (
            <div
              key={day.id}
              className={`text-center py-4 rounded-2xl ${
                day.date === 18
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                  : "bg-white text-gray-600"
              }`}
            >
              <p className="text-xs font-medium uppercase tracking-wider opacity-80">
                {day.day}
              </p>
              <p className="text-xl font-bold mt-1">{day.date}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-24 flex-shrink-0 pt-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-2">
                <ChefHat className="w-6 h-6 text-orange-500" />
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Breakfast
              </p>
            </div>
            <div className="flex-1 grid grid-cols-7 gap-4">
              {mealSlots.breakfast.map((meal, idx) => (
                <MealCard
                  key={`breakfast-${meal?.id ?? `empty-${idx}`}`}
                  meal={meal}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-24 flex-shrink-0 pt-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                <ChefHat className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Lunch
              </p>
            </div>
            <div className="flex-1 grid grid-cols-7 gap-4">
              {mealSlots.lunch.map((meal, idx) => (
                <MealCard
                  key={`lunch-${meal?.id ?? `empty-${idx}`}`}
                  meal={meal}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-24 flex-shrink-0 pt-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-2">
                <ChefHat className="w-6 h-6 text-indigo-500" />
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Dinner
              </p>
            </div>
            <div className="flex-1 grid grid-cols-7 gap-4">
              {mealSlots.dinner.map((meal, idx) => (
                <MealCard
                  key={`dinner-${meal?.id ?? `empty-${idx}`}`}
                  meal={meal}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <aside className="w-80 bg-white border-l border-gray-100 fixed right-0 h-full overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Quick Add</h2>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search recipes..."
              className="pl-10 bg-gray-50 border-0 rounded-xl h-11"
            />
          </div>

          <div className="flex gap-2 mb-6">
            {["All", "Favorites", "Recent"].map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterTab === tab
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-3 mb-8">
            {quickAddRecipes.map((recipe) => (
              <RecipeQuickAdd key={recipe.id} recipe={recipe} />
            ))}
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Daily Target
            </h3>

            <div className="bg-gray-50 rounded-2xl p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500">Calories</p>
                  <p className="text-xl font-bold text-gray-800">
                    1,240{" "}
                    <span className="text-sm font-normal text-gray-400">
                      / 2,000
                    </span>
                  </p>
                </div>
                <span className="text-emerald-500 font-semibold">62%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-[62%] bg-emerald-500 rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Protein</p>
                <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full w-[65%] bg-blue-400 rounded-full" />
                </div>
                <p className="text-sm font-bold text-gray-700">95g</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Carbs</p>
                <div className="h-1.5 bg-amber-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full w-[55%] bg-amber-400 rounded-full" />
                </div>
                <p className="text-sm font-bold text-gray-700">120g</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Fat</p>
                <div className="h-1.5 bg-red-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full w-[45%] bg-red-400 rounded-full" />
                </div>
                <p className="text-sm font-bold text-gray-700">45g</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
