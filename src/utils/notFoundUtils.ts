import type { NotFoundData } from '~/components/compositions/NotFound/NotFound.interface';
import { type NotFoundType, NotFoundTypes } from '~/constants/not-found';
import { Routes } from '~/constants/routes';
import { t } from '~/lib/i18n';

export const getNotFoundData = (type: NotFoundType): NotFoundData => {
  switch (type) {
    case NotFoundTypes.POKEMON_DETAILS:
      return {
        title: t('notFound.pokemonDetails.title'),
        description: t('notFound.pokemonDetails.description'),
        button: {
          label: t('shared.backToPokedex'),
          to: Routes.POKEDEX(),
        },
      };
    case NotFoundTypes.POKEMON_LIST:
      return {
        title: t('notFound.pokemonList.title'),
        description: t('notFound.pokemonList.description'),
      };
    case NotFoundTypes.POKEMON_DETAILS_MODAL:
      return {
        title: t('notFound.pokemonDetails.title'),
        description: t('notFound.pokemonDetails.description'),
      };
    case NotFoundTypes.GENERIC:
      return {
        code: t('notFound.404'),
        title: t('notFound.generic.title'),
        description: t('notFound.generic.description'),
        button: {
          label: t('shared.goHome'),
          to: Routes.POKEDEX(),
        },
      };
    case NotFoundTypes.POKEMON_MOVE:
      return {
        title: t('notFound.pokemonMove.title'),
      };
    case NotFoundTypes.POKEMON_EVOLUTION_CHAIN:
      return {
        title: t('notFound.pokemonEvolutionChain.title'),
        description: t('notFound.pokemonEvolutionChain.description'),
      };
    default:
      return type satisfies never;
  }
};
