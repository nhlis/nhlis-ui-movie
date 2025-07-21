export const sorts = [
    { label: 'Popularity', slug: 'popularity', path: 'popularity' },
    { label: 'Top Rated', slug: 'rating_desc', path: 'top-rated' },
    { label: 'Lowest Rated', slug: 'rating_asc', path: 'lowest-rated' },
    { label: 'Newest', slug: 'release_desc', path: 'newest' },
    { label: 'Oldest', slug: 'release_asc', path: 'oldest' },
    { label: 'Alphabetical (A-Z)', slug: 'label_asc', path: 'alphabetical-a-z' },
    { label: 'Alphabetical (Z-A)', slug: 'title_desc', path: 'alphabetical-z-a' },
] as const;

export type SortSlug = (typeof sorts)[number]['path'];

export const sortsPathObject: Record<SortSlug, { label: string; slug: SortSlug; path: string }> = Object.fromEntries(sorts.map((s) => [s.path, s])) as Record<
    SortSlug,
    { label: string; slug: SortSlug; path: string }
>;
