import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { authComponent } from './auth'

const healthGoalValidator = v.union(
  v.literal('eat_healthy'),
  v.literal('lose_weight'),
  v.literal('build_muscle'),
)

export const get = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return null

    return await ctx.db
      .query('userProfile')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .first()
  },
})

export const upsert = mutation({
  args: {
    healthGoal: healthGoalValidator,
    foodsToAvoid: v.array(v.string()),
    onboardingCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const existing = await ctx.db
      .query('userProfile')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .first()

    if (existing) {
      return await ctx.db.patch(existing._id, {
        healthGoal: args.healthGoal,
        foodsToAvoid: args.foodsToAvoid,
        onboardingCompleted: args.onboardingCompleted,
      })
    }

    return await ctx.db.insert('userProfile', {
      userId: user._id,
      healthGoal: args.healthGoal,
      foodsToAvoid: args.foodsToAvoid,
      onboardingCompleted: args.onboardingCompleted,
      createdAt: Date.now(),
    })
  },
})

/**
 * For existing users who have no userProfile record yet —
 * creates one with onboardingCompleted: true so they are not
 * redirected to the onboarding wizard.
 */
export const getOrCreate = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const existing = await ctx.db
      .query('userProfile')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .first()

    if (existing) return existing

    const id = await ctx.db.insert('userProfile', {
      userId: user._id,
      healthGoal: 'eat_healthy',
      foodsToAvoid: [],
      onboardingCompleted: true,
      createdAt: Date.now(),
    })

    return await ctx.db.get(id)
  },
})
