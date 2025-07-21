import { slugify } from './slugify';

export const formatMovie = (title: string, id: string): string => {
    const slug = slugify(title);
    return `${slug}-${id}`;
};

export const parseMovie = (movie: string): string => {
    const [, id] = movie.split(/-(?=\d+$)/);
    return id;
};
