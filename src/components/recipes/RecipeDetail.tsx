import { useState } from "react";
import type { Doc } from "convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import {
  ChefHat,
  Clock,
  Minus,
  Plus,
  Star,
  Utensils,
  Trash2,
  Edit2,
} from "lucide-react";
import { scaleAmount } from "@/lib/recipe-utils";
import { Button } from "@/components/ui/button";
import { ReviewForm } from "./ReviewForm";
import { api } from "convex/_generated/api";

interface RecipeDetailProps {
  recipe: Doc<"recipes"> | null;
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const [servings, setServings] = useState(recipe?.servings || 1);
  const [isEditingReview, setIsEditingReview] = useState(false);

  // Fetch reviews and stats from Convex
  const reviews = useQuery(
    api.recipeReviews.list,
    recipe?._id ? { recipeId: recipe._id } : "skip",
  );
  const stats = useQuery(
    api.recipeReviews.getStats,
    recipe?._id ? { recipeId: recipe._id } : "skip",
  );
  const userReview = useQuery(
    api.recipeReviews.getUserReview,
    recipe?._id ? { recipeId: recipe._id } : "skip",
  );

  // Mutations
  const createReview = useMutation(api.recipeReviews.create);
  const updateReview = useMutation(api.recipeReviews.update);
  const deleteReview = useMutation(api.recipeReviews.remove);

  // Calculate scale factor based on recipe's base servings
  const baseServings = recipe?.servings || 1;
  const scaleFactor = servings / baseServings;

  // Scale ingredients with amounts
  const scaledIngredients = recipe?.ingredients?.map((ing) => ({
    ...ing,
    amount: scaleAmount(ing.amount, scaleFactor),
  })) || [{ name: "Fresh ingredients", amount: "Various" }];

  // Scale nutrition values
  const scaledCalories = Math.round((recipe?.calories || 0) * scaleFactor);
  const scaledProtein = Math.round((recipe?.protein || 0) * scaleFactor);
  const scaledCarbs = Math.round((recipe?.carbs || 0) * scaleFactor);
  const scaledFat = Math.round((recipe?.fat || 0) * scaleFactor);

  const handleSubmitReview = async (rating: number, text: string) => {
    if (!recipe) return;

    if (userReview) {
      await updateReview({
        reviewId: userReview._id,
        rating,
        text,
      });
    } else {
      await createReview({
        recipeId: recipe._id,
        rating,
        text,
      });
    }
    setIsEditingReview(false);
  };

  const handleDeleteReview = async () => {
    if (!userReview) return;
    await deleteReview({ reviewId: userReview._id });
    setIsEditingReview(false);
  };

