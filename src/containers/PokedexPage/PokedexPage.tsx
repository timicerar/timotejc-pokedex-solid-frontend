import Container from '~/components/components/Container/Container';
import PokemonFilters from '~/components/compositions/PokemonFilters/PokemonFilters';
import PokemonList from '~/components/compositions/PokemonList/PokemonList';
import ScrollToTop from '~/components/compositions/ScrollToTop/ScrollToTop';
import { Breakpoints } from '~/constants/breakpoints';
import classes from './PokedexPage.module.scss';

const PokedexPage = () => {
  return (
    <>
      <div class={classes.filters}>
        <PokemonFilters />
      </div>
      <Container maxWidth={Breakpoints.xl}>
        <PokemonList />
        <ScrollToTop />
      </Container>
    </>
  );
};

export default PokedexPage;
