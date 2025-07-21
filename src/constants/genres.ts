export const genres = [
    { label: 'Action', slug: 'action', path: 'action' },
    { label: 'Music', slug: 'music', path: 'music' },
    { label: 'Shounen', slug: 'shounen', path: 'shounen' },
    { label: 'Adventure', slug: 'adventure', path: 'adventure' },
    { label: 'Romance', slug: 'romance', path: 'romance' },
    { label: 'Slice of Life', slug: 'slice_of_life', path: 'slice-of-life' },
    { label: 'Comedy', slug: 'comedy', path: 'comedy' },
    { label: 'Science Fiction', slug: 'science_fiction', path: 'science-fiction' },
    { label: 'Sports', slug: 'sports', path: 'sports' },
    { label: 'Drama', slug: 'drama', path: 'drama' },
    { label: 'Seinen', slug: 'seinen', path: 'seinen' },
    { label: 'Supernatural', slug: 'supernatural', path: 'supernatural' },
    { label: 'Fantasy', slug: 'fantasy', path: 'fantasy' },
    { label: 'Shoujo', slug: 'shoujo', path: 'shoujo' },
    { label: 'Thriller', slug: 'thriller', path: 'thriller' },
    { label: 'Ecchi', slug: 'ecchi', path: 'ecchi' },
] as const;

export type GenreSlug = (typeof genres)[number]['slug']; // e.g. "slice_of_life"
export type GenrePath = (typeof genres)[number]['path']; // e.g. "slice-of-life"

export const genresSlugObject: Record<GenreSlug, { label: string; slug: GenreSlug; path: GenrePath }> = Object.fromEntries(genres.map((s) => [s.slug, s])) as Record<
    GenreSlug,
    { label: string; slug: GenreSlug; path: GenrePath }
>;

export const genresPathObject: Record<GenrePath, { label: string; slug: GenreSlug; path: GenrePath }> = Object.fromEntries(genres.map((s) => [s.path, s])) as Record<
    GenrePath,
    { label: string; slug: GenreSlug; path: GenrePath }
>;
