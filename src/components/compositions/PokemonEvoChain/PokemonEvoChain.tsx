import { useNavigate } from '@solidjs/router';
import { FaSolidArrowRight } from 'solid-icons/fa';
import { createMemo, For, Show } from 'solid-js';

import type {
  EvolutionChainLink,
  EvolutionDetail,
} from '~/api/models/EvolutionChainDetail';
import type { Pokemon } from '~/api/models/Pokemon';
import { useEvolutionChain, usePokemonSpecies } from '~/api/pokemon/hooks';
import NotFound from '~/components/compositions/NotFound/NotFound';
import PokemonCard from '~/components/compositions/PokemonCard/PokemonCard';
import PokemonEvoChainSkeleton from '~/components/compositions/PokemonEvoChain/PokemonEvoChainSkeleton';
import { NotFoundTypes } from '~/constants/not-found';
import { Routes } from '~/constants/routes';
import { getIdFromResourceUrl } from '~/utils/apiResourceUtils';
import classes from './PokemonEvoChain.module.scss';

type PokemonEvoChainProps = {
  pokemon: Pokemon;
};

type EvoPathNode = {
  name: string;
  detail?: EvolutionDetail;
};

const buildEvolutionPaths = (
  link: EvolutionChainLink,
  detail?: EvolutionDetail,
): EvoPathNode[][] => {
  const node: EvoPathNode = { name: link.species.name, detail };

  if (!link.evolves_to?.length) {
    return [[node]];
  }

  return link.evolves_to.flatMap((child) =>
    buildEvolutionPaths(child, child.evolution_details?.[0]).map((path) => [
      node,
      ...path,
    ]),
  );
};

const PokemonEvoChain = (props: PokemonEvoChainProps) => {
  const navigate = useNavigate();

  const speciesId = () => getIdFromResourceUrl(props.pokemon.species.url);

  const speciesQuery = usePokemonSpecies(() => ({
    name: props.pokemon.species.name,
    id: speciesId() ? Number(speciesId()) : undefined,
  }));

  const evolutionChainId = () =>
    getIdFromResourceUrl(speciesQuery.data?.evolution_chain?.url);

  const chainQuery = useEvolutionChain(
    () => ({ id: evolutionChainId() ?? '' }),
    () => ({ enabled: Boolean(evolutionChainId()) }),
  );

  const isLoading = () => speciesQuery.isLoading || chainQuery.isLoading;

  const paths = createMemo(() => {
    const chain = chainQuery.data?.chain;
    return chain ? buildEvolutionPaths(chain) : [];
  });

  return (
    <Show when={!isLoading()} fallback={<PokemonEvoChainSkeleton />}>
      <Show
        when={!chainQuery.isError && chainQuery.data}
        fallback={<NotFound type={NotFoundTypes.POKEMON_EVOLUTION_CHAIN} />}
      >
        <div class={classes.container}>
          <For each={paths()}>
            {(path) => (
              <div class={classes.row}>
                <For each={path}>
                  {(node, index) => (
                    <div class={classes.step}>
                      <Show when={index() > 0}>
                        <FaSolidArrowRight
                          class={classes.arrow}
                          aria-hidden="true"
                        />
                      </Show>
                      <div class={classes.node}>
                        <PokemonCard
                          name={node.name}
                          active={node.name === props.pokemon.species.name}
                          hideBadges
                          onClick={
                            node.name === props.pokemon.species.name
                              ? undefined
                              : () =>
                                  navigate(
                                    Routes.POKEMON_DETAILS({
                                      pokemonName: node.name,
                                    }),
                                  )
                          }
                        />
                      </div>
                    </div>
                  )}
                </For>
              </div>
            )}
          </For>
        </div>
      </Show>
    </Show>
  );
};

export default PokemonEvoChain;
