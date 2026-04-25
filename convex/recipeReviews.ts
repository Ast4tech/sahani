import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

export const list = query({
  args: { recipeId: v.id("recipes") },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("recipeReviews")
      .withIndex("by_recipe", (q) => q.eq("recipeId", args.recipeId))
      .order("desc")
      .collect();

    // Get user info for each review
    const reviewsWithUserInfo = await Promise.all(
      reviews.map(async (review) => {
        const user = await ctx.db
          .query("userProfile")
          .withIndex("by_user", (q) => q.eq("userId", review.userId))
          .first();

        return {
          ...review,
          userName: user ? `${user.userId.slice(0, 8)}` : "Anonymous",
          userAvatar: null,
        };
      }),
    );

    return reviewsWithUserInfo;
  },
});

export const getUserReview = query({
  args: { recipeId: v.id("recipes") },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) return null;

    const review = await ctx.db
      .query("recipeReviews")
      .withIndex("by_recipe_user", (q) =>
        q.eq("recipeId", args.recipeId).eq("userId", user._id),
      )
      .first();

    return review;
  },
});

export const getStats = query({
  args: { recipeId: v.id("recipes") },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("recipeReviews")
      .withIndex("by_recipe", (q) => q.eq("recipeId", args.recipeId))
      .collect();

    if (reviews.length === 0) {
      return {
        count: 0,
        averageRating: 0,
      };
    }

    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    return {
      count: reviews.length,
      averageRating: Math.round(averageRating * 10) / 10,
    };
  },
});

export const create = mutation({
  args: {
    recipeId: v.id("recipes"),
    rating: v.number(),
    text: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) throw new Error("Unauthorized");

    // Check if user already reviewed this recipe
    const existingReview = await ctx.db
      .query("recipeReviews")
      .withIndex("by_recipe_user", (q) =>
        q.eq("recipeId", args.recipeId).eq("userId", user._id),
      )
      .first();

    if (existingReview) {
      throw new Error("You have already reviewed this recipe");
    }

    const now = Date.now();
    return await ctx.db.insert("recipeReviews", {
      recipeId: args.recipeId,
      userId: user._id,
      rating: args.rating,
      text: args.text,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    reviewId: v.id("recipeReviews"),
    rating: v.optional(v.number()),
    text: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) throw new Error("Unauthorized");

    const review = await ctx.db.get(args.reviewId);
    if (!review || review.userId !== user._id) {
      throw new Error("Review not found");
    }

    const { reviewId, ...updates } = args;
    return await ctx.db.patch(reviewId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { reviewId: v.id("recipeReviews") },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) throw new Error("Unauthorized");

    const review = await ctx.db.get(args.reviewId);
    if (!review || review.userId !== user._id) {
      throw new Error("Review not found");
    }

    return await ctx.db.delete(args.reviewId);
  },
});
