export const routes = {
    home: '/',
    tags: '/tags',
    browses: '/browses/:browses',
    seasons: '/seasons/:season',
    seasonsBuilder: (season: string) => `/seasons/${season}`,
    browsesBuilder: (browse: string) => `/browses/${browse}`,
    movie: '/movie/:movie',
    movieBuilder: (movie: string) => `/movie/${movie}`,
    watch: '/watch/:movie/:episode',
    watchBuilder: (movie: string, episode: string) => `/watch/${movie}/${episode}`,
};
