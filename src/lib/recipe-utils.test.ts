import { describe, expect, it } from "vitest";
import { formatAmount, parseAmount, scaleAmount } from "./recipe-utils";

describe("parseAmount", () => {
	it("parses whole numbers", () => {
		expect(parseAmount("1")).toBe(1);
		expect(parseAmount("5")).toBe(5);
	});

	it("parses fractions", () => {
		expect(parseAmount("1/2")).toBe(0.5);
		expect(parseAmount("3/4")).toBe(0.75);
	});

	it("parses mixed numbers", () => {
		expect(parseAmount("1 1/2")).toBe(1.5);
		expect(parseAmount("2 3/4")).toBe(2.75);
	});

	it("parses decimals", () => {
		expect(parseAmount("1.5")).toBe(1.5);
		expect(parseAmount("0.25")).toBe(0.25);
	});

	it("parses ranges as average", () => {
		expect(parseAmount("2-3")).toBe(2.5);
	});

	it("returns null for special amounts", () => {
		expect(parseAmount("to taste")).toBeNull();
		expect(parseAmount("as needed")).toBeNull();
		expect(parseAmount("")).toBeNull();
	});
});

describe("scaleAmount", () => {
	it("scales whole numbers", () => {
		expect(scaleAmount("1", 2)).toBe("2");
		expect(scaleAmount("2", 1.5)).toBe("3");
	});

	it("scales fractions", () => {
		expect(scaleAmount("1/2", 2)).toBe("1");
		expect(scaleAmount("1/4", 2)).toBe("1/2");
		expect(scaleAmount("1/2", 3)).toBe("1 1/2");
	});

	it("scales mixed numbers", () => {
		expect(scaleAmount("1 1/2", 2)).toBe("3");
		expect(scaleAmount("2 1/2", 2)).toBe("5");
	});

	it("preserves special amounts", () => {
		expect(scaleAmount("to taste", 2)).toBe("to taste");
		expect(scaleAmount("as needed", 3)).toBe("as needed");
	});
});

describe("formatAmount", () => {
	it("formats whole numbers", () => {
		expect(formatAmount(2)).toBe("2");
		expect(formatAmount(5)).toBe("5");
	});

	it("formats common fractions", () => {
		expect(formatAmount(0.5)).toBe("1/2");
		expect(formatAmount(0.25)).toBe("1/4");
		expect(formatAmount(0.75)).toBe("3/4");
	});

	it("formats mixed numbers", () => {
		expect(formatAmount(1.5)).toBe("1 1/2");
		expect(formatAmount(2.5)).toBe("2 1/2");
	});

	it("rounds small decimals", () => {
		expect(formatAmount(1.333)).toMatch(/^1\.?3/);
	});
});
