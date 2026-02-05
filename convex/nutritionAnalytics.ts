import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { authComponent } from './auth'

export const getWeeklyStats = query({
  args: {
    dates: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    if (!user) return []

    const results = []
    for (const date of args.dates) {
      const mealPlans = await ctx.db
        .query('mealPlans')
        .withIndex('by_user_date', (q) => q.eq('userId', user._id).eq('date', date))
        .collect()

      let totals = { date, calories: 0, protein: 0, carbs: 0, fat: 0 }

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
      results.push(totals)
    }

    return results
  },
})
