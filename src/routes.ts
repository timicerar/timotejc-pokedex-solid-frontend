import type { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';

import Pokedex from './pages/pokedex';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Pokedex,
  },
  {
    path: '/pokemon/:pokemon',
    component: lazy(() => import('./pages/pokemon-details')),
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
