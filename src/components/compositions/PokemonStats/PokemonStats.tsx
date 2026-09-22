import { createMemo, For, Show } from 'solid-js';

import type { Pokemon } from '~/api/models/Pokemon';
import StatBar from '~/components/components/StatBar/StatBar';
import Typography from '~/components/components/Typography/Typography';
import { getPokemonStats } from '~/constants/stat-bar';
import { TypographyTypes } from '~/constants/typography';
import { t } from '~/lib/i18n';
import classes from './PokemonStats.module.scss';

type PokemonStatsProps = {
  pokemon: Pokemon;
  showTotal?: boolean;
  showBasicStats?: boolean;
};

const PokemonStats = (props: PokemonStatsProps) => {
  const stats = createMemo(() => {
    const statsByName = new Map(
      props.pokemon.stats?.map(({ stat, base_stat }) => [stat.name, base_stat]),
    );
    const allStats = getPokemonStats().map((stat) => ({
      ...stat,
      value: statsByName.get(stat.key) || 0,
    }));

    return props.showBasicStats ? allStats.slice(0, 3) : allStats;
  });

  const total = createMemo(() =>
    stats().reduce((acc, current) => acc + current.value, 0),
  );

  return (
    <div class={classes.container}>
      <Typography
        type={TypographyTypes.LABEL}
        color="muted-foreground"
        uppercase
      >
        {t('shared.baseStats')}
      </Typography>
      <For each={stats()}>
        {(stat) => (
          <StatBar label={stat.label} value={stat.value} color={stat.color} />
        )}
      </For>
      <Show when={props.showTotal}>
        <Typography
          type={TypographyTypes.LABEL}
          color="muted-foreground"
          uppercase
        >
          {`${t('shared.total')}: ${total()}`}
        </Typography>
      </Show>
    </div>
  );
};

export default PokemonStats;
