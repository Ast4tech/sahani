import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { authComponent } from './auth'

const ingredientValidator = v.object({
  name: v.string(),
  amount: v.string(),
  unit: v.optional(v.string()),
})

export const list = query({
  args: {
    favoritesOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return []

    // If favoritesOnly, fetch from userFavorites table
    if (args.favoritesOnly) {
      const favorites = await ctx.db
        .query('userFavorites')
        .withIndex('by_user', (q) => q.eq('userId', user._id))
        .collect()

      const recipeIds = favorites.map((f) => f.recipeId)
      const recipes = await Promise.all(
        recipeIds.map((id) => ctx.db.get(id))
      )
      return recipes.filter((r): r is NonNullable<typeof r> => r !== null)
    }

    // Default: fetch user's recipes + public recipes
    const userRecipes = await ctx.db
      .query('recipes')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .collect()

    const publicRecipes = await ctx.db
      .query('recipes')
      .withIndex('by_user', (q) => q.eq('userId', undefined))
      .collect()

    const allRecipes = [...userRecipes, ...publicRecipes].sort((a, b) => b.createdAt - a.createdAt)
    return allRecipes
  },
})

export const get = query({
  args: { id: v.id('recipes') },
  handler: async (ctx, args) => {
    const recipe = await ctx.db.get(args.id)
    if (!recipe) return null

    if (recipe.userId === undefined) return recipe

    const user = await authComponent.getAuthUser(ctx)
    if (!user || recipe.userId !== user._id) return null

    return recipe
  },
})

export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return []

    // Search is global for now, filtering for user or public
    const results = await ctx.db
      .query('recipes')
      .withSearchIndex('search_name', (q) =>
        q.search('name', args.query)
      )
      .collect()

    return results.filter(r => r.userId === undefined || r.userId === user._id)
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    instructions: v.optional(v.string()),
    ingredients: v.array(ingredientValidator),
    calories: v.number(),
    protein: v.optional(v.number()),
    carbs: v.optional(v.number()),
    fat: v.optional(v.number()),
    prepTimeMinutes: v.optional(v.number()),
    cookTimeMinutes: v.optional(v.number()),
    servings: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const now = Date.now()
    return await ctx.db.insert('recipes', {
      ...args,
      userId: user._id,
      isFavorite: false,
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const update = mutation({
  args: {
    id: v.id('recipes'),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    instructions: v.optional(v.string()),
    ingredients: v.optional(v.array(ingredientValidator)),
    calories: v.optional(v.number()),
    protein: v.optional(v.number()),
    carbs: v.optional(v.number()),
    fat: v.optional(v.number()),
    prepTimeMinutes: v.optional(v.number()),
    cookTimeMinutes: v.optional(v.number()),
    servings: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const recipe = await ctx.db.get(args.id)
    if (!recipe || recipe.userId !== user._id) {
      throw new Error('Recipe not found')
    }

    const { id, ...updates } = args
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    })
  },
})

export const toggleFavorite = mutation({
  args: { id: v.id('recipes') },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const recipe = await ctx.db.get(args.id)
    if (!recipe || recipe.userId !== user._id) {
      throw new Error('Recipe not found')
    }

    return await ctx.db.patch(args.id, {
      isFavorite: !recipe.isFavorite,
      updatedAt: Date.now(),
    })
  },
})

export const toggleUserFavorite = mutation({
  args: {
    recipeId: v.id('recipes'),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const existing = await ctx.db
      .query('userFavorites')
      .withIndex('by_user_recipe', (q) => q.eq('userId', user._id).eq('recipeId', args.recipeId))
      .unique()

    if (existing) {
      await ctx.db.delete(existing._id)
      return { isFavorite: false }
    } else {
      await ctx.db.insert('userFavorites', {
        userId: user._id,
        recipeId: args.recipeId,
        createdAt: Date.now(),
      })
    return { isFavorite: true }
  }
  },
})

export const getUserFavorites = query({
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return []

    const favorites = await ctx.db
      .query('userFavorites')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .order('desc')
      .take(20)

    const recipes = await Promise.all(
      favorites.map((f) => ctx.db.get(f.recipeId))
    )

    return recipes.filter((r): r is NonNullable<typeof r> => r !== null)
  },
})

export const isRecipeFavorite = query({
  args: {
    recipeId: v.id('recipes'),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return false

    const favorite = await ctx.db
      .query('userFavorites')
      .withIndex('by_user_recipe', (q) => q.eq('userId', user._id).eq('recipeId', args.recipeId))
      .unique()

    return favorite !== null
  },
})

export const remove = mutation({
  args: { id: v.id('recipes') },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const recipe = await ctx.db.get(args.id)
    if (!recipe || recipe.userId !== user._id) {
      throw new Error('Recipe not found')
    }

    return await ctx.db.delete(args.id)
  },
})
