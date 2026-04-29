import { mutation } from "./_generated/server";

/**
 * Seed batch 3: Remaining recipes from docs/recipes.md
 * Covers: more porridges, ugali variants, blood dishes, more vegetables,
 *         more root dishes, curries, accompaniments, fish dishes
 */
const RECIPES_BATCH_3 = [
  // ── Porridges ─────────────────────────────────────────────────────────
  {
    name: "Cassava Porridge (Uji wa Muhogo)",
    description: "Ancient cassava dried and ground into fine flour makes refreshing porridge for the entire family.",
    instructions: "1. Boil 6 cups of water for 6 minutes.\n2. Mix cassava flour with 2.5 cups water to a medium paste.\n3. Add paste to boiling water, stir continuously.\n4. Boil for 13 minutes and add sugar.\n5. Stir, remove and serve.",
    ingredients: [
      { name: "cassava flour", amount: "10", unit: "tbsp" },
      { name: "sugar", amount: "2", unit: "tbsp" },
      { name: "water", amount: "8.5", unit: "cups" },
    ],
    calories: 28, protein: 0.1, carbs: 6.8, fat: 0.0,
    prepTimeMinutes: 2, cookTimeMinutes: 20, servings: 6,
    tags: ["mealType:Breakfast", "cuisine:Kenyan", "dietary:Vegan", "difficulty:Easy"],
  },
  {
    name: "Bulrush Millet Porridge (Uji wa Mawele)",
    description: "Common among Bantu communities in Eastern Kenya. Traditionally a special treat during rites ceremonies.",
    instructions: "1. Boil 3.33 cups water.\n2. Mix bulrush millet flour with 1 cup water to smooth consistency.\n3. Add mixture to boiling water while stirring.\n4. Add sugar after 5 minutes.\n5. Cook for 13 minutes and remove from fire.",
    ingredients: [
      { name: "bulrush millet flour", amount: "1.33", unit: "cups" },
      { name: "sugar", amount: "2", unit: "tbsp" },
      { name: "water", amount: "4.33", unit: "cups" },
    ],
    calories: 83, protein: 2.0, carbs: 15.7, fat: 1.0,
    prepTimeMinutes: 5, cookTimeMinutes: 25, servings: 4,
    tags: ["mealType:Breakfast", "cuisine:Kenyan", "dietary:Vegan", "difficulty:Easy"],
  },
  {
    name: "Rice Flour Porridge (Uji wa Mchele)",
    description: "Native infant porridge among the Swahilis. Flavoured and enriched with coconut milk.",
    instructions: "1. Mix 6 cups water with cardamom and bring to boil.\n2. Mix rice flour with 2 cups water to smooth paste.\n3. Add paste to boiling water gradually, stir continuously.\n4. Cook 3 minutes, add coconut milk.\n5. Add sugar and stir to smooth consistency.\n6. Remove from heat.",
    ingredients: [
      { name: "rice flour", amount: "1", unit: "cup" },
      { name: "coconut milk", amount: "0.67", unit: "cup" },
      { name: "cardamom powder", amount: "0.5", unit: "tsp" },
    ],
    calories: 56, protein: 0.6, carbs: 10.2, fat: 1.3,
    prepTimeMinutes: 5, cookTimeMinutes: 20, servings: 6,
    tags: ["mealType:Breakfast", "cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Busara (Whole Maize and Finger Millet Porridge)",
    description: "King of porridge in Kuria. Prepared from sprouted finger millet. Traditionally given to lactating mothers.",
    instructions: "1. Heat 1.5 cups water.\n2. Mix sprouted millet flour with hot water, cover 5 minutes.\n3. Mix remaining dry flours.\n4. Add 6 cups water to dry mix and stir smooth.\n5. Boil 13 cups water, add paste, cook 2 minutes.\n6. Add to sprouted mixture in gourd, rest 1.5 hours. Serve cold.",
    ingredients: [
      { name: "maize flour, whole", amount: "1", unit: "cup" },
      { name: "finger millet flour", amount: "2.125", unit: "cups" },
      { name: "sprouted finger millet flour", amount: "1.5", unit: "cups" },
    ],
    calories: 40, protein: 1.0, carbs: 7.3, fat: 0.3,
    prepTimeMinutes: 5, cookTimeMinutes: 120, servings: 4,
    tags: ["mealType:Breakfast", "cuisine:Kenyan", "dietary:Vegan", "difficulty:Medium"],
  },
  {
    name: "Wheat Flour Porridge (Uji wa Ngano)",
    description: "Nubian community special for infant feeding. Enriched with peanut butter and sugar.",
    instructions: "1. Boil 4 cups water.\n2. Mix wheat flour with 1.5 cups water to smooth consistency.\n3. Add to boiling water and stir until it bubbles.\n4. Mix peanut butter with 0.5 cup water, add gradually while stirring.\n5. Boil 3 minutes and add sugar.\n6. Simmer 4 minutes and serve.",
    ingredients: [
      { name: "wheat flour", amount: "0.75", unit: "cup" },
      { name: "peanut butter", amount: "0.5", unit: "cup" },
      { name: "sugar", amount: "0.67", unit: "cup" },
    ],
    calories: 200, protein: 6.0, carbs: 28.0, fat: 8.0,
    prepTimeMinutes: 5, cookTimeMinutes: 15, servings: 4,
    tags: ["mealType:Breakfast", "cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Finger Millet and Sorghum Porridge",
    description: "Classic blend of sorghum and finger millet. Excellent complementary food in most communities.",
    instructions: "1. Boil 3 cups water.\n2. Mix finger millet and sorghum flour, add 1.5 cups milk and stir smooth.\n3. Add mixture to boiling water, stir continuously.\n4. Add rest of milk and water.\n5. Cook while stirring 8-10 minutes.\n6. Remove from heat.",
    ingredients: [
      { name: "finger millet flour", amount: "1", unit: "cup" },
      { name: "sorghum flour", amount: "5.5", unit: "tbsp" },
      { name: "cow milk", amount: "3.33", unit: "cups" },
    ],
    calories: 80, protein: 3.0, carbs: 14.0, fat: 1.5,
    prepTimeMinutes: 5, cookTimeMinutes: 15, servings: 4,
    tags: ["mealType:Breakfast", "cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Oat Porridge (Uji wa Shayiri)",
    description: "Provides high satiety. Growing in popularity as an infant dish and breakfast for adults.",
    instructions: "1. Mix oat flour with 1.5 cups water to smooth consistency.\n2. Boil the rest of the water.\n3. Add flour mixture and stir.\n4. Cook while stirring for 2 minutes.\n5. Add milk and heat for 7 minutes.\n6. Add sugar, stir and serve hot.",
    ingredients: [
      { name: "oatmeal flour", amount: "5", unit: "tbsp" },
      { name: "cow milk", amount: "1.5", unit: "cups" },
      { name: "sugar", amount: "0.5", unit: "cup" },
    ],
    calories: 120, protein: 4.0, carbs: 20.0, fat: 3.0,
    prepTimeMinutes: 5, cookTimeMinutes: 10, servings: 4,
    tags: ["mealType:Breakfast", "cuisine:Kenyan", "difficulty:Easy"],
  },
  // ── More Ugali Variants ───────────────────────────────────────────────
  {
    name: "Maize and Finger Millet Flour Ugali",
    description: "Common among Kisii, Luhya, Kamba, Kalenjin and Luo communities.",
    instructions: "1. Mix whole maize flour and finger millet flour until even colour.\n2. Boil all water.\n3. Pour 3/4 of flour into pot and mix.\n4. Add remaining flour while pressing against pot wall.\n5. Reduce fire and simmer 17 minutes.\n6. Turn onto plate and serve.",
    ingredients: [
      { name: "whole maize flour", amount: "2", unit: "cups" },
      { name: "finger millet flour", amount: "2", unit: "cups" },
      { name: "water", amount: "5", unit: "cups" },
    ],
    calories: 133, protein: 3.1, carbs: 24.0, fat: 1.3,
    prepTimeMinutes: 5, cookTimeMinutes: 30, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "dietary:Vegan", "difficulty:Easy"],
  },
  {
    name: "Cassava Flour Ugali",
    description: "Prepared from dried cassava flour. Common among the Luo community.",
    instructions: "1. Boil all water.\n2. Add cassava flour gradually.\n3. Keep stirring and turning until firm.\n4. Simmer for 10 minutes.\n5. Turn onto plate and serve.",
    ingredients: [
      { name: "cassava flour", amount: "1", unit: "cup" },
      { name: "water", amount: "1.25", unit: "cups" },
    ],
    calories: 186, protein: 1.1, carbs: 43.7, fat: 0.3,
    prepTimeMinutes: 5, cookTimeMinutes: 20, servings: 2,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "dietary:Vegan", "difficulty:Easy"],
  },
  {
    name: "Finger Millet Flour Ugali",
    description: "Typical among the Kisii community. Prepared using pure finger millet flour.",
    instructions: "1. Boil all water.\n2. Add finger millet flour gradually while stirring to soft consistency.\n3. Continue stirring 3-5 minutes turning to cook evenly.\n4. Remove from heat.\n5. Serve while hot.",
    ingredients: [
      { name: "finger millet flour", amount: "7.75", unit: "cups" },
      { name: "water", amount: "4.67", unit: "cups" },
    ],
    calories: 150, protein: 3.5, carbs: 28.0, fat: 1.5,
    prepTimeMinutes: 5, cookTimeMinutes: 15, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "dietary:Vegan", "difficulty:Easy"],
  },
  {
    name: "Gurdo, Marqa (Ugali in Sour Milk)",
    description: "Unique Burji community ugali prepared with teff and sorghum flour in fermented milk.",
    instructions: "1. Put fermented milk and water in a pot.\n2. Heat while stirring, add salt.\n3. Mix teff and sorghum flour evenly.\n4. Add flour mixture after 6 minutes, stir until consistent.\n5. Cook 20 minutes then add ghee.\n6. Turn until cooked, about 4 minutes.",
    ingredients: [
      { name: "teff flour", amount: "1", unit: "cup" },
      { name: "red sorghum flour", amount: "2.25", unit: "cups" },
      { name: "fermented milk", amount: "3.33", unit: "cups" },
    ],
    calories: 242, protein: 6.6, carbs: 29.7, fat: 9.6,
    prepTimeMinutes: 5, cookTimeMinutes: 30, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:East African", "difficulty:Medium"],
  },
  {
    name: "Vinolo (Banana and Maize Flour Ugali)",
    description: "Typical to the Mijikenda community. A unique ugali incorporating bananas.",
    instructions: "1. Peel bananas, wash and boil.\n2. Mash bananas until smooth.\n3. Boil water in separate pot.\n4. Add half the flour and stir smooth.\n5. Add mashed bananas and continue stirring.\n6. Add remaining flour until desired consistency. Wrap in foil and steam.",
    ingredients: [
      { name: "green bananas", amount: "4", unit: "" },
      { name: "maize flour", amount: "2", unit: "cups" },
      { name: "water", amount: "4", unit: "cups" },
    ],
    calories: 160, protein: 2.5, carbs: 35.0, fat: 1.0,
    prepTimeMinutes: 5, cookTimeMinutes: 40, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "dietary:Vegan", "difficulty:Medium"],
  },
  // ── More Vegetables ───────────────────────────────────────────────────
  {
    name: "Mrenda and Seveve (Jute Mallow & Pumpkin Leaves)",
    description: "Traditional vegetable blend among the Luhya community. Served with ugali.",
    instructions: "1. Wash and pluck jute mallow leaves.\n2. Wash and chop pumpkin leaves.\n3. Cut onion and tomato.\n4. Boil water and add vegetables, cook 5 minutes.\n5. Add salt, onion, tomato and milk.\n6. Stir and cook another 5 minutes.",
    ingredients: [
      { name: "jute mallow leaves", amount: "316", unit: "g" },
      { name: "pumpkin leaves", amount: "74", unit: "g" },
      { name: "cow milk", amount: "1.75", unit: "cups" },
    ],
    calories: 59, protein: 3.4, carbs: 5.4, fat: 2.3,
    prepTimeMinutes: 15, cookTimeMinutes: 30, servings: 4,
    tags: ["cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Nderema (Vine Spinach)",
    description: "Traditional to the Luhya and Kuria communities. Usually eaten with ugali.",
    instructions: "1. Cut onions and tomatoes.\n2. Put ghee in pot and heat 1 minute on medium.\n3. Add onions and cook 5 minutes until golden-brown.\n4. Add tomatoes then vine spinach, cover.\n5. Cook 10 minutes then stir.\n6. Add salt, cover and cook 1 minute.",
    ingredients: [
      { name: "vine spinach leaves", amount: "417", unit: "g" },
      { name: "tomatoes", amount: "2", unit: "" },
      { name: "ghee", amount: "3", unit: "tbsp" },
    ],
    calories: 72, protein: 3.2, carbs: 1.4, fat: 5.2,
    prepTimeMinutes: 15, cookTimeMinutes: 20, servings: 4,
    tags: ["cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Thabai / Thaa (Stinging Nettle Leaves)",
    description: "Traditional vegetable popular among Kikuyu and Meru communities. Eaten with ugali.",
    instructions: "1. Cut stinging nettle leaves from stalks.\n2. Wash and boil in 3.5 cups water until tender.\n3. Heat oil, chop and add onion until soft.\n4. Add boiled nettles and salt.\n5. Add remaining water after 1 minute.\n6. Cover and boil for 8 minutes.",
    ingredients: [
      { name: "stinging nettle leaves", amount: "267", unit: "g" },
      { name: "onion", amount: "1", unit: "" },
      { name: "cooking oil", amount: "2", unit: "tbsp" },
    ],
    calories: 50, protein: 3.0, carbs: 5.0, fat: 2.5,
    prepTimeMinutes: 15, cookTimeMinutes: 45, servings: 4,
    tags: ["cuisine:Kenyan", "dietary:Vegan", "difficulty:Easy"],
  },
  {
    name: "Kitojo (Sweet Potato Leaves)",
    description: "Common among the Taita community. Delicious dish eaten with ugali.",
    instructions: "1. Remove leaves from vines and wash.\n2. Cut leaves into small strips.\n3. Chop onion.\n4. Add oil in pot, fry onions until golden brown.\n5. Add vegetables and salt.\n6. Stir and cook until soft.",
    ingredients: [
      { name: "sweet potato leaves", amount: "835", unit: "g" },
      { name: "onion", amount: "1", unit: "" },
      { name: "cooking oil", amount: "0.25", unit: "cup" },
    ],
    calories: 70, protein: 3.5, carbs: 6.0, fat: 4.0,
    prepTimeMinutes: 10, cookTimeMinutes: 15, servings: 4,
    tags: ["cuisine:Kenyan", "dietary:Vegan", "difficulty:Easy"],
  },
  {
    name: "Mashed Pumpkin & Black Nightshade Leaves",
    description: "Popular among the Kisii community. The pumpkin balances the bitterness of managu.",
    instructions: "1. Peel pumpkin and wash.\n2. Pluck nightshade leaves from stalks.\n3. Put pumpkin in pot with water and salt.\n4. Cook pumpkin for 30 minutes.\n5. Add oil and nightshade, cook 20 minutes.\n6. Remove and mash to smooth consistency.",
    ingredients: [
      { name: "black nightshade leaves", amount: "752", unit: "g" },
      { name: "pumpkin", amount: "1.1", unit: "kg" },
      { name: "cooking oil", amount: "0.125", unit: "cup" },
    ],
    calories: 80, protein: 4.0, carbs: 12.0, fat: 3.0,
    prepTimeMinutes: 5, cookTimeMinutes: 60, servings: 4,
    tags: ["cuisine:Kenyan", "dietary:Vegan", "difficulty:Easy"],
  },
  // ── More Legumes ──────────────────────────────────────────────────────
  {
    name: "Firinda (Skinned Bean Stew)",
    description: "Unique to the Nubian community. Boiled beans skinned and sautéed in spring onions.",
    instructions: "1. Sort and wash beans.\n2. Soak in warm water for 3 hours.\n3. Remove and discard the skin.\n4. Boil skinned beans in water for 2 hours.\n5. Chop spring onion.\n6. Add onions, oil and salt to boiling beans until tender.",
    ingredients: [
      { name: "kidney beans", amount: "2.25", unit: "cups" },
      { name: "spring onions", amount: "8", unit: "stalks" },
      { name: "cooking oil", amount: "1.5", unit: "tbsp" },
    ],
    calories: 150, protein: 9.0, carbs: 22.0, fat: 3.0,
    prepTimeMinutes: 195, cookTimeMinutes: 120, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "dietary:Vegan", "difficulty:Medium"],
  },
  {
    name: "Ndoto (Red Kidney Beans & Red Sorghum)",
    description: "Traditional Taita dish prepared during initiation ceremonies and weddings.",
    instructions: "1. Sort beans, wash and boil 2.5 hours.\n2. Sort red sorghum.\n3. Add washed sorghum to beans with remaining water.\n4. Boil sorghum 2 hours 50 minutes until almost dry.\n5. Chop onion, fry in oil until golden.\n6. Add beans, sorghum and salt. Cook 6 minutes.",
    ingredients: [
      { name: "red sorghum", amount: "3", unit: "cups" },
      { name: "red kidney beans", amount: "1.75", unit: "cups" },
      { name: "onion", amount: "1.5", unit: "cups" },
    ],
    calories: 192, protein: 7.2, carbs: 24.2, fat: 5.8,
    prepTimeMinutes: 330, cookTimeMinutes: 10, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "dietary:Vegan", "difficulty:Hard"],
  },
  {
    name: "Fiqe (Red Sorghum, Beans and Teff Flour)",
    description: "Burji traditional mixture of sorghum flour and cooked beans stirred as a paste. Best with black tea.",
    instructions: "1. Boil beans in water until cooked (1 hour).\n2. Wash and cut sukuma wiki.\n3. Add sukuma wiki to beans and cook 20 minutes.\n4. Mix teff and sorghum flour together.\n5. Add flour mixture to beans and kale, add salt and stir.\n6. Add ghee after 20 minutes, continue mixing 10 minutes.",
    ingredients: [
      { name: "kidney beans", amount: "1.5", unit: "cups" },
      { name: "red sorghum flour", amount: "1.5", unit: "cups" },
      { name: "teff flour", amount: "2", unit: "cups" },
    ],
    calories: 192, protein: 7.2, carbs: 24.2, fat: 5.8,
    prepTimeMinutes: 10, cookTimeMinutes: 165, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:East African", "difficulty:Hard"],
  },
  {
    name: "Bean Stew with Milk and Cream",
    description: "Very typical to the Kalenjin community. Served with rice or ugali.",
    instructions: "1. Sort and wash beans, boil until soft.\n2. Drain excess water.\n3. Chop onion and tomatoes.\n4. Heat oil, fry onions until tender.\n5. Add tomatoes, salt, boiled beans. Cover.\n6. Add milk and cream, stir, cover and cook 10 minutes.",
    ingredients: [
      { name: "kidney beans", amount: "2.75", unit: "cups" },
      { name: "cow milk", amount: "2.25", unit: "cups" },
      { name: "cow cream", amount: "0.67", unit: "cup" },
    ],
    calories: 200, protein: 10.0, carbs: 22.0, fat: 8.0,
    prepTimeMinutes: 10, cookTimeMinutes: 150, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  // ── More Meats & Fish ─────────────────────────────────────────────────
  {
    name: "Stewed Goat Meat",
    description: "Common across the country. Usually eaten with ugali, rice or chapatti.",
    instructions: "1. Wash and cut meat into small pieces.\n2. Heat oil, add meat and salt.\n3. Cover and steam 10-15 minutes.\n4. Drain and keep broth.\n5. Add onion and cook 10 minutes.\n6. Add tomatoes, cook until tender. Add broth and simmer.",
    ingredients: [
      { name: "goat meat", amount: "1.2", unit: "kg" },
      { name: "onion", amount: "1", unit: "" },
      { name: "tomatoes", amount: "3", unit: "" },
    ],
    calories: 380, protein: 30.0, carbs: 5.0, fat: 27.0,
    prepTimeMinutes: 10, cookTimeMinutes: 45, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Stewed Dried Fish (Shivambala)",
    description: "Typical among the Luhya and Luo communities. Served with ugali to the entire family.",
    instructions: "1. Soak dried fish in warm water 10 minutes.\n2. Chop onion and tomatoes.\n3. Wash and drain fish.\n4. Heat oil, fry onions until golden.\n5. Add peanut butter, tomatoes, magadi and water.\n6. Add fish and cook 10 minutes.",
    ingredients: [
      { name: "dry fish", amount: "210", unit: "g" },
      { name: "peanut butter", amount: "2", unit: "tbsp" },
      { name: "tomatoes", amount: "3", unit: "" },
    ],
    calories: 250, protein: 20.0, carbs: 8.0, fat: 16.0,
    prepTimeMinutes: 15, cookTimeMinutes: 25, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Omena wa Kukaangwa (Fried Omena)",
    description: "Tiny fish from Lake Victoria. Delicacy among the Luo community, eaten with ugali.",
    instructions: "1. Sort omena and wash in hot water.\n2. Cut tomatoes, chop onions.\n3. Heat oil, add omena and cook 4-6 minutes without stirring.\n4. Stir to fry other side.\n5. Drain oil, add onions and stir.\n6. Add tomatoes and salt, mash and cook until ready.",
    ingredients: [
      { name: "omena, dried", amount: "120", unit: "g" },
      { name: "spring onion", amount: "1", unit: "bunch" },
      { name: "tomatoes", amount: "2", unit: "" },
    ],
    calories: 200, protein: 18.0, carbs: 5.0, fat: 12.0,
    prepTimeMinutes: 10, cookTimeMinutes: 30, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Easy"],
  },
  {
    name: "Nyirinyiri (Camel Meat)",
    description: "Very tiny tender pieces of meat stored in oil. Traditional to Borana, Gabra, Rendille pastoralists.",
    instructions: "1. Cut camel hump into large pieces, heat to extract oil.\n2. Cut camel meat into small pieces.\n3. Put meat in pot with pinch of salt.\n4. Boil until juices start running out.\n5. Add the hump oil and keep stirring.\n6. Cook until ready.",
    ingredients: [
      { name: "camel meat", amount: "1.5", unit: "kg" },
      { name: "camel hump", amount: "0.5", unit: "kg" },
      { name: "salt", amount: "1", unit: "tsp" },
    ],
    calories: 521, protein: 34.6, carbs: 20.0, fat: 33.6,
    prepTimeMinutes: 15, cookTimeMinutes: 75, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Okra Meat Dish",
    description: "Traditional Nubian dish. The blend of garlic brings out a unique aroma. Eaten with rice.",
    instructions: "1. Chop onions, tomatoes, garlic, coriander.\n2. Cook onions in oil until golden brown.\n3. Add meat and salt, cook 10 minutes.\n4. Add tomatoes and simmer.\n5. Add curry, okra and water.\n6. Add garlic, simmer 15 minutes until ready.",
    ingredients: [
      { name: "okra", amount: "367", unit: "g" },
      { name: "beef", amount: "700", unit: "g" },
      { name: "garlic", amount: "3", unit: "cloves" },
    ],
    calories: 280, protein: 22.0, carbs: 10.0, fat: 18.0,
    prepTimeMinutes: 15, cookTimeMinutes: 60, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Qanchibelo (Beef, Maize & Wheat Flour mix)",
    description: "Burji stew with balls of corn. Best with Moringa or sukuma wiki leaves.",
    instructions: "1. Cut meat into chunks.\n2. Boil meat in water 1 hour 15 minutes.\n3. Add spices, onion, capsicums, tomatoes.\n4. Add shredded sukuma wiki.\n5. Mix atta and maize flour, knead with water into dough.\n6. Shape into ovals, add to pan and turn until cooked.",
    ingredients: [
      { name: "beef", amount: "1.5", unit: "kg" },
      { name: "wheat flour, atta", amount: "4.125", unit: "cups" },
      { name: "maize flour", amount: "2.67", unit: "cups" },
    ],
    calories: 133, protein: 9.6, carbs: 15.7, fat: 3.1,
    prepTimeMinutes: 20, cookTimeMinutes: 120, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:East African", "difficulty:Hard"],
  },
  // ── More Root & Banana Dishes ─────────────────────────────────────────
  {
    name: "Arrowroot Stew",
    description: "Typical among Kisii, Kikuyu, Meru and Embu communities. Also fed to infants above 9 months.",
    instructions: "1. Peel and cut potatoes, arrowroots, bananas and carrots.\n2. Chop onions and tomatoes.\n3. Fry onions until browning, add tomatoes.\n4. Add arrowroots, carrots and water.\n5. Add potatoes and salt.\n6. Add bananas and more water, cook until ready.",
    ingredients: [
      { name: "arrowroots", amount: "3", unit: "" },
      { name: "potatoes", amount: "4", unit: "" },
      { name: "green bananas", amount: "3", unit: "" },
    ],
    calories: 180, protein: 3.0, carbs: 38.0, fat: 3.0,
    prepTimeMinutes: 15, cookTimeMinutes: 60, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Pan Fried Sweet Potatoes",
    description: "Typical breakfast dish from the Kisii community. Usually eaten with tea.",
    instructions: "1. Peel sweet potatoes and wash.\n2. Chop into large chunks.\n3. Boil until tender (do not overcook).\n4. Drain excess water.\n5. Heat oil in a pan.\n6. Fry until golden brown and crispy on both sides.",
    ingredients: [
      { name: "sweet potatoes, orange fleshed", amount: "6", unit: "" },
      { name: "cooking oil", amount: "1", unit: "cup" },
      { name: "water", amount: "4.5", unit: "cups" },
    ],
    calories: 280, protein: 2.0, carbs: 40.0, fat: 13.0,
    prepTimeMinutes: 5, cookTimeMinutes: 75, servings: 4,
    tags: ["mealType:Breakfast", "cuisine:Kenyan", "dietary:Vegan", "difficulty:Easy"],
  },
  {
    name: "Potato Bhajia",
    description: "Spicy recipe from Kenyan Indian community. Served as part of a main meal.",
    instructions: "1. Peel potatoes, wash, cut into rounds.\n2. Crush garlic, ginger and chilli.\n3. Mix gram flour with all spices and cut coriander.\n4. Add potatoes and coat evenly.\n5. Heat oil for 7 minutes.\n6. Fry coated potatoes 8 minutes until crispy.",
    ingredients: [
      { name: "potatoes", amount: "3", unit: "" },
      { name: "gram flour", amount: "1", unit: "cup" },
      { name: "red chilli powder", amount: "1", unit: "tsp" },
    ],
    calories: 300, protein: 5.0, carbs: 35.0, fat: 16.0,
    prepTimeMinutes: 10, cookTimeMinutes: 40, servings: 4,
    tags: ["mealType:Snack", "cuisine:International", "dietary:Vegan", "difficulty:Medium"],
  },
  {
    name: "Sweet Potatoes with Peanut Butter",
    description: "Originally Nubian community recipe. Eaten for breakfast with tea, filling due to peanut butter.",
    instructions: "1. Peel, wash and cut sweet potatoes.\n2. Fry onion until golden brown.\n3. Add grated tomatoes and cook.\n4. Add sweet potatoes, salt and water.\n5. Mix peanut butter with water.\n6. Add peanut mixture, stir and simmer 3 minutes.",
    ingredients: [
      { name: "sweet potatoes, orange fleshed", amount: "5", unit: "" },
      { name: "peanut butter", amount: "6", unit: "tbsp" },
      { name: "tomatoes", amount: "2", unit: "" },
    ],
    calories: 300, protein: 7.0, carbs: 45.0, fat: 12.0,
    prepTimeMinutes: 10, cookTimeMinutes: 60, servings: 4,
    tags: ["mealType:Breakfast", "cuisine:Kenyan", "difficulty:Medium"],
  },
  {
    name: "Pumpkins with Peanut Butter",
    description: "Sweet, buttery infant dish served for lunch or dinner by urban communities.",
    instructions: "1. Peel and wash pumpkin.\n2. Mix peanut butter with water.\n3. Put pumpkin in pot with remaining water.\n4. Bring to boil, add salt and oil.\n5. When pumpkin is cooked, add peanut paste.\n6. Cover and simmer 9 minutes.",
    ingredients: [
      { name: "pumpkin", amount: "1.5", unit: "kg" },
      { name: "peanut butter", amount: "7", unit: "tbsp" },
      { name: "cooking oil", amount: "4", unit: "tsp" },
    ],
    calories: 180, protein: 5.0, carbs: 25.0, fat: 8.0,
    prepTimeMinutes: 5, cookTimeMinutes: 45, servings: 4,
    tags: ["cuisine:Kenyan", "dietary:Vegan", "difficulty:Easy"],
  },
  // ── More Accompaniments & Curries ─────────────────────────────────────
  {
    name: "Roti (Indian Chapati)",
    description: "Indian version of chapatti. Part of assortment of dishes in a meal platter.",
    instructions: "1. Put wheat flour in a bowl, add salt and ghee.\n2. Add water while kneading.\n3. Knead to soft dough.\n4. Cover and rest for 3 hours.\n5. Heat pan, add drop of oil.\n6. Roll dough into discs and fry until brown.",
    ingredients: [
      { name: "wheat flour, whole", amount: "1.75", unit: "cups" },
      { name: "cow ghee", amount: "2.5", unit: "tbsp" },
      { name: "water", amount: "0.75", unit: "cup" },
    ],
    calories: 380, protein: 8.0, carbs: 45.0, fat: 18.0,
    prepTimeMinutes: 180, cookTimeMinutes: 21, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:International", "difficulty:Medium"],
  },
  {
    name: "Bhature (Fried Indian Bread)",
    description: "Traditional to the Kenyan Indian community. Eaten with chole (chickpea curry).",
    instructions: "1. Mix self-raising flour, sugar, salt and ghee.\n2. Add fenugreek, coriander, yoghurt.\n3. Knead while adding water to soft dough.\n4. Cover and rest 1 hour.\n5. Roll into desired shapes.\n6. Fry in hot oil for 2 minutes each.",
    ingredients: [
      { name: "self-raising wheat flour", amount: "2.33", unit: "cups" },
      { name: "natural yoghurt", amount: "0.75", unit: "cup" },
      { name: "ghee", amount: "1.5", unit: "tbsp" },
    ],
    calories: 350, protein: 7.0, carbs: 42.0, fat: 17.0,
    prepTimeMinutes: 75, cookTimeMinutes: 30, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:International", "difficulty:Medium"],
  },
  {
    name: "Peas and Brinjal Curry",
    description: "Green peas with brinjals, part of a Thali platter. Traditional to Kenyan Indian community.",
    instructions: "1. Blend all spices with garlic, ginger, chillies, coriander.\n2. Cut eggplant and mix with peas.\n3. Heat oil, add blended ingredients and cook 3 minutes.\n4. Add peas and eggplants, stir.\n5. Add water.\n6. Cover and cook 20 minutes.",
    ingredients: [
      { name: "garden peas", amount: "1", unit: "cup" },
      { name: "brinjals (eggplant)", amount: "3", unit: "" },
      { name: "coriander powder", amount: "2", unit: "tsp" },
    ],
    calories: 120, protein: 5.0, carbs: 15.0, fat: 5.0,
    prepTimeMinutes: 5, cookTimeMinutes: 25, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:International", "dietary:Vegan", "difficulty:Medium"],
  },
  {
    name: "Stewed Split Dal",
    description: "Heavily spiced dal, part of a Kenyan Indian meal platter. Served during lunch or dinner.",
    instructions: "1. Soak dal 50 minutes and wash.\n2. Boil dal in water with salt for 40 minutes.\n3. Mix tomatoes, turmeric, chilli powder, tomato paste.\n4. Fry mustard and cumin seeds in oil.\n5. Add mixed ingredients and water.\n6. Add ground dal, cover and cook 12 minutes.",
    ingredients: [
      { name: "yellow split dal", amount: "1", unit: "cup" },
      { name: "tomatoes", amount: "3", unit: "" },
      { name: "turmeric powder", amount: "0.75", unit: "tsp" },
    ],
    calories: 160, protein: 9.0, carbs: 22.0, fat: 4.0,
    prepTimeMinutes: 60, cookTimeMinutes: 60, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:International", "dietary:Vegan", "difficulty:Medium"],
  },
  // ── Desserts ──────────────────────────────────────────────────────────
  {
    name: "Siro (Semolina & Nuts)",
    description: "Sweet dessert served after a main meal. Traditional to the Kenyan Indian community.",
    instructions: "1. Add semolina and ghee to pot.\n2. Heat 15 minutes while stirring continuously.\n3. Boil milk separately with cardamom.\n4. Add boiled milk to semolina mixture.\n5. Add sugar and cook 7 minutes.\n6. Garnish with almonds and pistachios.",
    ingredients: [
      { name: "semolina flour", amount: "1", unit: "cup" },
      { name: "cow ghee", amount: "1", unit: "cup" },
      { name: "cow milk", amount: "2.125", unit: "cups" },
    ],
    calories: 400, protein: 6.0, carbs: 45.0, fat: 22.0,
    prepTimeMinutes: 15, cookTimeMinutes: 30, servings: 4,
    tags: ["cuisine:International", "difficulty:Medium"],
  },
  // ── Maize Dishes ──────────────────────────────────────────────────────
  {
    name: "Githeri (Fresh Beans and Maize)",
    description: "Uses fresh maize and beans. Popular in agricultural areas. Also a Luhya breakfast dish.",
    instructions: "1. Remove fresh beans from pods.\n2. Remove maize kernels from cobs.\n3. Mix and wash, boil 2 hours.\n4. Chop spring onions.\n5. Heat cooking fat, add onions and soften.\n6. Add boiled maize-beans, salt and cook while stirring.",
    ingredients: [
      { name: "green maize cobs", amount: "4", unit: "" },
      { name: "bean pods, red", amount: "2.5", unit: "kg" },
      { name: "spring onion", amount: "1", unit: "stem" },
    ],
    calories: 185, protein: 6.9, carbs: 17.8, fat: 7.2,
    prepTimeMinutes: 120, cookTimeMinutes: 20, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "dietary:Vegan", "difficulty:Medium"],
  },
  {
    name: "Nchenga/Nzenga (Crushed Maize)",
    description: "Ancient dish among Kamba, Taita and Meru communities. Rice substitute with distinct taste.",
    instructions: "1. Wash crushed maize and boil in water until soft.\n2. Peel carrot and grate. Chop onion.\n3. Melt cooking fat, add onion until golden.\n4. Add grated carrot and salt, stir 2-3 minutes.\n5. Add boiled crushed maize and stir.\n6. Cover and cook 2-5 minutes.",
    ingredients: [
      { name: "crushed maize", amount: "1.33", unit: "cups" },
      { name: "carrot", amount: "1", unit: "" },
      { name: "onion", amount: "1", unit: "" },
    ],
    calories: 160, protein: 3.0, carbs: 28.0, fat: 4.0,
    prepTimeMinutes: 15, cookTimeMinutes: 60, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "dietary:Vegan", "difficulty:Medium"],
  },
  {
    name: "Ashir",
    description: "Borana dish. Huskless maize mixed with milk. Husks removed by pounding with mortar and pestle.",
    instructions: "1. Sort and wash pounded maize.\n2. Boil all water, add pounded maize.\n3. Boil for 2 hours.\n4. Strain excess water.\n5. Add salt, sugar and milk, stir.\n6. Simmer 10 minutes and serve.",
    ingredients: [
      { name: "pounded maize, de-germed", amount: "8.5", unit: "cups" },
      { name: "cow milk", amount: "1.75", unit: "cups" },
      { name: "sugar", amount: "6.5", unit: "tbsp" },
    ],
    calories: 125, protein: 2.7, carbs: 25.8, fat: 0.9,
    prepTimeMinutes: 10, cookTimeMinutes: 135, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:East African", "difficulty:Medium"],
  },
  // ── Poultry ───────────────────────────────────────────────────────────
  {
    name: "Aluru (Stewed Quails)",
    description: "Traditional dish typical to Luhya and Luo communities. Prepared during special occasions.",
    instructions: "1. Roast quails 10 minutes, remove innards.\n2. Heat oil and fry quails 11 minutes.\n3. Drain on paper towels.\n4. Chop onion and tomatoes.\n5. Fry onions until golden, add tomatoes and salt.\n6. Add milk and fried quails, cover and cook 12 minutes.",
    ingredients: [
      { name: "quails, whole", amount: "3", unit: "" },
      { name: "cow milk", amount: "2", unit: "cups" },
      { name: "tomatoes", amount: "2", unit: "" },
    ],
    calories: 320, protein: 28.0, carbs: 5.0, fat: 22.0,
    prepTimeMinutes: 15, cookTimeMinutes: 60, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Hard"],
  },
  {
    name: "Likhanga (Stewed Guinea Fowl)",
    description: "Typical Luhya dish eaten during special occasions. Traditional for boys after circumcision.",
    instructions: "1. Roast guinea fowl 10-15 minutes, cut into pieces.\n2. Boil pieces in water with salt for 1 hour.\n3. Drain and keep broth.\n4. Chop onions and tomatoes.\n5. Add onions to meat, cook 5 minutes.\n6. Add oil, tomatoes and broth. Cook until ready.",
    ingredients: [
      { name: "guinea fowl, whole", amount: "665", unit: "g" },
      { name: "onion", amount: "1", unit: "" },
      { name: "tomatoes", amount: "2", unit: "" },
    ],
    calories: 280, protein: 25.0, carbs: 5.0, fat: 18.0,
    prepTimeMinutes: 30, cookTimeMinutes: 75, servings: 4,
    tags: ["mealType:Lunch", "mealType:Dinner", "cuisine:Kenyan", "difficulty:Hard"],
  },
];

export const seedRecipesBatch3 = mutation({
  args: {},
  handler: async (ctx) => {
    let count = 0;
    for (const recipeData of RECIPES_BATCH_3) {
      const existing = await ctx.db
        .query("recipes")
        .filter((q) => q.eq(q.field("name"), recipeData.name))
        .first();

      if (!existing) {
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
    return `Seeded ${count} new recipes (batch 3). ${RECIPES_BATCH_3.length} total in batch.`;
  },
});
