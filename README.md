# sahani - Weekly Meal Planner & Nutrition Dashboard

**sahani** (Kiswahili for "plate") is a vibrant, health-focused meal planning and nutrition analytics dashboard. It combines the clean precision of modern health apps with the warmth of a personal nutrition companion, specifically featuring a rich collection of authentic Kenyan recipes.

![sahani Dashboard Preview](public/logo512.png)

## 🌟 Key Features

- **Smart Meal Planner**: Toggle between weekly and daily views to organize your Breakfast, Lunch, Dinner, and Snacks.
- **Kenyan Recipe Collection**: Seeded with over 20+ authentic recipes like Kaimati, Pilau, Githeri, and Managu.
- **Nutrition Analytics**: Deep-dive into your weekly performance with interactive calorie trends, macro splits, and "Superfood" insights.
- **Automated Shopping List**: Generate a consolidated grocery list from your meal plans with one click.
- **Dynamic Dashboard**: High-energy "Mission Control" showing your next up meal, live nutrition rings, and daily AI tips.
- **Personalized Targets**: Set and track custom daily goals for Calories, Protein, Carbs, and Fats.

## 🚀 Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Data Fetching**: [Convex](https://www.convex.dev/) (Real-time Backend)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Formatting/Linting**: [Biome](https://biomejs.dev/)

## 🛠️ Getting Started

### 1. Clone & Install
```bash
pnpm install
```

### 2. Configure Environment
Create a `.env.local` file with:
- `VITE_CONVEX_URL`: Your Convex deployment URL.
- `BETTER_AUTH_SECRET`: Generate using `npx @better-auth/cli secret`.

### 3. Run Development Server
```bash
# Start Convex (Backend)
npx convex dev

# Start Vite (Frontend)
pnpm dev
```

### 4. Seed Recipes
Once the app is running and you have logged in, run the following command to populate the database with the Kenyan recipe collection:
```bash
npx convex run seed:seedRecipes
```

## 📂 Project Structure

- `convex/`: Backend schema, queries, and mutations (including seeding logic).
- `src/routes/`: File-based routing using TanStack Router.
  - `index.tsx`: Landing page + Dashboard.
  - `meal-planner/`: Weekly and Daily planning views.
  - `nutrition.tsx`: Advanced analytics and trends.
  - `shopping.tsx`: Interactive grocery lists.
  - `recipes.index.tsx`: Recipe discovery and management.
- `docs/`: Source material for recipes and design system.

## 🎨 Design Philosophy

The interface follows a **vibrant, health-focused vitality** theme:
- **Primary Color**: Fresh Spring Green (#13EC5B)
- **Secondary Surfaces**: Pure Clean White & Soft Cloud Gray
- **Typography**: Modern geometric sans-serif (Manrope)
- **Atmosphere**: Energetic, organized, and approachable.

---

Built with ❤️ for better eating and less stress.
