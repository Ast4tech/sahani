import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { authComponent } from './auth'

// Get today's water intake total
export const getDailyTotal = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return { total: 0, logs: [] }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const startOfDay = today.getTime()
    const endOfDay = startOfDay + 24 * 60 * 60 * 1000

    const logs = await ctx.db
      .query('waterLogs')
      .withIndex('by_user_date', (q) =>
        q.eq('userId', user._id).gte('loggedAt', startOfDay).lt('loggedAt', endOfDay)
      )
      .order('desc')
      .collect()

    const total = logs.reduce((sum, log) => sum + log.amount, 0)

    return { total, logs }
  },
})

// Get weekly hydration stats
export const getWeeklyStats = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return []

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const weekAgo = today.getTime() - 7 * 24 * 60 * 60 * 1000

    const logs = await ctx.db
      .query('waterLogs')
      .withIndex('by_user_date', (q) =>
        q.eq('userId', user._id).gte('loggedAt', weekAgo)
      )
      .collect()

    // Group by day
    const dailyTotals: Record<string, number> = {}
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekAgo + i * 24 * 60 * 60 * 1000)
      const dateStr = date.toISOString().split('T')[0]
      dailyTotals[dateStr] = 0
    }

    logs.forEach((log) => {
      const dateStr = new Date(log.loggedAt).toISOString().split('T')[0]
      if (dailyTotals[dateStr] !== undefined) {
        dailyTotals[dateStr] += log.amount
      }
    })

    return Object.entries(dailyTotals).map(([date, amount]) => ({
      date,
      amount,
    })).sort((a, b) => a.date.localeCompare(b.date))
  },
})

// Log water intake
export const logWater = mutation({
  args: {
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    return await ctx.db.insert('waterLogs', {
      userId: user._id,
      amount: args.amount,
      loggedAt: Date.now(),
    })
  },
})

// Delete a water log
export const remove = mutation({
  args: {
    logId: v.id('waterLogs'),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) throw new Error('Unauthorized')

    const log = await ctx.db.get(args.logId)
    if (!log || log.userId !== user._id) {
      throw new Error('Log not found')
    }

    return await ctx.db.delete(args.logId)
  },
})
