import React from 'react';
import { routes } from '@/constants/routes/routes';
import Home from '@/pages/Home';
import Main from '@/layouts/Main';
import Tags from '@/pages/Tags';
import Browses from '@/pages/Browses';
import Seasons from '@/pages/Seasons';
import Movie from '@/pages/Movie';
import Watch from '@/pages/Watch';

interface Router {
    path: string;
    component: React.FC | React.LazyExoticComponent<React.FC>;
    layout?: React.FC<{ children: React.ReactNode }>;
}

const RoutesConfig: Router[] = [
    { path: routes.home, component: Home, layout: Main },
    { path: routes.tags, component: Tags, layout: Main },
    { path: routes.browses, component: Browses, layout: Main },
    { path: routes.seasons, component: Seasons, layout: Main },
    { path: routes.movie, component: Movie, layout: Main },
    { path: routes.watch, component: Watch, layout: Main },
];

export default RoutesConfig;
