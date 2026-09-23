import { useParams } from '@solidjs/router';
import { Match, Switch } from 'solid-js';

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
    <Switch fallback={<PokemonDetailsSkeleton />}>
      <Match when={!pokemonQuery.isLoading && !pokemon()}>
        <Container center>
          <NotFound type={NotFoundTypes.POKEMON_DETAILS} />
        </Container>
      </Match>
      <Match when={pokemon()}>
        {(data) => <PokemonDetails pokemon={data()} />}
      </Match>
    </Switch>
  );
};

export default PokemonDetailsPage;
