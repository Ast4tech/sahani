/**
 * Parse an amount string to a numeric value
 * Handles: "1", "1/2", "1 1/2", "1.5", "2-3", "to taste"
 */
export function parseAmount(amount: string): number | null {
	const trimmed = amount.trim().toLowerCase();

	// Handle special cases
	if (trimmed === "to taste" || trimmed === "as needed" || trimmed === "") {
		return null;
	}

	// Handle ranges like "2-3" - use the average
	if (trimmed.includes("-") && !trimmed.includes("/")) {
		const [min, max] = trimmed.split("-").map((s) => parseFloat(s.trim()));
		if (!isNaN(min) && !isNaN(max)) {
			return (min + max) / 2;
		}
	}

	// Handle mixed numbers like "1 1/2"
	const mixedMatch = trimmed.match(/^(\d+)\s+(\d+)\/(\d+)$/);
	if (mixedMatch) {
		const whole = parseInt(mixedMatch[1]);
		const num = parseInt(mixedMatch[2]);
		const den = parseInt(mixedMatch[3]);
		return whole + num / den;
	}

	// Handle fractions like "1/2"
	const fractionMatch = trimmed.match(/^(\d+)\/(\d+)$/);
	if (fractionMatch) {
		const num = parseInt(fractionMatch[1]);
		const den = parseInt(fractionMatch[2]);
		return num / den;
	}

	// Handle plain numbers
	const num = parseFloat(trimmed);
	if (!isNaN(num)) {
		return num;
	}

	return null;
}

/**
 * Format a scaled amount back to a nice string
 * Prefer fractions for common values, decimals otherwise
 */
export function formatAmount(value: number): string {
	if (value === 0) return "0";
	if (value < 0.01) return value.toFixed(2);

	const whole = Math.floor(value);
	const fractional = value - whole;

	// Common fractions
	const fractions: [number, string][] = [
		[1 / 8, "1/8"],
		[1 / 4, "1/4"],
		[1 / 3, "1/3"],
		[3 / 8, "3/8"],
		[1 / 2, "1/2"],
		[5 / 8, "5/8"],
		[2 / 3, "2/3"],
		[3 / 4, "3/4"],
		[7 / 8, "7/8"],
	];

	// Find closest fraction
	let closestFraction = "";
	let minDiff = Infinity;
	for (const [frac, display] of fractions) {
		const diff = Math.abs(fractional - frac);
		if (diff < minDiff && diff < 0.1) {
			minDiff = diff;
			closestFraction = display;
		}
	}

	if (whole === 0) {
		return closestFraction || value.toFixed(2).replace(/\.?0+$/, "");
	}

	if (closestFraction) {
		return `${whole} ${closestFraction}`;
	}

	// Return decimal, removing trailing zeros
	return value.toFixed(2).replace(/\.?0+$/, "");
}

/**
 * Scale an amount by a multiplier
 * Returns null for amounts that can't be scaled (like "to taste")
 */
export function scaleAmount(amount: string, multiplier: number): string {
	const parsed = parseAmount(amount);
	if (parsed === null) {
		return amount; // Return as-is for special amounts
	}
	return formatAmount(parsed * multiplier);
}
