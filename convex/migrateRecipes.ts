import { mutation } from "./_generated/server";

/**
 * Migration: Convert existing recipes to new format
 * - instructions string → steps array
 * - plain tags → encoded category tags (e.g. "Breakfast" → "mealType:Breakfast")
 *
 * Safe to run multiple times — skips recipes that already have steps.
 */

// Tag mapping: plain tag → encoded tag
const TAG_MAP: Record<string, string> = {
	// Meal Type
	Breakfast: "mealType:Breakfast",
	Lunch: "mealType:Lunch",
	Dinner: "mealType:Dinner",
	Snack: "mealType:Snack",
	// Cuisine
	Kenyan: "cuisine:Kenyan",
	Swahili: "cuisine:Kenyan",
	Luo: "cuisine:Kenyan",
	Luhya: "cuisine:Kenyan",
	Kamba: "cuisine:Kenyan",
	Kisii: "cuisine:Kenyan",
	Burji: "cuisine:East African",
	Indian: "cuisine:International",
	// Dietary
	Vegan: "dietary:Vegan",
	Vegetarian: "dietary:Vegetarian",
	"Gluten-Free": "dietary:Gluten-Free",
	"Dairy-Free": "dietary:Dairy-Free",
	Healthy: "dietary:High-Protein",
	Nutritious: "dietary:High-Protein",
	Superfood: "dietary:High-Protein",
	// Difficulty (inferred from prep+cook time)
	Quick: "difficulty:Easy",
};

function parseInstructionsToSteps(instructions: string): { text: string; order: number }[] {
	return instructions
		.split(/\d+\.\s*/)
		.map((s) => s.trim())
		.filter(Boolean)
		.map((text, i) => ({ text, order: i }));
}

function migrateTags(tags: string[]): string[] {
	const encoded = new Set<string>();
	for (const tag of tags) {
		const mapped = TAG_MAP[tag];
		if (mapped) {
			encoded.add(mapped);
		}
		// Keep unmapped tags as-is for now (legacy)
		if (!mapped) {
			encoded.add(tag);
		}
	}
	return Array.from(encoded);
}

export const migrateRecipesToNewFormat = mutation({
	args: {},
	handler: async (ctx) => {
		const recipes = await ctx.db.query("recipes").collect();
		let migratedSteps = 0;
		let migratedTags = 0;

		for (const recipe of recipes) {
			const updates: Record<string, any> = {};

			// Migrate instructions → steps (skip if already has steps)
			if (recipe.instructions && !(recipe as any).steps?.length) {
				const steps = parseInstructionsToSteps(recipe.instructions);
				if (steps.length > 0) {
					updates.steps = steps;
					migratedSteps++;
				}
			}

			// Migrate tags to encoded format (skip if already encoded)
			if (recipe.tags?.length) {
				const hasEncoded = recipe.tags.some((t) => t.includes(":"));
				if (!hasEncoded) {
					updates.tags = migrateTags(recipe.tags);
					migratedTags++;
				}
			}

			if (Object.keys(updates).length > 0) {
				updates.updatedAt = Date.now();
				await ctx.db.patch(recipe._id, updates);
			}
		}

		return `Migration complete: ${migratedSteps} recipes got steps, ${migratedTags} recipes got encoded tags. (${recipes.length} total recipes scanned)`;
	},
});
