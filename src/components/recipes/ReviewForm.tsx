import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useState } from "react";

interface ReviewFormProps {
  initialRating?: number;
  initialText?: string;
  onSubmit: (rating: number, text: string) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export function ReviewForm({
  initialRating = 0,
  initialText = "",
  onSubmit,
  onCancel,
  submitLabel = "Submit Review",
}: ReviewFormProps) {
  const [rating, setRating] = useState(initialRating);
  const [text, setText] = useState(initialText);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit(rating, text.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Your Rating
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1 transition-colors"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= (hoveredRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm font-medium text-muted-foreground">
            {rating > 0 ? `${rating} out of 5` : "Select a rating"}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Your Review (optional)
        </label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience with this recipe..."
          className="min-h-[100px]"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={rating === 0}>
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
