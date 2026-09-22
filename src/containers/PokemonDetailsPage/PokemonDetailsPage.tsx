import { useParams } from '@solidjs/router';
import { Show } from 'solid-js';

import { usePokemon } from '~/api/pokemon/hooks';
import Container from '~/components/components/Container/Container';
import NotFound from '~/components/compositions/NotFound/NotFound';
import PokemonDetails from '~/components/compositions/PokemonDetails/PokemonDetails';
import PokemonDetailsSkeleton from '~/components/compositions/PokemonDetails/PokemonDetailsSkeleton/PokemonDetailsSkeleton';
import { NotFoundTypes } from '~/constants/not-found';

const PokemonDetailsPage = () => {
  const params = useParams();
  const pokemonQuery = usePokemon(() => ({ name: params.pokemon || '' }));

  const pokemon = () => (!pokemonQuery.isError ? pokemonQuery.data : undefined);

  return (
    <Show when={!pokemonQuery.isLoading} fallback={<PokemonDetailsSkeleton />}>
      <Show
        when={pokemon()}
        fallback={
          <Container center>
            <NotFound type={NotFoundTypes.POKEMON_DETAILS} />
          </Container>
        }
      >
        {(data) => <PokemonDetails pokemon={data()} />}
      </Show>
    </Show>
  );
};

export default PokemonDetailsPage;
