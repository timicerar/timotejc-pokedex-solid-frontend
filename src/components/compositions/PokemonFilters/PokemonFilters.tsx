import {
  FaSolidFilterCircleXmark,
  FaSolidMagnifyingGlass,
} from 'solid-icons/fa';
import { Show } from 'solid-js';

import Button from '~/components/components/Button/Button';
import Input from '~/components/components/Input/Input';
import { usePokemonSearchInput } from '~/components/compositions/PokemonFilters/hooks/usePokemonSearchInput';
import SelectPokemonGeneration from '~/components/compositions/SelectPokemonGeneration/SelectPokemonGeneration';
import SelectPokemonType from '~/components/compositions/SelectPokemonType/SelectPokemonType';
import { ButtonVariants } from '~/constants/button';
import type { PokemonGeneration } from '~/constants/pokemon-generations';
import type { PokemonType } from '~/constants/pokemon-types';
import { usePokemonFilters } from '~/hooks/usePokemonFilters';
import { t } from '~/lib/i18n';
import classes from './PokemonFilters.module.scss';

const PokemonFilters = () => {
  const { filters, setSearch, setTypes, setGenerations, clearFilters } =
    usePokemonFilters();

  const { searchInput, setSearchInput, resetSearchInput } =
    usePokemonSearchInput({
      search: () => filters().search ?? '',
      setSearch,
    });

  const hasActiveFilters = () =>
    Boolean(
      filters().search ||
        filters().type?.length ||
        filters().generation?.length,
    );

  const handleClear = () => {
    resetSearchInput();
    clearFilters();
  };

  return (
    <div class={classes.filters}>
      <div class={classes.search}>
        <Input
          placeholder={t('pokemonFilters.searchPlaceholder')}
          leadingIcon={<FaSolidMagnifyingGlass />}
          value={searchInput()}
          onInput={(event) => setSearchInput(event.currentTarget.value)}
          onBlur={() => setSearchInput((prev) => prev.trim())}
        />
      </div>
      <SelectPokemonType
        multiple
        value={filters().type}
        onChange={(next) => setTypes(next as PokemonType[])}
      />
      <SelectPokemonGeneration
        multiple
        value={filters().generation}
        onChange={(next) => setGenerations(next as PokemonGeneration[])}
      />
      <Show when={hasActiveFilters()}>
        <Button
          variant={ButtonVariants.ROUNDED}
          ariaLabel={t('pokemonFilters.clearFilters')}
          leadingIcon={<FaSolidFilterCircleXmark />}
          onClick={handleClear}
          class={classes.clear}
        />
      </Show>
    </div>
  );
};

export default PokemonFilters;