  if (!recipe) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-sahani-tertiary mx-auto mb-4" />
          <p className="text-muted-foreground font-bold">
            Select a recipe to view details
          </p>
        </div>
      </div>
    );
  }

  const reviewCount = stats?.count || 0;
  const averageRating = stats?.averageRating || 0;

  return (
    <>
      <div className="flex-1 p-10 max-w-3xl">
        <h2 className="text-4xl font-black text-foreground leading-tight mb-4">
          {recipe.name}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          {recipe.description ||
            "This recipe is the perfect way to enjoy a healthy and delicious meal. Using fresh ingredients and simple steps, you can create a restaurant-quality dish at home."}
        </p>

        <div className="grid grid-cols-4 gap-4 mb-10">
          <div className="bg-secondary border border-border rounded-2xl p-4 text-center">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Utensils className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-[10px] font-bold text-sahani-tertiary uppercase tracking-wider">
              Kcals
            </p>
            <p className="text-lg font-black text-foreground">
              {scaledCalories}
            </p>
          </div>
          <div className="bg-secondary border border-border rounded-2xl p-4 text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-[10px] font-bold text-sahani-tertiary uppercase tracking-wider">
              Prep
            </p>
            <p className="text-lg font-black text-foreground">
              {(recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0)}M
            </p>
          </div>
          <div className="bg-secondary border border-border rounded-2xl p-4 text-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Utensils className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-[10px] font-bold text-sahani-tertiary uppercase tracking-wider">
              Carbs
            </p>
            <p className="text-lg font-black text-foreground">{scaledCarbs}</p>
          </div>
          <div className="bg-secondary border border-border rounded-2xl p-4 text-center">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Utensils className="w-5 h-5 text-primary" />
            </div>
            <p className="text-[10px] font-bold text-sahani-tertiary uppercase tracking-wider">
              Fat
            </p>
            <p className="text-lg font-black text-foreground">{scaledFat}</p>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-black text-foreground mb-6">
            How to make it
          </h3>
          <div className="space-y-6">
            {(
              recipe.instructions?.split("\n") || [
                "Start by preparing all your fresh ingredients.",
                "Follow the combined steps to cook the meal to perfection.",
                "Serve immediately and enjoy your healthy creation!",
              ]
            ).map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600 font-bold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-muted-foreground leading-relaxed pt-1">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-black text-foreground">Reviews</h3>
              {reviewCount > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-bold text-foreground">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
            <span className="text-lg font-bold text-sahani-tertiary">
              {reviewCount.toString().padStart(2, "0")}
            </span>
          </div>

          {/* Review Form Section */}
          <div className="mb-6">
            {isEditingReview ? (
              <div className="p-6 bg-secondary border border-border rounded-2xl">
                <h4 className="text-lg font-bold text-foreground mb-4">
                  {userReview ? "Edit Your Review" : "Write a Review"}
                </h4>
                <ReviewForm
                  initialRating={userReview?.rating || 0}
                  initialText={userReview?.text || ""}
                  onSubmit={handleSubmitReview}
                  onCancel={() => setIsEditingReview(false)}
                  submitLabel={userReview ? "Update Review" : "Submit Review"}
                />
                {userReview && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-destructive hover:text-destructive"
                    onClick={handleDeleteReview}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete Review
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between p-6 bg-secondary border border-border rounded-2xl">
                <div>
                  <h4 className="text-lg font-bold text-foreground">
                    {userReview ? "Your Review" : "Rate this Recipe"}
                  </h4>
                  {userReview ? (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= userReview.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {userReview.rating.toFixed(1)}
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Share your thoughts with others
                    </p>
                  )}
                </div>
                <Button onClick={() => setIsEditingReview(true)}>
                  {userReview ? (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </>
                  ) : (
                    "Write a Review"
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-6 bg-secondary border border-border rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                        {review.userName.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-bold text-foreground">
                        {review.userName}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-foreground">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  {review.text && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.text}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="font-medium">No reviews yet</p>
                <p className="text-sm">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side Panel: Ingredients & Nutrition */}
      <div className="w-[350px] p-10 bg-card border-l border-border hidden xl:block overflow-y-auto">
        <div className="relative mb-10 group">
          <div className="aspect-square rounded-3xl bg-gray-100 overflow-hidden border border-border">
            <img
              src={
                recipe.imageUrl ||
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
              }
              alt="Chef or Food"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-foreground">Ingredients</h3>
            <div className="flex items-center bg-secondary rounded-lg border border-border p-1">
              <button
                type="button"
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="p-1 hover:text-primary transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 text-xs font-bold text-foreground">
                {servings.toString().padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => setServings(servings + 1)}
                className="p-1 hover:text-primary transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <ul className="space-y-4">
            {scaledIngredients.map((ing, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">
                    {ing.amount} {ing.unit}{" "}
                  </span>
                  {ing.name}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-black text-foreground mb-6">
            Nutrition Facts
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Utensils className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-sm font-bold text-muted-foreground">
                  Calories
                </p>
              </div>
              <p className="font-black text-foreground">{scaledCalories}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Utensils className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-sm font-bold text-muted-foreground">
                  Protein
                </p>
              </div>
              <p className="font-black text-foreground">{scaledProtein}g</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <Utensils className="w-4 h-4 text-yellow-500" />
                </div>
                <p className="text-sm font-bold text-muted-foreground">
                  Total Fat
                </p>
              </div>
              <p className="font-black text-foreground">{scaledFat}g</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
