import { FaSolidMagnifyingGlass } from 'solid-icons/fa';
import { createSignal, For, Show } from 'solid-js';

import { usePokemon, usePokemons } from '~/api/pokemon/hooks';
import Badge from '~/components/components/Badge/Badge';
import Button from '~/components/components/Button/Button';
import Card from '~/components/components/Card/Card';
import Carousel from '~/components/components/Carousel/Carousel';
import { useCarouselNav } from '~/components/components/Carousel/hooks/useCarouselNav';
import Container from '~/components/components/Container/Container';
import Divider from '~/components/components/Divider/Divider';
import HelmetMetadata from '~/components/components/HelmetMetadata/HelmetMetadata';
import Image from '~/components/components/Image/Image';
import Input from '~/components/components/Input/Input';
import ProgressBar from '~/components/components/ProgressBar/ProgressBar';
import Select from '~/components/components/Select/Select';
import Skeleton from '~/components/components/Skeleton/Skeleton';
import StatBar from '~/components/components/StatBar/StatBar';
import Tab from '~/components/components/Tabs/Tab/Tab';
import TabContent from '~/components/components/Tabs/TabContent/TabContent';
import Tabs from '~/components/components/Tabs/Tabs';
import TabsList from '~/components/components/Tabs/TabsList/TabsList';
import Typography from '~/components/components/Typography/Typography';
import ScrollToTop from '~/components/compositions/ScrollToTop/ScrollToTop';
import { BadgeVariants } from '~/constants/badge';
import { ButtonVariants } from '~/constants/button';
import { Colors } from '~/constants/colors';
import { ModalTypes } from '~/constants/modal-provider';
import { useInfiniteVirtualizer } from '~/hooks/useInfiniteVirtualizer';
import { openModal } from '~/store/modals';

