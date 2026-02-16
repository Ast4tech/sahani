export const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"] as const;
export type MealType = (typeof MEAL_TYPES)[number];

export function getWeekDates(startDate: Date) {
	const days = [];
	const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	for (let i = 0; i < 7; i++) {
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + i);
		days.push({
			day: dayNames[date.getDay()],
			date: date.getDate(),
			fullDate: date.toISOString().split("T")[0],
			id: `day-${i}`,
		});
	}
	return days;
}

export function formatDateRange(startDate: Date) {
	const endDate = new Date(startDate);
	endDate.setDate(startDate.getDate() + 6);
	const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
	const start = startDate.toLocaleDateString("en-US", options);
	const end = endDate.toLocaleDateString("en-US", {
		...options,
		year: "numeric",
	});
	return `${start} - ${end}`;
}
