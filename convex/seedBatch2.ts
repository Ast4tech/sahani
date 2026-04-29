import { mutation } from "./_generated/server";

/**
 * Seed batch 2: Remaining recipes from docs/recipes.md
 * Categories: Snacks, Porridges, Rice Dishes, Mashed Dishes, Maize Dishes,
 *             Legumes, Meats/Fish/Eggs, Poultry, Vegetables, Roots/Bananas,
 *             Ugali, Accompaniments, Desserts
 */
const RECIPES_BATCH_2 = [
  // ── Snacks (missing) ──────────────────────────────────────────────────
  {
    name: "Basic Mandazi",
    description: "You will find this recipe in any home across Kenya. Preferred for its simplicity, it serves the entire family.",
    instructions: "1. Mix wheat flour, baking powder, and sugar.\n2. Add water and mix to soft dough.\n3. Add cooking oil and continue kneading.\n4. Cover and leave to stand for 40 minutes.\n5. Roll out and cut into desired shapes.\n6. Deep fry until golden brown.",
    ingredients: [
      { name: "wheat flour", amount: "7.25", unit: "cups" },
      { name: "baking powder", amount: "3", unit: "tbsp" },
      { name: "sugar", amount: "0.67", unit: "cup" },
    ],
    calories: 379, protein: 5.0, carbs: 50.0, fat: 16.0,
    prepTimeMinutes: 60, cookTimeMinutes: 30, servings: 4,
    tags: ["mealType:Snack", "cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Drop Scones",
    description: "Commonly referred to as 'Drops', popular in urban areas as a breakfast snack enjoyed by the entire family.",
    instructions: "1. Put wheat flour into a mixing bowl.\n2. Rub in margarine until fine.\n3. Dissolve sugar into milk and add to flour.\n4. Add water, eggs, salt and oil.\n5. Stir until mixture bubbles.\n6. Heat pan, pour scoops and cook until golden brown.",
    ingredients: [
      { name: "wheat flour, self-raising", amount: "3", unit: "cups" },
      { name: "eggs", amount: "3", unit: "" },
      { name: "cow milk", amount: "1.75", unit: "cups" },
    ],
    calories: 449, protein: 7.1, carbs: 37.4, fat: 29.8,
    prepTimeMinutes: 20, cookTimeMinutes: 30, servings: 40,
    tags: ["mealType:Breakfast", "mealType:Snack", "cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Mkate Kuta",
    description: "Typical Nubian recipe, traditionally served on the wedding day to escort the bride. A snack for the entire family.",
    instructions: "1. Mix all-purpose and self-rising flour.\n2. Heat oil and add to flour gradually.\n3. Mix sugar and cardamom, add to flour.\n4. Add warm water and knead to soft dough.\n5. Rest 20 minutes, knead again.\n6. Cut into cubes and deep fry until golden brown.",
    ingredients: [
      { name: "wheat flour, all-purpose", amount: "3.5", unit: "cups" },
      { name: "wheat flour, self-rising", amount: "3.5", unit: "cups" },
      { name: "sugar", amount: "1.5", unit: "cups" },
    ],
    calories: 400, protein: 5.0, carbs: 55.0, fat: 18.0,
    prepTimeMinutes: 20, cookTimeMinutes: 60, servings: 4,
    tags: ["mealType:Snack", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Oatmeal",
    description: "Quick breakfast recipe common among urban dwellers, eaten by the entire family.",
    instructions: "1. Put oats and water into a pot.\n2. Add salt to taste.\n3. Bring to boil while stirring continuously.\n4. Boil for 1 minute, remove from heat and cover.\n5. Serve.",
    ingredients: [
      { name: "oats", amount: "1", unit: "cup" },
      { name: "water", amount: "2.33", unit: "cups" },
      { name: "salt", amount: "0.25", unit: "tsp" },
    ],
    calories: 150, protein: 5.0, carbs: 27.0, fat: 3.0,
    prepTimeMinutes: 5, cookTimeMinutes: 5, servings: 4,
    tags: ["mealType:Breakfast", "difficulty:Easy"],
  },
  {
    name: "Chai ya Maziwa (Mixed Tea)",
    description: "The most popular non-alcoholic beverage in Kenya. Enriched with fresh milk.",
    instructions: "1. Bring water to a boil.\n2. Add tea leaves and cook for 5 minutes.\n3. Add milk and bring to a boil.\n4. Add sugar, stir and bring to a boil.\n5. Turn off heat and sieve.\n6. Serve while hot.",
    ingredients: [
      { name: "water", amount: "13", unit: "cups" },
      { name: "cow milk", amount: "4.5", unit: "cups" },
      { name: "tea leaves", amount: "3", unit: "tbsp" },
    ],
    calories: 50, protein: 2.0, carbs: 8.0, fat: 1.5,
    prepTimeMinutes: 5, cookTimeMinutes: 60, servings: 17,
    tags: ["mealType:Breakfast", "cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Vimumunya vya Chumvi (Pumpkin & Coconut Milk)",
    description: "Pumpkin meal common among the Mijikenda community. Served as main course or dessert.",
    instructions: "1. Peel pumpkin and cut into chunks.\n2. Put in pot with water and start cooking.\n3. Add salt and boil for 15 minutes.\n4. Add coconut milk and boil for 5 minutes.\n5. Remove from heat and serve.",
    ingredients: [
      { name: "pumpkin", amount: "739", unit: "g" },
      { name: "coconut milk", amount: "1.125", unit: "cups" },
      { name: "salt", amount: "1", unit: "tsp" },
    ],
    calories: 120, protein: 2.0, carbs: 20.0, fat: 5.0,
    prepTimeMinutes: 5, cookTimeMinutes: 25, servings: 4,
    tags: ["cuisine:Kenyan", "dietary:Vegan", "difficulty:Easy"],
  },
  // ── Porridges ─────────────────────────────────────────────────────────
  {
    name: "Maize Porridge (Uji wa Mahindi)",
    description: "Whole maize flour porridge enriched with milk, also serves as an infant dish.",
    instructions: "1. Boil 5 cups of water.\n2. Mix maize flour with 2 cups cold water.\n3. Add mixture to boiling water while stirring.\n4. Cook for 3 minutes.\n5. Add milk and cook for 7 more minutes.\n6. Serve hot.",
    ingredients: [
      { name: "whole maize flour", amount: "1.75", unit: "cups" },
      { name: "water", amount: "7", unit: "cups" },
      { name: "cow milk", amount: "1.5", unit: "cups" },
    ],
    calories: 52, protein: 1.5, carbs: 8.5, fat: 1.1,
    prepTimeMinutes: 5, cookTimeMinutes: 25, servings: 4,
    tags: ["mealType:Breakfast", "cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Finger Millet Porridge (Uji wa Wimbi)",
    description: "Porridge from finger millet, a good source of fibre. Common in Western and Eastern Kenya.",
    instructions: "1. Boil 5 cups of water.\n2. Mix finger millet flour with 2 cups cold water.\n3. Add paste to boiling water and stir.\n4. Boil for 5 minutes and add sugar.\n5. Serve hot.",
    ingredients: [
      { name: "finger millet flour", amount: "1", unit: "cup" },
      { name: "sugar", amount: "2.5", unit: "tbsp" },
      { name: "water", amount: "7", unit: "cups" },
    ],
    calories: 40, protein: 0.7, carbs: 7.8, fat: 0.2,
    prepTimeMinutes: 5, cookTimeMinutes: 20, servings: 4,
    tags: ["mealType:Breakfast", "cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Sorghum, Finger Millet and Maize Porridge",
    description: "Rich porridge from a mixture of 3 grains, enriched with milk. Serves infants and adults.",
    instructions: "1. Mix the three flours in a bowl.\n2. Add 2 cups cold water and stir smooth.\n3. Bring 5 cups water to boil.\n4. Add flour mixture while stirring.\n5. Add milk after 10 minutes.\n6. Keep stirring until cooked.",
    ingredients: [
      { name: "sorghum flour", amount: "8", unit: "tbsp" },
      { name: "finger millet flour", amount: "6.5", unit: "tbsp" },
      { name: "maize flour", amount: "8.25", unit: "tbsp" },
    ],
    calories: 41, protein: 1.3, carbs: 6.3, fat: 0.9,
    prepTimeMinutes: 5, cookTimeMinutes: 30, servings: 4,
    tags: ["mealType:Breakfast", "cuisine:Kenyan", "difficulty:Easy"],
  },
  // ── Rice Dishes ───────────────────────────────────────────────────────
  {
    name: "Mseto wa Maharagwe (Rice with Beans)",
    description: "Rice cooked with kidney beans in one pot. Common staple across Kenya.",
    instructions: "1. Soak beans in water for 2 hours 35 minutes.\n2. Boil beans for 3 hours.\n3. Fry onions and tomatoes.\n4. Add beans and stir.\n5. Add 8 cups water and bring to boil.\n6. Add rice and cook on low heat for 20 minutes.",
    ingredients: [
      { name: "kidney beans", amount: "3", unit: "cups" },
      { name: "white rice", amount: "4", unit: "cups" },
      { name: "onion", amount: "1", unit: "" },
    ],
    calories: 193, protein: 5.0, carbs: 23.5, fat: 7.9,
    prepTimeMinutes: 165, cookTimeMinutes: 225, servings: 6,
    tags: ["mealType:Lunch", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Mseto wa Ndengu (Rice with Green Grams)",
    description: "Rice with green grams prepared using freshly squeezed coconut milk. Popular at the coast.",
    instructions: "1. Boil green grams in 6 cups water for 1 hour.\n2. Chop onions finely.\n3. Boil 7 cups water with onion and salt.\n4. Add rice and cook until water dries.\n5. Add green grams and reduce heat.\n6. Add coconut milk, cover on low heat for 10 minutes.",
    ingredients: [
      { name: "white rice", amount: "3.5", unit: "cups" },
      { name: "green grams", amount: "1.25", unit: "cups" },
      { name: "coconut milk", amount: "0.75", unit: "cup" },
    ],
    calories: 103, protein: 3.7, carbs: 18.4, fat: 1.3,
    prepTimeMinutes: 15, cookTimeMinutes: 90, servings: 6,
    tags: ["mealType:Lunch", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Wali wa Kuchemshwa (Boiled Rice)",
    description: "One of the simplest ways rice is cooked in Kenya. Common across communities.",
    instructions: "1. Sort and wash the rice.\n2. Boil water for 2 minutes.\n3. Add salt and rice, stir and boil 10 minutes.\n4. Reduce heat and simmer for 16 minutes.\n5. Add cooking oil and stir.\n6. Cover and simmer until ready.",
    ingredients: [
      { name: "white rice", amount: "5.67", unit: "cups" },
      { name: "salt", amount: "3", unit: "tsp" },
      { name: "cooking oil", amount: "0.25", unit: "cup" },
    ],
    calories: 200, protein: 4.0, carbs: 40.0, fat: 3.0,
    prepTimeMinutes: 5, cookTimeMinutes: 40, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Mcheleng (Rice with Milk)",
    description: "Creamy rice dish unique to the Kalenjin community. Made with milk and cream.",
    instructions: "1. Put milk, water and cream into a pot.\n2. Add salt and bring to boil.\n3. Add rice and cook for 20 minutes until liquid dries up.\n4. Remove from heat and cover.\n5. Serve while hot.",
    ingredients: [
      { name: "white rice", amount: "2.75", unit: "cups" },
      { name: "cow milk", amount: "2.25", unit: "cups" },
      { name: "milk cream", amount: "1.25", unit: "cups" },
    ],
    calories: 280, protein: 7.0, carbs: 38.0, fat: 12.0,
    prepTimeMinutes: 10, cookTimeMinutes: 30, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Easy"],
  },
  // ── Mashed Dishes ─────────────────────────────────────────────────────
  {
    name: "Mukimo (Fresh Maize, Potatoes & Pumpkin Leaves)",
    description: "Common among the Kikuyu, Meru and Embu communities. Served with meat stew.",
    instructions: "1. Peel potatoes and wash.\n2. Wash and chop pumpkin leaves.\n3. Add water, potatoes, pumpkin leaves and salt.\n4. Boil for 20 minutes.\n5. Add boiled maize and cook for 10 minutes.\n6. Remove from fire and mash to serve.",
    ingredients: [
      { name: "potatoes", amount: "6", unit: "" },
      { name: "pumpkin leaves", amount: "4", unit: "bunches" },
      { name: "green maize, boiled", amount: "2.5", unit: "cups" },
    ],
    calories: 118, protein: 5.0, carbs: 20.5, fat: 0.7,
    prepTimeMinutes: 15, cookTimeMinutes: 75, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Mushenye (Green Maize and Sweet Potatoes)",
    description: "Typical Luhya dish served as a main during lunch or dinner. Traditionally eaten plain.",
    instructions: "1. Boil beans for 2 hours.\n2. Shell maize grains into a bowl.\n3. Add green maize to cooked beans.\n4. Peel sweet potatoes.\n5. Add sweet potatoes, peanut butter, salt and water.\n6. Cook for 1 hour 15 minutes, then mash and serve.",
    ingredients: [
      { name: "kidney beans", amount: "3.75", unit: "cups" },
      { name: "green maize", amount: "2", unit: "cobs" },
      { name: "sweet potatoes", amount: "4", unit: "" },
    ],
    calories: 250, protein: 10.0, carbs: 45.0, fat: 5.0,
    prepTimeMinutes: 20, cookTimeMinutes: 280, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  // ── Meats, Fish & Eggs ────────────────────────────────────────────────
  {
    name: "Stir Fried Goat Meat",
    description: "Common across many communities in Kenya. Eaten with rice, ugali and more.",
    instructions: "1. Cut goat meat into small pieces.\n2. Add meat, water and salt to a pot and boil.\n3. Cut onions and tomatoes.\n4. Add onions and continue boiling.\n5. When water dries, add oil and stir.\n6. Add tomatoes and simmer until ready.",
    ingredients: [
      { name: "goat meat", amount: "1", unit: "kg" },
      { name: "onion", amount: "1", unit: "" },
      { name: "tomatoes", amount: "3", unit: "" },
    ],
    calories: 350, protein: 30.0, carbs: 5.0, fat: 24.0,
    prepTimeMinutes: 10, cookTimeMinutes: 100, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Stir Fried Beef",
    description: "Common across many communities, more popular among urban dwellers. Served for lunch or dinner.",
    instructions: "1. Cut beef into small pieces.\n2. Chop onions and tomatoes.\n3. Boil meat in 3 cups water for 1 hour.\n4. Strain liquid and keep.\n5. Heat oil, fry onions, add tomatoes and meat.\n6. Add strained water and cook until dry.",
    ingredients: [
      { name: "beef", amount: "1", unit: "kg" },
      { name: "onions", amount: "2", unit: "" },
      { name: "tomatoes", amount: "3", unit: "" },
    ],
    calories: 400, protein: 35.0, carbs: 5.0, fat: 28.0,
    prepTimeMinutes: 10, cookTimeMinutes: 60, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Fried Tilapia",
    description: "Delicacy traditionally relished among the Luo community. Eaten with ugali.",
    instructions: "1. Prepare and wash the fresh fish.\n2. Score the length and sprinkle salt.\n3. Heat oil in a pan.\n4. Fry until golden brown.\n5. Turn to cook the other side.\n6. Place on paper towel to drain.",
    ingredients: [
      { name: "fresh tilapia", amount: "1", unit: "whole" },
      { name: "cooking oil", amount: "4.25", unit: "cups" },
      { name: "salt", amount: "1.5", unit: "tsp" },
    ],
    calories: 300, protein: 25.0, carbs: 0.0, fat: 22.0,
    prepTimeMinutes: 10, cookTimeMinutes: 30, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Minced Meat Balls",
    description: "Common in urban communities. Made from minced meat with fresh spices.",
    instructions: "1. Pound the minced meat.\n2. Cut onions and tomatoes.\n3. Mix half the onions, garlic, cumin, coriander into meat.\n4. Add rice and crush.\n5. Fry remaining onions, add tomatoes and water.\n6. Form meat balls and add to simmering soup.\n7. Simmer 30 minutes until ready.",
    ingredients: [
      { name: "minced beef", amount: "1", unit: "kg" },
      { name: "onions", amount: "4", unit: "" },
      { name: "tomatoes", amount: "5", unit: "" },
    ],
    calories: 350, protein: 25.0, carbs: 10.0, fat: 24.0,
    prepTimeMinutes: 30, cookTimeMinutes: 75, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Hard"],
  },
  {
    name: "Omelette",
    description: "Popular among urbanite communities. Served for breakfast, enjoyed by the entire family.",
    instructions: "1. Break 4 eggs into a bowl.\n2. Heat a little oil on a pan.\n3. Cut onion and tomatoes into small cubes.\n4. Whisk eggs with salt, add onions and tomatoes.\n5. Pour into heated pan and cook 6 minutes per side.\n6. Serve.",
    ingredients: [
      { name: "eggs", amount: "4", unit: "" },
      { name: "tomatoes", amount: "2", unit: "" },
      { name: "onion", amount: "1", unit: "" },
    ],
    calories: 121, protein: 6.6, carbs: 5.3, fat: 7.8,
    prepTimeMinutes: 5, cookTimeMinutes: 15, servings: 4,
    tags: ["mealType:Breakfast", "cuisine:Kenyan", "difficulty:Easy"],
  },
  // ── Poultry ───────────────────────────────────────────────────────────
  {
    name: "Ingokho (Stewed Chicken)",
    description: "Common among many communities. Special to the Luhya community. Eaten with ugali.",
    instructions: "1. Singe feathers over charcoal.\n2. Cut chicken into chunks and roast 5 minutes.\n3. Cook without oil to brown further.\n4. Add salt and capsicum, simmer 9 minutes.\n5. Add onions and cook 25 minutes.\n6. Add tomatoes and cook 13 minutes.",
    ingredients: [
      { name: "chicken, whole", amount: "1.4", unit: "kg" },
      { name: "onions", amount: "2", unit: "" },
      { name: "tomatoes", amount: "4", unit: "" },
    ],
    calories: 280, protein: 25.0, carbs: 5.0, fat: 18.0,
    prepTimeMinutes: 15, cookTimeMinutes: 75, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Ingokho (Fried Chicken)",
    description: "Special Luhya delicacy. Traditionally eaten during dowry ceremonies.",
    instructions: "1. Cut chicken into large chunks.\n2. Wash the meat.\n3. Add oil to pan and heat.\n4. Add salt to chicken and rub in.\n5. Heat oil for 6 minutes.\n6. Fry chicken, turn every 3 minutes until golden brown.",
    ingredients: [
      { name: "chicken, whole", amount: "1.3", unit: "kg" },
      { name: "salt", amount: "2", unit: "tsp" },
      { name: "cooking oil", amount: "3.125", unit: "cups" },
    ],
    calories: 350, protein: 28.0, carbs: 0.0, fat: 26.0,
    prepTimeMinutes: 10, cookTimeMinutes: 60, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  // ── More Vegetables ───────────────────────────────────────────────────
  {
    name: "Stir-fried Spinach",
    description: "One of the most common green vegetables in Kenya. Eaten with ugali or any starchy meal.",
    instructions: "1. Remove stalks and wash spinach.\n2. Cut spinach.\n3. Chop onions.\n4. Heat oil, add onions and cook 4 minutes.\n5. Add spinach and salt.\n6. Cover and simmer for 10 minutes.",
    ingredients: [
      { name: "spinach leaves", amount: "675", unit: "g" },
      { name: "onion", amount: "1", unit: "" },
      { name: "cooking oil", amount: "0.125", unit: "cup" },
    ],
    calories: 60, protein: 3.0, carbs: 5.0, fat: 3.5,
    prepTimeMinutes: 10, cookTimeMinutes: 15, servings: 4,
    tags: ["dietary:Vegan", "cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Terere (Stir-fried Amaranth Leaves)",
    description: "Indigenous vegetable now cultivated and eaten across all communities in Kenya.",
    instructions: "1. Cut onion and tomatoes.\n2. Heat oil, add onion and cook until golden brown.\n3. Add tomatoes and stir until cooked.\n4. Add amaranth and salt, mix well.\n5. Cover and simmer, stirring momentarily.\n6. Remove from fire when ready, about 10 minutes.",
    ingredients: [
      { name: "amaranth leaves", amount: "1585", unit: "g" },
      { name: "tomatoes", amount: "2", unit: "" },
      { name: "onion", amount: "1", unit: "" },
    ],
    calories: 83, protein: 3.0, carbs: 2.9, fat: 5.3,
    prepTimeMinutes: 10, cookTimeMinutes: 20, servings: 4,
    tags: ["dietary:Vegan", "cuisine:Kenyan", "difficulty:Easy"],
  },
  // ── Legume Dishes ─────────────────────────────────────────────────────
  {
    name: "Mchuzi wa Ndengu Kamande (Lentil Stew)",
    description: "Lentil stew with a characteristic aromatic taste. Accompaniment to rice or chapatti.",
    instructions: "1. Sort, wash and boil lentils for 1 hour.\n2. Cut tomatoes and onions.\n3. Heat oil, add onions and cook 6 minutes.\n4. Add tomatoes and salt, cook 7 minutes.\n5. Add lentils and water.\n6. Cover and cook for 6 minutes.",
    ingredients: [
      { name: "lentils", amount: "2.33", unit: "cups" },
      { name: "onions", amount: "2", unit: "" },
      { name: "tomatoes", amount: "2", unit: "" },
    ],
    calories: 108, protein: 7.1, carbs: 11.1, fat: 3.0,
    prepTimeMinutes: 60, cookTimeMinutes: 20, servings: 6,
    tags: ["mealType:Lunch", "mealType:Dinner", "dietary:Vegan", "cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Mchuzi wa Mbaazi (Pigeon Peas Stew)",
    description: "Common among the Kamba community. Eaten with ugali, rice or chapatti.",
    instructions: "1. Boil pigeon peas until soft.\n2. Strain water and keep.\n3. Chop onions and tomatoes.\n4. Heat cooking fat, fry onions until golden brown.\n5. Add tomatoes and salt, cook until tender.\n6. Add pigeon peas and drained water, boil 5 minutes.",
    ingredients: [
      { name: "pigeon peas, dried", amount: "2.5", unit: "cups" },
      { name: "onion", amount: "1", unit: "" },
      { name: "tomatoes", amount: "2", unit: "" },
    ],
    calories: 160, protein: 8.0, carbs: 22.0, fat: 4.0,
    prepTimeMinutes: 10, cookTimeMinutes: 160, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "dietary:Vegan", "cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Njahi (Black Bean Stew)",
    description: "Common among Kikuyu, Kisii, Meru communities. Traditionally given to lactating mothers.",
    instructions: "1. Sort and wash black beans.\n2. Boil in water until soft.\n3. Drain excess water.\n4. Cut onion and tomatoes.\n5. Fry onions, add tomatoes and salt.\n6. Add beans, water and simmer for 6 minutes.",
    ingredients: [
      { name: "black beans, dolichos", amount: "2.5", unit: "cups" },
      { name: "onions", amount: "2", unit: "" },
      { name: "tomatoes", amount: "3", unit: "" },
    ],
    calories: 180, protein: 10.0, carbs: 28.0, fat: 3.0,
    prepTimeMinutes: 15, cookTimeMinutes: 195, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "dietary:Vegan", "cuisine:Kenyan", "difficulty:Medium"],
  },
  // ── Root & Banana Dishes ──────────────────────────────────────────────
  {
    name: "Stewed Potatoes & Arrowroots",
    description: "Nostalgic dish from the Kikuyu, Meru and Embu communities. A main meal for the family.",
    instructions: "1. Peel and cut potatoes, arrowroots, bananas.\n2. Cut onions and tomatoes.\n3. Heat oil, fry onions until golden brown.\n4. Add tomatoes, salt, potatoes.\n5. Add arrowroots and water.\n6. Add bananas and cook until ready.",
    ingredients: [
      { name: "potatoes", amount: "9", unit: "" },
      { name: "arrowroots", amount: "3", unit: "" },
      { name: "green bananas", amount: "6", unit: "" },
    ],
    calories: 200, protein: 3.0, carbs: 40.0, fat: 4.0,
    prepTimeMinutes: 15, cookTimeMinutes: 60, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Yam Stew",
    description: "Ancient root delicacy of the Meru community. Packed with wholesome starch.",
    instructions: "1. Peel and cut yam and potatoes.\n2. Cut tomatoes, carrots and onions.\n3. Heat oil, add onions.\n4. Add tomatoes, salt, then cut yam.\n5. Add water and cover.\n6. Add potatoes and carrots, cook until tender.",
    ingredients: [
      { name: "yam, white", amount: "1", unit: "" },
      { name: "potatoes", amount: "6", unit: "" },
      { name: "carrots", amount: "2", unit: "" },
    ],
    calories: 94, protein: 1.5, carbs: 15.3, fat: 2.4,
    prepTimeMinutes: 20, cookTimeMinutes: 60, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "dietary:Vegan", "difficulty:Medium"],
  },
  // ── Ugali ─────────────────────────────────────────────────────────────
  {
    name: "Whole Maize Flour Ugali",
    description: "The most consumed ugali in all communities in Kenya. Main dish served with vegetables or protein.",
    instructions: "1. Measure water and flour.\n2. Bring all water to a boil.\n3. Add flour and mix while pressing against the pot until smooth.\n4. Reduce fire and simmer for 13 minutes.\n5. Serve.",
    ingredients: [
      { name: "whole maize flour", amount: "3.67", unit: "cups" },
      { name: "water", amount: "4.75", unit: "cups" },
    ],
    calories: 141, protein: 3.3, carbs: 26.0, fat: 1.8,
    prepTimeMinutes: 5, cookTimeMinutes: 25, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "dietary:Vegan", "difficulty:Easy"],
  },
  // ── Accompaniments ────────────────────────────────────────────────────
  {
    name: "White Chapati",
    description: "Common in many communities, even more popular in urban areas. Eaten with stews.",
    instructions: "1. Mix flour, sugar and salt.\n2. Warm water and add to dry mix.\n3. Knead to soft dough for 6 minutes.\n4. Rest 16 minutes.\n5. Roll out, apply oil, cut and form balls.\n6. Roll into discs and cook on pan until lightly browned.",
    ingredients: [
      { name: "wheat flour, refined", amount: "4.33", unit: "cups" },
      { name: "water", amount: "1.5", unit: "cups" },
      { name: "cooking oil", amount: "0.75", unit: "cup" },
    ],
    calories: 424, protein: 7.8, carbs: 49.6, fat: 21.1,
    prepTimeMinutes: 30, cookTimeMinutes: 30, servings: 6,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Brown Chapati",
    description: "Preferred by the health-conscious due to high fibre content from whole wheat flour.",
    instructions: "1. Mix whole wheat flour, sugar and salt.\n2. Heat water until warm.\n3. Pour water into dry mixture.\n4. Knead to soft dough.\n5. Rest 15 minutes.\n6. Roll out into discs and cook on pan until golden brown.",
    ingredients: [
      { name: "wheat flour, whole", amount: "3.67", unit: "cups" },
      { name: "water", amount: "1", unit: "cup" },
      { name: "cooking oil", amount: "0.67", unit: "cup" },
    ],
    calories: 413, protein: 7.3, carbs: 40.9, fat: 22.9,
    prepTimeMinutes: 30, cookTimeMinutes: 30, servings: 7,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "dietary:High-Protein", "difficulty:Medium"],
  },
  // ── Desserts ──────────────────────────────────────────────────────────
  {
    name: "Vimumunya vya Sukari (Sweetened Pumpkin & Coconut Milk)",
    description: "Famous Swahili dessert served after meals, enjoyed by the entire family.",
    instructions: "1. Peel pumpkin and cut into chunks.\n2. Add water and heat.\n3. Boil for 17 minutes.\n4. Add half the coconut milk and boil 6 minutes.\n5. Add sugar and cardamom.\n6. Add rest of coconut milk, cook 18 minutes.",
    ingredients: [
      { name: "pumpkin", amount: "1.7", unit: "kg" },
      { name: "coconut milk", amount: "1.5", unit: "cups" },
      { name: "sugar", amount: "0.5", unit: "cup" },
    ],
    calories: 150, protein: 2.0, carbs: 30.0, fat: 5.0,
    prepTimeMinutes: 5, cookTimeMinutes: 45, servings: 4,
    tags: ["cuisine:Kenyan", "dietary:Vegan", "difficulty:Easy"],
  },
  {
    name: "Potato Curry",
    description: "Spiced recipe typical to the Kenyan Indian community. Part of a full meal platter.",
    instructions: "1. Peel, wash and cut potatoes.\n2. Blend tomatoes with turmeric, coriander and chilli powder.\n3. Heat oil, add fenugreek, mustard seeds, curry leaves and cumin.\n4. Add blended ingredients and cook.\n5. Add potatoes and sugar-lemon solution.\n6. Cover and cook 16 minutes until tender.",
    ingredients: [
      { name: "potatoes", amount: "3", unit: "" },
      { name: "tomatoes", amount: "2", unit: "" },
      { name: "turmeric powder", amount: "0.25", unit: "tsp" },
    ],
    calories: 150, protein: 3.0, carbs: 25.0, fat: 5.0,
    prepTimeMinutes: 15, cookTimeMinutes: 30, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:International", "dietary:Vegan", "difficulty:Medium"],
  },
  {
    name: "Stewed Nile Perch",
    description: "Dominant among the Luo and Luhya communities. Mainly served with ugali.",
    instructions: "1. Wash and cut fish into pieces.\n2. Chop onion and tomatoes.\n3. Boil fish in water for 1 hour.\n4. In separate pot, heat oil and cook onions and tomatoes.\n5. Transfer stew to fish and stir.\n6. Simmer 20 minutes and serve.",
    ingredients: [
      { name: "Nile perch fish", amount: "1", unit: "kg" },
      { name: "onion", amount: "1", unit: "" },
      { name: "tomatoes", amount: "3", unit: "" },
    ],
    calories: 200, protein: 22.0, carbs: 3.0, fat: 11.0,
    prepTimeMinutes: 5, cookTimeMinutes: 80, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Muthokoi (Dehulled Maize and Beans)",
    description: "Traditional dish among the Kamba, Taita and Meru communities. Delicious smooth taste.",
    instructions: "1. Boil maize and beans in water for 2.5 hours.\n2. Drain and keep the water.\n3. Chop onion.\n4. Heat oil, add onions and cook until soft.\n5. Add muthokoi and salt, stir to mix.\n6. Add drained water, cover and cook 5 minutes.",
    ingredients: [
      { name: "maize, de-germed", amount: "2.5", unit: "cups" },
      { name: "kidney beans", amount: "2.67", unit: "cups" },
      { name: "onion", amount: "1", unit: "" },
    ],
    calories: 185, protein: 6.9, carbs: 17.8, fat: 7.2,
    prepTimeMinutes: 165, cookTimeMinutes: 15, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Groundnut Sauce",
    description: "Rich and smooth sauce unique to Luhya and Luo communities. Fed to infants and children.",
    instructions: "1. Roast groundnuts with salt and water.\n2. When they pop, reduce heat and stir until dry.\n3. Cool and blend into paste.\n4. Mix with sour milk to thick paste.\n5. Heat while stirring until smooth.\n6. Serve with vegetables, fish, or ugali.",
    ingredients: [
      { name: "groundnuts, raw", amount: "3.33", unit: "cups" },
      { name: "sour milk", amount: "4.33", unit: "cups" },
      { name: "salt", amount: "2.5", unit: "tsp" },
    ],
    calories: 350, protein: 15.0, carbs: 15.0, fat: 28.0,
    prepTimeMinutes: 5, cookTimeMinutes: 100, servings: 4,
    tags: ["cuisine:Kenyan", "dietary:High-Protein", "difficulty:Medium"],
  },
];

export const seedRecipesBatch2 = mutation({
  args: {},
  handler: async (ctx) => {
    let count = 0;
    for (const recipeData of RECIPES_BATCH_2) {
      const existing = await ctx.db
        .query("recipes")
        .filter((q) => q.eq(q.field("name"), recipeData.name))
        .first();

      if (!existing) {
        // Parse instructions into steps
        const steps = recipeData.instructions
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((text, i) => ({
            text: text.replace(/^\d+\.\s*/, ""),
            order: i,
          }));

        await ctx.db.insert("recipes", {
          ...recipeData,
          steps,
          isFavorite: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        count++;
      }
    }
    return `Seeded ${count} new recipes (batch 2). ${RECIPES_BATCH_2.length} total in batch.`;
  },
});
