export const seasons = [
    { label: 'Spring', value: 'spring', start: { month: 2, day: 4 }, end: { month: 5, day: 4 } },
    { label: 'Summer', value: 'summer', start: { month: 5, day: 5 }, end: { month: 8, day: 6 } },
    { label: 'Fall', value: 'fall', start: { month: 8, day: 7 }, end: { month: 11, day: 6 } },
    { label: 'Winter', value: 'winter', start: { month: 11, day: 7 }, end: { month: 2, day: 3 } },
] as const;

export type SeasonSlug = (typeof seasons)[number]['value'];

export const seasonsPathObject: Record<SeasonSlug, { label: string; value: SeasonSlug; start: any; end: any }> = Object.fromEntries(seasons.map((s) => [s.value, s])) as Record<
    SeasonSlug,
    { label: string; value: SeasonSlug; start: any; end: any }
>;
