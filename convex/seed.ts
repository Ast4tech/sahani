import { mutation } from "./_generated/server";

const RECIPES_TO_SEED = [
  // ... (previous 17 recipes from batch 1)
  {
    name: "Kaimati (Fried Dumplings)",
    description: "Traditional Swahili breakfast dish. Kaimatis get their unique flavour from the style with which yeast is applied on wheat flour.",
    instructions: "1. Prepare yeast with warm water and sugar. 2. Mix dry ingredients (flour, cardamom, vanilla). 3. Combine and knead to semi-solid consistency. 4. Let rise for 4 minutes. 5. Deep fry balls for 3-4 minutes. 6. Coat in sticky sugar syrup.",
    ingredients: [
      { name: "wheat flour", amount: "2", unit: "cups" },
      { name: "yeast", amount: "1.25", unit: "tbsp" },
      { name: "sugar", amount: "1", unit: "cup" }
    ],
    calories: 429, protein: 4.6, carbs: 52.8, fat: 21.8,
    prepTimeMinutes: 20, cookTimeMinutes: 30, servings: 4, tags: ["Snack", "Swahili"]
  },
  {
    name: "Mahamri (Swahili Doughnuts)",
    description: "Typical Swahili delicacy with unique taste influenced by freshly squeezed coconut milk.",
    instructions: "1. Squeeze coconut milk. 2. Rise yeast. 3. Mix flour, sugar, cardamom. 4. Knead with coconut milk. 5. Let rise 30 mins. 6. Roll out, cut into triangles and deep fry.",
    ingredients: [
      { name: "wheat flour", amount: "3.5", unit: "cups" },
      { name: "coconut milk", amount: "0.75", unit: "cup" },
      { name: "sugar", amount: "9", unit: "tbsp" }
    ],
    calories: 400, protein: 5.0, carbs: 50.0, fat: 20.0,
    prepTimeMinutes: 60, cookTimeMinutes: 5, servings: 4, tags: ["Breakfast", "Coconut"]
  },
  {
    name: "Enriched Mandazi",
    description: "Urban favorite doughnut made with eggs, milk, and lemon rind.",
    instructions: "1. Mix dry ingredients and lemon rind. 2. Rub in margarine. 3. Add eggs and warm milk. 4. Knead and rest for 40 mins. 5. Roll, cut and deep fry.",
    ingredients: [
      { name: "self-raising flour", amount: "7", unit: "cups" },
      { name: "eggs", amount: "3", unit: "" },
      { name: "milk", amount: "1.33", unit: "cups" }
    ],
    calories: 379, protein: 7.6, carbs: 49.9, fat: 16.1,
    prepTimeMinutes: 45, cookTimeMinutes: 30, servings: 4, tags: ["Snack", "Urban"]
  },
  {
    name: "Meat Samosa (Sambusa ya Nyama)",
    description: "The classic Kenyan meaty samosa. Spiced beef in a thin, crispy pastry.",
    instructions: "1. Fry minced beef with leeks, garlic, coriander, and chilli until dry. 2. Make thin dough layers, toast lightly and peel. 3. Fold into pockets, fill with meat, seal with flour paste and deep fry.",
    ingredients: [
      { name: "minced beef", amount: "0.5", unit: "kg" },
      { name: "wheat flour", amount: "3", unit: "cups" },
      { name: "coriander", amount: "30", unit: "g" }
    ],
    calories: 443, protein: 18.8, carbs: 40.5, fat: 22.2,
    prepTimeMinutes: 60, cookTimeMinutes: 60, servings: 28, tags: ["Beef", "Traditional"]
  },
  {
    name: "Vegetable Samosa",
    description: "Healthy, heavily spiced vegetarian version of the classic samosa with garden peas and cabbage.",
    instructions: "1. Sauté onions, garlic, ginger. Add peas, carrots, cabbage and spices. 2. Prepare pastry pockets (same as meat samosa). 3. Fill and deep fry until golden brown.",
    ingredients: [
      { name: "cabbage", amount: "557", unit: "g" },
      { name: "garden peas", amount: "3", unit: "cups" },
      { name: "carrots", amount: "2", unit: "" }
    ],
    calories: 320, protein: 5.0, carbs: 45.0, fat: 14.0,
    prepTimeMinutes: 60, cookTimeMinutes: 90, servings: 23, tags: ["Vegetarian", "Healthy"]
  },
  {
    name: "Pancakes (Chapati za Maji)",
    description: "Thin, crepe-like pancakes popular for breakfast in Kenya.",
    instructions: "1. Whisk flour, eggs, milk, and sugar into a smooth batter. 2. Pour onto hot oiled pan. 3. Cook until golden on both sides.",
    ingredients: [
      { name: "wheat flour", amount: "3", unit: "cups" },
      { name: "eggs", amount: "2", unit: "" },
      { name: "milk", amount: "2.33", unit: "cups" }
    ],
    calories: 250, protein: 8.0, carbs: 35.0, fat: 9.0,
    prepTimeMinutes: 20, cookTimeMinutes: 30, servings: 9, tags: ["Breakfast", "Quick"]
  },
  {
    name: "Qita (Maize & Wheat Flour Pancake)",
    description: "Burji tradition. A unique pancake made from a mix of corn and wheat flour, spiced with garlic and butter.",
    instructions: "1. Mix flours and yeast. 2. Add warm water and let rise for 2 hours. 3. Melt butter with garlic and spices, then add to batter. 4. Spread on pan and cook until golden brown.",
    ingredients: [
      { name: "maize flour", amount: "3", unit: "cups" },
      { name: "wheat flour", amount: "2", unit: "cups" },
      { name: "butter", amount: "4", unit: "tbsp" }
    ],
    calories: 380, protein: 7.0, carbs: 65.0, fat: 12.0,
    prepTimeMinutes: 150, cookTimeMinutes: 40, servings: 4, tags: ["Burji", "Traditional"]
  },
  {
    name: "Tosti Mayai (Egg Toast)",
    description: "Quick urban breakfast made by dipping bread in seasoned beaten eggs and pan-frying.",
    instructions: "1. Beat eggs with salt. 2. Dip bread slices to coat both sides. 3. Fry on oiled pan for 1 min per side.",
    ingredients: [
      { name: "eggs", amount: "2", unit: "" },
      { name: "bread", amount: "4", unit: "slices" }
    ],
    calories: 280, protein: 12.0, carbs: 30.0, fat: 10.0,
    prepTimeMinutes: 10, cookTimeMinutes: 10, servings: 4, tags: ["Breakfast", "Quick"]
  },
  {
    name: "Pilau (Spiced Rice)",
    description: "The king of Swahili rice cuisine. Fragrant rice with beef, potatoes, and whole spices.",
    instructions: "1. Boil beef chunks. 2. Toast and grind whole spices (cardamom, cinnamon, cloves, pepper). 3. Fry onions until deep brown. 4. Add spices, garlic, ginger, and potatoes. 5. Add rice and beef stock. Cook until dry.",
    ingredients: [
      { name: "beef", amount: "0.5", unit: "kg" },
      { name: "white rice", amount: "3.33", unit: "cups" },
      { name: "potatoes", amount: "4", unit: "" }
    ],
    calories: 550, protein: 25.0, carbs: 80.0, fat: 15.0,
    prepTimeMinutes: 20, cookTimeMinutes: 60, servings: 4, tags: ["Rice", "Spicy", "Meat"]
  },
  {
    name: "Githeri (Stewed Maize & Beans)",
    description: "A staple Kenyan dish made of boiled maize and beans, stewed with onions and spices.",
    instructions: "1. Sauté onions in oil until soft. 2. Add boiled maize and beans mixture. 3. Add salt and water. 4. Cover and simmer for 10-15 minutes.",
    ingredients: [
      { name: "maize and beans (boiled)", amount: "11", unit: "cups" },
      { name: "onion", amount: "1", unit: "" },
      { name: "cooking oil", amount: "0.33", unit: "cup" }
    ],
    calories: 420, protein: 15.0, carbs: 75.0, fat: 8.0,
    prepTimeMinutes: 10, cookTimeMinutes: 15, servings: 4, tags: ["Staple", "Vegetarian", "Fiber"]
  },
  {
    name: "Mchuzi wa Maharagwe (Bean Stew)",
    description: "Classic kidney bean stew, perfect as an accompaniment to rice or chapati.",
    instructions: "1. Boil beans until soft. 2. Sauté onions, tomatoes, and coriander. 3. Add beans and water. 4. Simmer for 10-15 minutes.",
    ingredients: [
      { name: "kidney beans", amount: "2.66", unit: "cups" },
      { name: "tomato", amount: "1", unit: "" },
      { name: "onion", amount: "1", unit: "" }
    ],
    calories: 310, protein: 12.0, carbs: 55.0, fat: 4.0,
    prepTimeMinutes: 160, cookTimeMinutes: 30, servings: 4, tags: ["Stew", "Legume", "Vegetarian"]
  },
  {
    name: "Mchuzi wa Ndengu (Green Gram Stew)",
    description: "Fragrant stew made from green grams (mung beans). Popular across Kenya.",
    instructions: "1. Boil green grams until soft. 2. Sauté onions and tomatoes. 3. Add boiled grams, water, and salt. 4. Simmer for 15 minutes.",
    ingredients: [
      { name: "green grams", amount: "2.75", unit: "cups" },
      { name: "onion", amount: "1", unit: "" },
      { name: "tomatoes", amount: "2", unit: "" }
    ],
    calories: 340, protein: 14.0, carbs: 60.0, fat: 5.0,
    prepTimeMinutes: 60, cookTimeMinutes: 30, servings: 4, tags: ["Stew", "Legume", "Healthy"]
  },
  {
    name: "Beef Stew",
    description: "Standard Kenyan beef stew, rich and flavorful. Served with ugali or rice.",
    instructions: "1. Boil beef chunks until tender. 2. Sauté onions and tomatoes. 3. Add boiled meat and the broth. 4. Simmer for 8-10 minutes.",
    ingredients: [
      { name: "beef", amount: "1", unit: "kg" },
      { name: "onions", amount: "2", unit: "" },
      { name: "tomatoes", amount: "3", unit: "" }
    ],
    calories: 450, protein: 35.0, carbs: 10.0, fat: 30.0,
    prepTimeMinutes: 10, cookTimeMinutes: 25, servings: 4, tags: ["Stew", "Meat", "Classic"]
  },
  {
    name: "Swahili Biryani Stew",
    description: "Richly spiced beef stew with a thick, aromatic sauce. Traditional Swahili delicacy.",
    instructions: "1. Boil beef until tender. 2. Blend tomatoes, ginger, garlic, capsicum, and coriander into a paste. 3. Fry onions until golden brown. 4. Add paste, meat, spices (pilau masala, turmeric), and potatoes. 5. Simmer then add fermented milk (maziwa mala).",
    ingredients: [
      { name: "beef", amount: "1", unit: "kg" },
      { name: "onions", amount: "8", unit: "" },
      { name: "potatoes", amount: "2", unit: "" },
      { name: "maziwa mala", amount: "1", unit: "cup" }
    ],
    calories: 620, protein: 30.0, carbs: 45.0, fat: 35.0,
    prepTimeMinutes: 20, cookTimeMinutes: 70, servings: 6, tags: ["Stew", "Spicy", "Swahili"]
  },
  {
    name: "Omena Stew (Silver Sardine Stew)",
    description: "Lake Victoria silver sardines stewed with milk and ghee for a rich flavor.",
    instructions: "1. Boil omena in salted water for 40 mins. Drain. 2. Sauté onions and tomatoes. 3. Add omena, milk, and ghee. 4. Simmer for 15 minutes.",
    ingredients: [
      { name: "omena fish (dried)", amount: "2", unit: "cups" },
      { name: "milk", amount: "2.25", unit: "cups" },
      { name: "ghee", amount: "1", unit: "tbsp" }
    ],
    calories: 380, protein: 45.0, carbs: 5.0, fat: 20.0,
    prepTimeMinutes: 15, cookTimeMinutes: 60, servings: 4, tags: ["Fish", "Luo", "Nutritious"]
  },
  {
    name: "Sukuma Wiki (Stir-fried Kales)",
    description: "Kenya's most common side dish. Simple, healthy, and goes perfectly with ugali.",
    instructions: "1. Finely chop kales. 2. Sauté onions and tomatoes in oil. 3. Add kales and salt. 4. Simmer for 5 minutes over low heat.",
    ingredients: [
      { name: "sukuma wiki (kale)", amount: "2.6", unit: "kg" },
      { name: "tomatoes", amount: "2", unit: "" },
      { name: "onion", amount: "1", unit: "" }
    ],
    calories: 120, protein: 4.0, carbs: 15.0, fat: 6.0,
    prepTimeMinutes: 15, cookTimeMinutes: 20, servings: 4, tags: ["Side Dish", "Vegetable", "Healthy"]
  },
  {
    name: "Stir-fried Cabbage",
    description: "Simple and crunchy cabbage stir-fry, a common household side dish.",
    instructions: "1. Chop cabbage and onions. 2. Sauté onions in oil. 3. Add cabbage and salt. 4. Stir-fry for 5-7 minutes.",
    ingredients: [
      { name: "cabbage", amount: "1.1", unit: "kg" },
      { name: "onion", amount: "0.5", unit: "" },
      { name: "cooking oil", amount: "0.5", unit: "cup" }
    ],
    calories: 140, protein: 3.0, carbs: 18.0, fat: 8.0,
    prepTimeMinutes: 10, cookTimeMinutes: 15, servings: 4, tags: ["Side Dish", "Vegetable", "Budget"]
  },
  {
    name: "Saget, Terere & Managu (Traditional Greens Mix)",
    description: "A nutrient-dense blend of spider plant, amaranth, and African nightshade leaves stewed in milk.",
    instructions: "1. Boil the mixed greens in water for 10 mins. Drain. 2. Add milk, onions, and salt. 3. Simmer on low heat while stirring until thick and creamy.",
    ingredients: [
      { name: "spider plant leaves", amount: "451", unit: "g" },
      { name: "African nightshade leaves", amount: "1022", unit: "g" },
      { name: "amaranth leaves", amount: "551", unit: "g" },
      { name: "milk", amount: "2.25", unit: "cups" }
    ],
    calories: 210, protein: 12.0, carbs: 20.0, fat: 10.0,
    prepTimeMinutes: 15, cookTimeMinutes: 20, servings: 4, tags: ["Vegetable", "Traditional", "Superfood"]
  },
  {
    name: "Rhikhuvi (Stewed Cowpea Leaves)",
    description: "Traditional cowpea leaves stewed with milk and 'msherekha' (wood ash solution).",
    instructions: "1. Boil cowpea leaves with msherekha for 20 mins. Drain. 2. Sauté onions in oil. 3. Add leaves, milk, and salt. 4. Simmer for 2 minutes.",
    ingredients: [
      { name: "cowpea leaves", amount: "871", unit: "g" },
      { name: "milk", amount: "0.66", unit: "cup" },
      { name: "onion", amount: "0.5", unit: "" }
    ],
    calories: 180, protein: 8.0, carbs: 25.0, fat: 7.0,
    prepTimeMinutes: 10, cookTimeMinutes: 30, servings: 4, tags: ["Vegetable", "Traditional", "Kamba"]
  },
  {
    name: "Obobwa (Stewed Mushrooms in Peanut Butter)",
    description: "Luhya delicacy of fresh mushrooms stewed in a rich peanut butter sauce.",
    instructions: "1. Sauté onions, mushrooms, and tomatoes. 2. Add peanut butter mixed with water. 3. Add 'msherekha' and simmer for 30-40 mins until rich and tender.",
    ingredients: [
      { name: "mushrooms", amount: "400", unit: "g" },
      { name: "peanut butter", amount: "3.5", unit: "tbsp" },
      { name: "onion", amount: "1", unit: "" }
    ],
    calories: 320, protein: 14.0, carbs: 20.0, fat: 22.0,
    prepTimeMinutes: 15, cookTimeMinutes: 70, servings: 4, tags: ["Vegetable", "Luhya", "Peanut Butter"]
  },
  {
    name: "Matoke (Stewed Green Bananas)",
    description: "Classic stewed green bananas in a rich tomato and onion sauce.",
    instructions: "1. Sauté onions until golden brown. 2. Add tomatoes and salt. 3. Add peeled green bananas and water. 4. Simmer until bananas are tender and sauce is thick.",
    ingredients: [
      { name: "green bananas", amount: "12", unit: "" },
      { name: "tomatoes", amount: "6", unit: "" },
      { name: "onions", amount: "2", unit: "" }
    ],
    calories: 380, protein: 5.0, carbs: 85.0, fat: 6.0,
    prepTimeMinutes: 10, cookTimeMinutes: 60, servings: 4, tags: ["Main Dish", "Banana", "Kisii"]
  },
  {
    name: "Chick Peas Curry (Chole)",
    description: "Spicy and flavorful chickpea curry, popular in the Kenyan Indian community.",
    instructions: "1. Boil soaked chickpeas until tender. 2. Sauté spices (cinnamon, cumin, cloves) with onions. 3. Add tomatoes, tomato paste, and remaining spices (chole masala, turmeric). 4. Add chickpeas and simmer for 5-10 minutes.",
    ingredients: [
      { name: "chickpeas (dried)", amount: "1.66", unit: "cups" },
      { name: "tomatoes", amount: "3", unit: "" },
      { name: "chole masala", amount: "0.5", unit: "tsp" }
    ],
    calories: 350, protein: 15.0, carbs: 55.0, fat: 12.0,
    prepTimeMinutes: 480, cookTimeMinutes: 40, servings: 4, tags: ["Legume", "Spicy", "Indian"]
  }
];

export const seedRecipes = mutation({
  args: {},
  handler: async (ctx) => {
    let count = 0;
    for (const recipeData of RECIPES_TO_SEED) {
      // Check if recipe already exists by name to avoid duplicates
      const existing = await ctx.db
        .query("recipes")
        .filter((q) => q.eq(q.field("name"), recipeData.name))
        .first();

      if (!existing) {
        await ctx.db.insert("recipes", {
          ...recipeData,
          isFavorite: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        count++;
      }
    }
    return `Successfully seeded ${count} public recipes.`;
  },
});
