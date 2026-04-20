import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { authComponent } from './auth'

export const get = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return null

    return await ctx.db
      .query('nutritionTargets')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .first()
  },
})

export const upsert = mutation({
  args: {
    dailyCalories: v.number(),
    proteinGrams: v.optional(v.number()),
    carbsGrams: v.optional(v.number()),
    fatGrams: v.optional(v.number()),
    fiberGrams: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const existing = await ctx.db
      .query('nutritionTargets')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .first()

    if (existing) {
      return await ctx.db.patch(existing._id, {
        ...args,
        updatedAt: Date.now(),
      })
    }

    return await ctx.db.insert('nutritionTargets', {
      ...args,
      userId: user._id,
      updatedAt: Date.now(),
    })
  },
})

const GOAL_TARGETS = {
  eat_healthy: { dailyCalories: 2000, proteinGrams: 150, carbsGrams: 250, fatGrams: 65 },
  lose_weight: { dailyCalories: 1600, proteinGrams: 140, carbsGrams: 180, fatGrams: 55 },
  build_muscle: { dailyCalories: 2400, proteinGrams: 190, carbsGrams: 280, fatGrams: 75 },
} as const

export const seedFromGoal = mutation({
  args: {
    healthGoal: v.union(
      v.literal('eat_healthy'),
      v.literal('lose_weight'),
      v.literal('build_muscle'),
    ),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const targets = GOAL_TARGETS[args.healthGoal]

    const existing = await ctx.db
      .query('nutritionTargets')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .first()

    if (existing) {
      return await ctx.db.patch(existing._id, {
        ...targets,
        updatedAt: Date.now(),
      })
    }

    return await ctx.db.insert('nutritionTargets', {
      userId: user._id,
      ...targets,
      updatedAt: Date.now(),
    })
  },
})

export const calculateDailyTotals = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return { calories: 0, protein: 0, carbs: 0, fat: 0 }

    const mealPlans = await ctx.db
      .query('mealPlans')
      .withIndex('by_user_date', (q) => q.eq('userId', user._id).eq('date', args.date))
      .collect()

    let totals = { calories: 0, protein: 0, carbs: 0, fat: 0 }

    for (const plan of mealPlans) {
      const recipe = await ctx.db.get(plan.recipeId)
      if (recipe) {
        const servingMultiplier = (plan.servings ?? 1) / (recipe.servings ?? 1)
        totals.calories += recipe.calories * servingMultiplier
        totals.protein += (recipe.protein ?? 0) * servingMultiplier
        totals.carbs += (recipe.carbs ?? 0) * servingMultiplier
        totals.fat += (recipe.fat ?? 0) * servingMultiplier
      }
    }

    return totals
  },
})
