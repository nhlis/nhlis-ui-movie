import { genres } from './genres';
import { sorts } from './sorts';
import { tags } from './tags';

export const browses = [...sorts, ...genres, ...tags];

export type BrowseSlug = (typeof browses)[number]['slug'];

export const browsesPathObject: Record<BrowseSlug, { label: string; slug: BrowseSlug; path: string }> = Object.fromEntries(browses.map((s) => [s.path, s])) as Record<
    BrowseSlug,
    { label: string; slug: BrowseSlug; path: string }
>;
