import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  products: defineTable({
    title: v.string(),
    imageId: v.string(),
    price: v.number(),
  }),
  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
  }),

  recipes: defineTable({
    userId: v.optional(v.string()),
    name: v.string(),
    description: v.optional(v.string()),
    instructions: v.optional(v.string()),
    ingredients: v.array(v.object({
      name: v.string(),
      amount: v.string(),
      unit: v.optional(v.string()),
    })),
    calories: v.number(),
    protein: v.optional(v.number()),
    carbs: v.optional(v.number()),
    fat: v.optional(v.number()),
    prepTimeMinutes: v.optional(v.number()),
    cookTimeMinutes: v.optional(v.number()),
    servings: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isFavorite: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_favorite', ['userId', 'isFavorite'])
    .searchIndex('search_name', {
      searchField: 'name',
    }),

  mealPlans: defineTable({
    userId: v.string(),
    date: v.string(),
    mealType: v.union(v.literal('breakfast'), v.literal('lunch'), v.literal('dinner'), v.literal('snack')),
    recipeId: v.id('recipes'),
    servings: v.optional(v.number()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_date', ['userId', 'date'])
    .index('by_user_date_meal', ['userId', 'date', 'mealType']),

  nutritionTargets: defineTable({
    userId: v.string(),
    dailyCalories: v.number(),
    proteinGrams: v.optional(v.number()),
    carbsGrams: v.optional(v.number()),
    fatGrams: v.optional(v.number()),
    fiberGrams: v.optional(v.number()),
    updatedAt: v.number(),
  })
    .index('by_user', ['userId']),

  userProfile: defineTable({
    userId: v.string(),
    healthGoal: v.union(
      v.literal('eat_healthy'),
      v.literal('lose_weight'),
      v.literal('build_muscle'),
    ),
    foodsToAvoid: v.array(v.string()),
    onboardingCompleted: v.boolean(),
    createdAt: v.number(),
  }).index('by_user', ['userId']),

  recipeReviews: defineTable({
    recipeId: v.id('recipes'),
    userId: v.string(),
    rating: v.number(), // 1-5
    text: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_recipe', ['recipeId'])
    .index('by_user', ['userId'])
    .index('by_recipe_user', ['recipeId', 'userId']),

  shoppingLists: defineTable({
    userId: v.string(),
    name: v.string(),
    items: v.array(v.object({
      name: v.string(),
      amount: v.optional(v.string()),
      unit: v.optional(v.string()),
      checked: v.boolean(),
      recipeId: v.optional(v.id('recipes')),
    })),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_user', ['userId']),

  dailyTips: defineTable({
    text: v.string(),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index('by_category', ['category'])
    .index('by_active', ['isActive']),

waterLogs: defineTable({
    userId: v.string(),
    amount: v.number(), // ml
    loggedAt: v.number(),
  })
  .index('by_user', ['userId'])
  .index('by_user_date', ['userId', 'loggedAt']),

  userFavorites: defineTable({
    userId: v.string(),
    recipeId: v.id('recipes'),
    createdAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_recipe', ['recipeId'])
    .index('by_user_recipe', ['userId', 'recipeId']),
})
