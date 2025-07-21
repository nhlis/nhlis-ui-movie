export const formatSeason = (value: string, year: number): string => {
    return `${value.toLowerCase()}-${year}`;
};

export const parseSeason = (season: string): { value: string; year: number } | null => {
    const match = season.match(/^([a-z]+)-(\d{4})$/i);
    if (!match) return null;

    const [, value, yearStr] = match;
    return {
        value: value.toLowerCase(),
        year: parseInt(yearStr, 10),
    };
};