const ComponentExamples = () => {
  const carouselNav = useCarouselNav();
  const [selectValue, setSelectValue] = createSignal('');

  const pokemonQuery = usePokemon(() => ({ name: 'pikachu' }));

  const pokemonsResult = usePokemons();
  let scrollElRef: HTMLDivElement | undefined;
  const { rowVirtualizer } = useInfiniteVirtualizer({
    itemCount: () => pokemonsResult.items().length,
    hasNextPage: pokemonsResult.hasNextPage,
    isFetchingNextPage: pokemonsResult.isFetchingNextPage,
    fetchNextPage: pokemonsResult.fetchNextPage,
    getScrollElement: () => scrollElRef ?? null,
    estimateRowSize: 44,
  });

  return (
    <>
      <HelmetMetadata title="Component examples" />
      <ScrollToTop />

      <Container>
        <Typography as="h1" type="heading-xl">
          Component examples
        </Typography>

        <Divider />
        <Typography as="h2" type="heading-lg">
          Button
        </Typography>
        <div style={{ display: 'flex', gap: '8px', 'flex-wrap': 'wrap' }}>
          <Button variant={ButtonVariants.PRIMARY}>Primary</Button>
          <Button variant={ButtonVariants.SECONDARY}>Secondary</Button>
          <Button variant={ButtonVariants.GHOST}>Ghost</Button>
          <Button variant={ButtonVariants.DESTRUCTIVE}>Destructive</Button>
        </div>

        <Divider />
        <Typography as="h2" type="heading-lg">
          Badge
        </Typography>
        <div style={{ display: 'flex', gap: '8px', 'flex-wrap': 'wrap' }}>
          <Badge variant={BadgeVariants.DEFAULT}>Default</Badge>
          <Badge variant={BadgeVariants.PRIMARY}>Primary</Badge>
          <Badge variant={BadgeVariants.FIRE}>Fire</Badge>
          <Badge variant={BadgeVariants.WATER}>Water</Badge>
        </div>

        <Divider />
        <Typography as="h2" type="heading-lg">
          Card
        </Typography>
        <div style={{ display: 'flex', gap: '12px', 'flex-wrap': 'wrap' }}>
          <Card onClick={() => console.log('card clicked')}>
            Interactive card
          </Card>
          <Card>Static card</Card>
        </div>

        <Divider />
        <Typography as="h2" type="heading-lg">
          Image
        </Typography>
        <Image
          src="/images/pokedex-logo-light.svg"
          alt="Pokédex logo"
          width={120}
          height={40}
        />

        <Divider />
        <Typography as="h2" type="heading-lg">
          Input
        </Typography>
        <Input
          placeholder="Search Pokémon by name"
          leadingIcon={<FaSolidMagnifyingGlass />}
          style={{ 'max-width': '320px' }}
        />

        <Divider />
        <Typography as="h2" type="heading-lg">
          ProgressBar
        </Typography>
        <ProgressBar
          value={65}
          color={Colors.primary}
          style={{ 'max-width': '320px' }}
        />

        <Divider />
        <Typography as="h2" type="heading-lg">
          Select
        </Typography>
        <Select
          label="Type"
          placeholder="Select a type"
          options={[
            { value: 'fire', label: 'Fire' },
            { value: 'water', label: 'Water' },
            { value: 'grass', label: 'Grass' },
          ]}
          value={selectValue()}
          onChange={(value) => setSelectValue(value as string)}
          style={{ 'max-width': '240px' }}
        />

        <Divider />
        <Typography as="h2" type="heading-lg">
          Skeleton
        </Typography>
        <Skeleton style={{ 'max-width': '320px' }} />

        <Divider />
        <Typography as="h2" type="heading-lg">
          StatBar
        </Typography>
        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            gap: '8px',
            'max-width': '320px',
          }}
        >
          <StatBar label="HP" color={Colors['stat-hp']} value={120} />
          <StatBar label="ATK" color={Colors['stat-attack']} value={80} />
        </div>

        <Divider />
        <Typography as="h2" type="heading-lg">
          Tabs
        </Typography>
        <Tabs defaultValue="about">
          <TabsList>
            <Tab value="about">About</Tab>
            <Tab value="stats">Stats</Tab>
          </TabsList>
          <TabContent value="about">About tab content</TabContent>
          <TabContent value="stats">Stats tab content</TabContent>
        </Tabs>

        <Divider />
        <Typography as="h2" type="heading-lg">
          Carousel
        </Typography>
        <div style={{ 'max-width': '320px' }}>
          <Carousel setApi={carouselNav.setApi}>
            {[<div>Slide 1</div>, <div>Slide 2</div>, <div>Slide 3</div>]}
          </Carousel>
          <div style={{ display: 'flex', gap: '8px', 'margin-top': '8px' }}>
            <Button
              variant={ButtonVariants.SECONDARY}
              onClick={carouselNav.scrollPrev}
              disabled={!carouselNav.canScrollPrev()}
            >
              Prev
            </Button>
            <Button
              variant={ButtonVariants.SECONDARY}
              onClick={carouselNav.scrollNext}
              disabled={!carouselNav.canScrollNext()}
            >
              Next
            </Button>
            <Typography
              as="span"
              type="body-sm"
              style={{ 'align-self': 'center' }}
            >
              {carouselNav.selectedIndex() + 1} /{' '}
              {carouselNav.scrollSnaps().length}
            </Typography>
          </div>
        </div>

        <Divider />
        <Typography as="h2" type="heading-lg">
          Modal
        </Typography>
        <Button
          variant={ButtonVariants.DESTRUCTIVE}
          onClick={() =>
            openModal({
              type: ModalTypes.CONFIRMATION,
              data: {
                title: 'Delete this Pokémon?',
                description: 'This is just a demo confirmation modal.',
                onConfirm: () => console.log('confirmed'),
              },
            })
          }
        >
          Open confirmation modal
        </Button>

        <Divider />
        <Typography as="h2" type="heading-lg">
          TanStack Query
        </Typography>
        <Show when={pokemonQuery.isLoading}>
          <Skeleton style={{ 'max-width': '200px' }} />
        </Show>
        <Show when={pokemonQuery.data}>
          {(data) => (
            <Typography>
              {data().name} — #{data().id}
            </Typography>
          )}
        </Show>

        <Divider />
        <Typography as="h2" type="heading-lg">
          TanStack Virtual
        </Typography>
        <div
          ref={scrollElRef}
          style={{
            height: '240px',
            'max-width': '320px',
            overflow: 'auto',
            border: '1px solid var(--border)',
            'border-radius': 'var(--radius-md)',
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
              width: '100%',
            }}
          >
            <For each={rowVirtualizer.getVirtualItems()}>
              {(virtualRow) => (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                    height: `${virtualRow.size}px`,
                    padding: '0 12px',
                    display: 'flex',
                    'align-items': 'center',
                  }}
                >
                  {pokemonsResult.items()[virtualRow.index]?.name ?? 'Loading…'}
                </div>
              )}
            </For>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ComponentExamples;
