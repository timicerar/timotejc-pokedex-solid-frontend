import type { Pokemon } from '~/api/models/Pokemon';

export type PokemonSpriteKey =
  | 'official-artwork-default'
  | 'official-artwork-shiny'
  | 'home-default'
  | 'home-shiny'
  | 'front-default'
  | 'front-shiny'
  | 'back-default'
  | 'back-shiny';

export type PokemonSpriteItem = {
  key: PokemonSpriteKey;
  src: string;
};

export const getPokemonSpriteItems = (
  pokemon: Pokemon,
): PokemonSpriteItem[] => {
  const sprites = pokemon.sprites;

  const candidates: [PokemonSpriteKey, string | null | undefined][] = [
    [
      'official-artwork-default',
      sprites?.other?.['official-artwork']?.front_default,
    ],
    [
      'official-artwork-shiny',
      sprites?.other?.['official-artwork']?.front_shiny,
    ],
    ['home-default', sprites?.other?.home?.front_default],
    ['home-shiny', sprites?.other?.home?.front_shiny],
    ['front-default', sprites?.front_default],
    ['front-shiny', sprites?.front_shiny],
    ['back-default', sprites?.back_default],
    ['back-shiny', sprites?.back_shiny],
  ];

  return candidates
    .filter((candidate): candidate is [PokemonSpriteKey, string] =>
      Boolean(candidate[1]),
    )
    .map(([key, src]) => ({ key, src }));
};
