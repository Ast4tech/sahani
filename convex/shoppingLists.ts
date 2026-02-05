import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { authComponent } from './auth'
import { Id } from './_generated/dataModel'

export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return []

    return await ctx.db
      .query('shoppingLists')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .order('desc')
      .collect()
  },
})

export const getLatest = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return null

    return await ctx.db
      .query('shoppingLists')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .order('desc')
      .first()
  },
})

export const generateFromMealPlan = mutation({
  args: {
    startDate: v.string(),
    endDate: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    // 1. Get all meal plans in the range
    const plans = await ctx.db
      .query('mealPlans')
      .withIndex('by_user_date', (q) => q.eq('userId', user._id))
      .collect()
    
    const filteredPlans = plans.filter(p => p.date >= args.startDate && p.date <= args.endDate)

    // 2. Aggregate ingredients
    const ingredientsMap = new Map<string, { name: string, amount: string, unit: string, recipeIds: Set<Id<'recipes'>> }>()

    for (const plan of filteredPlans) {
      const recipe = await ctx.db.get(plan.recipeId)
      if (recipe && recipe.ingredients) {
        for (const ing of recipe.ingredients) {
            const key = `${ing.name.toLowerCase()}-${(ing.unit || '').toLowerCase()}`
            const existing = ingredientsMap.get(key)
            
            if (existing) {
                // If both are numbers, we could add them, but for now let's just keep the string
                // A better implementation would parse units and amounts
                existing.recipeIds.add(plan.recipeId)
                // For now, if it's the same ingredient, we just append or keep as is.
                // In a real app, you'd want a library to parse and add quantities.
            } else {
                ingredientsMap.set(key, {
                    name: ing.name,
                    amount: ing.amount,
                    unit: ing.unit || '',
                    recipeIds: new Set([plan.recipeId])
                })
            }
        }
      }
    }

    const items = Array.from(ingredientsMap.values()).map(ing => ({
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit,
        checked: false,
        recipeId: Array.from(ing.recipeIds)[0]
    }))

    return await ctx.db.insert('shoppingLists', {
      userId: user._id,
      name: args.name,
      items,
      startDate: args.startDate,
      endDate: args.endDate,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
  },
})

export const toggleItem = mutation({
  args: {
    listId: v.id('shoppingLists'),
    itemIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const list = await ctx.db.get(args.listId)
    if (!list || list.userId !== user._id) {
      throw new Error('Shopping list not found')
    }

    const newItems = [...list.items]
    if (newItems[args.itemIndex]) {
      newItems[args.itemIndex] = {
        ...newItems[args.itemIndex],
        checked: !newItems[args.itemIndex].checked
      }
    }

    await ctx.db.patch(args.listId, {
      items: newItems,
      updatedAt: Date.now(),
    })
  },
})

export const deleteList = mutation({
  args: { id: v.id('shoppingLists') },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const list = await ctx.db.get(args.id)
    if (!list || list.userId !== user._id) {
      throw new Error('Shopping list not found')
    }

    return await ctx.db.delete(args.id)
  },
})
