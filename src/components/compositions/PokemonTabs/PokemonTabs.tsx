import type { Pokemon } from '~/api/models/Pokemon';
import Container from '~/components/components/Container/Container';
import Tab from '~/components/components/Tabs/Tab/Tab';
import TabContent from '~/components/components/Tabs/TabContent/TabContent';
import Tabs from '~/components/components/Tabs/Tabs';
import TabsList from '~/components/components/Tabs/TabsList/TabsList';
import PokemonAboutTab from '~/components/compositions/PokemonTabs/PokemonAboutTab/PokemonAboutTab';
import PokemonBaseStatsTab from '~/components/compositions/PokemonTabs/PokemonBaseStatsTab/PokemonBaseStatsTab';
import PokemonEvolutionChainTab from '~/components/compositions/PokemonTabs/PokemonEvolutionChainTab/PokemonEvolutionChainTab';
import PokemonMovesTab from '~/components/compositions/PokemonTabs/PokemonMovesTab/PokemonMovesTab';
import PokemonSpritesTab from '~/components/compositions/PokemonTabs/PokemonSpritesTab/PokemonSpritesTab';
import { PokemonDetailsTabs } from '~/constants/pokemon-details-tabs';
import { useIsTouchDevice } from '~/hooks/useIsTouchDevice';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import { t } from '~/lib/i18n';
import classes from './PokemonTabs.module.scss';

type PokemonTabsProps = {
  pokemon: Pokemon;
};

const PokemonTabs = (props: PokemonTabsProps) => {
  const isTablet = useMediaQuery('lsm');
  const isTouchDevice = useIsTouchDevice();
  const disableWrap = () => isTablet() && isTouchDevice();

  return (
    <Tabs defaultValue={PokemonDetailsTabs.ABOUT} class={classes.tabs}>
      <div class={classes.tabsBar}>
        <TabsList wrap={!disableWrap()}>
          <Tab value={PokemonDetailsTabs.ABOUT} uppercase>
            {t('pokemonDetails.tabs.about')}
          </Tab>
          <Tab value={PokemonDetailsTabs.BASE_STATS} uppercase>
            {t('pokemonDetails.tabs.baseStats')}
          </Tab>
          <Tab value={PokemonDetailsTabs.EVOLUTION_CHAIN} uppercase>
            {t('pokemonDetails.tabs.evolutionChain')}
          </Tab>
          <Tab value={PokemonDetailsTabs.MOVES} uppercase>
            {t('pokemonDetails.tabs.moves')}
          </Tab>
          <Tab value={PokemonDetailsTabs.SPRITES} uppercase>
            {t('pokemonDetails.tabs.sprites')}
          </Tab>
        </TabsList>
      </div>
      <Container>
        <TabContent value={PokemonDetailsTabs.ABOUT}>
          <PokemonAboutTab pokemon={props.pokemon} />
        </TabContent>
        <TabContent value={PokemonDetailsTabs.BASE_STATS}>
          <PokemonBaseStatsTab pokemon={props.pokemon} />
        </TabContent>
        <TabContent value={PokemonDetailsTabs.EVOLUTION_CHAIN}>
          <PokemonEvolutionChainTab pokemon={props.pokemon} />
        </TabContent>
        <TabContent value={PokemonDetailsTabs.MOVES}>
          <PokemonMovesTab pokemon={props.pokemon} />
        </TabContent>
        <TabContent value={PokemonDetailsTabs.SPRITES}>
          <PokemonSpritesTab pokemon={props.pokemon} />
        </TabContent>
      </Container>
    </Tabs>
  );
};

export default PokemonTabs;
