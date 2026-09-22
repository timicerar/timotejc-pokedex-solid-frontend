import type { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';

import CenterLayout from '~/components/layouts/CenterLayout/CenterLayout';
import DefaultLayout from '~/components/layouts/DefaultLayout/DefaultLayout';
import Pokedex from './pages/pokedex';

export const routes: RouteDefinition[] = [
  {
    component: DefaultLayout,
    children: [
      {
        path: '/',

        component: Pokedex,
      },
      {
        path: '/pokemon/:pokemon',
        component: lazy(() => import('./pages/pokemon-details')),
      },
    ],
  },
  {
    component: CenterLayout,
    children: [
      {
        path: '**',
        component: lazy(() => import('./errors/404')),
      },
    ],
  },
];
