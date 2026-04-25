import { query, mutation } from './_generated/server'
import { v } from 'convex/values'
import { authComponent } from './auth'

// Nutrition tips data - 50+ curated tips
const NUTRITION_TIPS = [
  // Iron absorption
  "Adding a source of vitamin C (like lemon) to your spinach helps your body absorb the iron more efficiently.",
  "Pair iron-rich foods like lentils with bell peppers for better iron absorption.",
  "Avoid drinking tea or coffee immediately after meals - they can inhibit iron absorption.",

  // Hydration
  "Drink a glass of water 30 minutes before meals to aid digestion.",
  "Start your day with warm water and lemon to kickstart your metabolism.",
  "Aim for at least 8 glasses of water daily, more if you're active.",
  "Herbal teas count towards your daily hydration goals.",

  // Protein
  "Spread protein intake throughout the day for better muscle synthesis.",
  "Greek yogurt has double the protein of regular yogurt.",
  "Legumes are an excellent plant-based protein source.",
  "Eggs are a complete protein containing all essential amino acids.",

  // Meal prep
  "Prep vegetables on Sunday to make weekday cooking faster.",
  "Batch cook grains like rice and quinoa at the start of the week.",
  "Store herbs in water like flowers to keep them fresh longer.",
  "Frozen vegetables are just as nutritious as fresh ones.",

  // Kenyan foods
  "Sukuma wiki (collard greens) is packed with vitamins A, C, and K.",
  "Ugali made from whole grain flour has more fiber than white flour versions.",
  "Beans and ugali is a complete protein combination.",
  "Mrenda (jute mallow) is rich in calcium and iron.",
  "Matoke (plantain) is a great source of potassium and fiber.",

  // Healthy fats
  "Avocados contain healthy monounsaturated fats that support heart health.",
  "A handful of nuts daily provides healthy fats and protein.",
  "Cook with olive oil at low temperatures to preserve nutrients.",

  // Fiber
  "Leave the skin on potatoes for extra fiber and nutrients.",
  "Start meals with vegetables to increase fiber intake.",
  "Chia seeds are an excellent source of fiber and omega-3s.",

  // Portion control
  "Use smaller plates to naturally reduce portion sizes.",
  "Eat slowly and mindfully to recognize fullness cues.",
  "Fill half your plate with vegetables at every meal.",

  // Meal timing
  "Don't skip breakfast - it kickstarts your metabolism.",
  "Avoid eating 3 hours before bedtime for better sleep quality.",
  "Have healthy snacks ready to prevent impulsive eating.",

  // Nutrients
  "Calcium needs vitamin D for proper absorption.",
  "Magnesium helps with muscle relaxation and better sleep.",
  "Omega-3 fatty acids support brain health.",
  "Zinc supports immune function and wound healing.",

  // Cooking tips
  "Steam vegetables instead of boiling to retain nutrients.",
  "Marinate meat with herbs to reduce harmful compounds when grilling.",
  "Roast vegetables at high heat for caramelization and flavor.",

  // Healthy swaps
  "Swap white rice for brown rice for more fiber.",
  "Use Greek yogurt instead of sour cream in recipes.",
  "Replace sugary drinks with infused water.",
  "Choose whole grain bread over white bread.",

  // Sustainability
  "Buy seasonal produce for better nutrition and lower cost.",
  "Grow herbs at home for fresh flavor and savings.",
  "Reduce food waste by using vegetable scraps for stock.",

  // Special diets
  "For weight loss: Focus on protein and fiber to stay full longer.",
  "For muscle building: Consume protein within 30 minutes post-workout.",
  "For heart health: Limit sodium to less than 2,300mg per day.",

  // Kitchen hygiene
  "Wash fruits and vegetables thoroughly before eating.",
  "Store raw meat separately from other foods.",
  "Check expiration dates regularly to reduce waste.",

  // Eating habits
  "Eat a rainbow of colors to get diverse nutrients.",
  "Chew food thoroughly for better digestion.",
  "Listen to your body's hunger and fullness signals.",

  // Kenyan nutrition
  "Millet is gluten-free and rich in magnesium.",
  "Sorghum is a drought-resistant grain full of antioxidants.",
  "Pumpkin leaves (malenge) are rich in calcium.",
  "Arrowroot is a good source of potassium.",
  "Sweet potatoes have more vitamin A than regular potatoes.",
];

// Seed tips into the database (should be run once)
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existingTips = await ctx.db.query('dailyTips').collect();

    if (existingTips.length > 0) {
      return { message: 'Tips already seeded', count: existingTips.length };
    }

    const categories = [
      'nutrition', 'hydration', 'protein', 'meal-prep', 'kenyan-foods',
      'healthy-fats', 'fiber', 'portion-control', 'meal-timing', 'nutrients',
      'cooking-tips', 'healthy-swaps', 'sustainability', 'special-diets',
      'kitchen-hygiene', 'eating-habits'
    ];

    for (let i = 0; i < NUTRITION_TIPS.length; i++) {
      const categoryIndex = i % categories.length;
      await ctx.db.insert('dailyTips', {
        text: NUTRITION_TIPS[i],
        category: categories[categoryIndex],
        isActive: true,
        createdAt: Date.now() + i,
      });
    }

    return { message: 'Tips seeded successfully', count: NUTRITION_TIPS.length };
  },
});

// Get a random daily tip
export const getDaily = query({
  args: {},
  handler: async (ctx) => {
    // Try to get user's preferred tip category based on their profile
    const user = await authComponent.getAuthUser(ctx);
    let category: string | undefined;

    if (user) {
      const profile = await ctx.db
        .query('userProfile')
        .withIndex('by_user', (q) => q.eq('userId', user._id))
        .first();

      // Map health goals to categories
      if (profile?.healthGoal === 'lose_weight') {
        category = 'portion-control';
      } else if (profile?.healthGoal === 'build_muscle') {
        category = 'protein';
      } else if (profile?.healthGoal === 'eat_healthy') {
        category = 'nutrition';
      }
    }

    // Get all active tips
    const allTips = await ctx.db
      .query('dailyTips')
      .withIndex('by_active', (q) => q.eq('isActive', true))
      .collect();

    if (allTips.length === 0) {
      // Return a random static tip if no tips in database
      const randomIndex = Math.floor(Math.random() * NUTRITION_TIPS.length);
      return { text: NUTRITION_TIPS[randomIndex] };
    }

    // If we have a preferred category, try to get tips from that category first
    let filteredTips = category
      ? allTips.filter(t => t.category === category)
      : allTips;

    // If no tips in preferred category, use all tips
    if (filteredTips.length === 0) {
      filteredTips = allTips;
    }

    // Get today's date as a seed for consistent "random" tip per day
    const today = new Date();
    const daySeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    // Use seeded random for consistent daily tip
    const randomIndex = daySeed % filteredTips.length;
    const selectedTip = filteredTips[randomIndex];

    return {
      text: selectedTip.text,
      category: selectedTip.category,
    };
  },
});

// Get tips by category
export const listByCategory = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let tips;
    if (args.category) {
      tips = await ctx.db
        .query('dailyTips')
        .withIndex('by_category', (q) => q.eq('category', args.category))
        .collect();
    } else {
      tips = await ctx.db.query('dailyTips').collect();
    }
    return tips.filter(t => t.isActive);
  },
});
