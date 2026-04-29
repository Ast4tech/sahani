export const RECIPE_TAG_CATEGORIES = [
	{
		id: "mealType",
		label: "Meal Type",
		tags: ["Breakfast", "Lunch", "Dinner", "Snack"],
	},
	{
		id: "cuisine",
		label: "Cuisine",
		tags: ["Kenyan", "East African", "International", "Fusion"],
	},
	{
		id: "dietary",
		label: "Dietary",
		tags: ["Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free", "Keto", "High-Protein"],
	},
	{
		id: "difficulty",
		label: "Difficulty",
		tags: ["Easy", "Medium", "Hard"],
	},
] as const;

export type TagCategory = (typeof RECIPE_TAG_CATEGORIES)[number]["id"];

/** Encode tag for storage: "mealType:Breakfast" */
export function encodeTag(categoryId: string, tag: string): string {
	return `${categoryId}:${tag}`;
}

/** Decode stored tag */
export function decodeTag(encoded: string): { categoryId: string; tag: string } | null {
	const idx = encoded.indexOf(":");
	if (idx === -1) return null;
	return { categoryId: encoded.slice(0, idx), tag: encoded.slice(idx + 1) };
}

/** Get display tags from encoded array */
export function getDisplayTags(encodedTags: string[]): string[] {
	return encodedTags.map((t) => {
		const decoded = decodeTag(t);
		return decoded ? decoded.tag : t;
	});
}
