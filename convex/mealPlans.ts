import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { authComponent } from './auth'

const mealTypeValidator = v.union(
  v.literal('breakfast'),
  v.literal('lunch'),
  v.literal('dinner'),
  v.literal('snack')
)

export const listByDateRange = query({
  args: {
    startDate: v.string(),
    endDate: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return []

    const plans = await ctx.db
      .query('mealPlans')
      .withIndex('by_user_date', (q) => q.eq('userId', user._id))
      .collect()

    return plans.filter((p) => p.date >= args.startDate && p.date <= args.endDate)
  },
})

export const listByDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return []

    return await ctx.db
      .query('mealPlans')
      .withIndex('by_user_date', (q) => q.eq('userId', user._id).eq('date', args.date))
      .collect()
  },
})

export const getWithRecipe = query({
  args: { date: v.string(), mealType: mealTypeValidator },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return null

    const mealPlan = await ctx.db
      .query('mealPlans')
      .withIndex('by_user_date_meal', (q) =>
        q.eq('userId', user._id).eq('date', args.date).eq('mealType', args.mealType)
      )
      .first()

    if (!mealPlan) return null

    const recipe = await ctx.db.get(mealPlan.recipeId)
    return { ...mealPlan, recipe }
  },
})

export const create = mutation({
  args: {
    date: v.string(),
    mealType: mealTypeValidator,
    recipeId: v.id('recipes'),
    servings: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const recipe = await ctx.db.get(args.recipeId)
    if (!recipe || (recipe.userId !== undefined && recipe.userId !== user._id)) {
      throw new Error('Recipe not found')
    }

    const existing = await ctx.db
      .query('mealPlans')
      .withIndex('by_user_date_meal', (q) =>
        q.eq('userId', user._id).eq('date', args.date).eq('mealType', args.mealType)
      )
      .first()

    if (existing) {
      return await ctx.db.patch(existing._id, {
        recipeId: args.recipeId,
        servings: args.servings,
        notes: args.notes,
      })
    }

    return await ctx.db.insert('mealPlans', {
      ...args,
      userId: user._id,
      createdAt: Date.now(),
    })
  },
})

export const update = mutation({
  args: {
    id: v.id('mealPlans'),
    recipeId: v.optional(v.id('recipes')),
    servings: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const mealPlan = await ctx.db.get(args.id)
    if (!mealPlan || mealPlan.userId !== user._id) {
      throw new Error('Meal plan not found')
    }

    if (args.recipeId) {
      const recipe = await ctx.db.get(args.recipeId)
      if (!recipe || (recipe.userId !== undefined && recipe.userId !== user._id)) {
        throw new Error('Recipe not found')
      }
    }

    const { id, ...updates } = args
    return await ctx.db.patch(id, updates)
  },
})

export const remove = mutation({
  args: { id: v.id('mealPlans') },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const mealPlan = await ctx.db.get(args.id)
    if (!mealPlan || mealPlan.userId !== user._id) {
      throw new Error('Meal plan not found')
    }

    return await ctx.db.delete(args.id)
  },
})

export const clearDay = mutation({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const plans = await ctx.db
      .query('mealPlans')
      .withIndex('by_user_date', (q) => q.eq('userId', user._id).eq('date', args.date))
      .collect()

    await Promise.all(plans.map((p) => ctx.db.delete(p._id)))
    return plans.length
  },
})
