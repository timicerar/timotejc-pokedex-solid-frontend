import HelmetMetadata from '~/components/components/HelmetMetadata/HelmetMetadata';
import PokemonDetailsPage from '~/containers/PokemonDetailsPage/PokemonDetailsPage';
import { t } from '~/lib/i18n';

const PokemonDetails = () => {
  return (
    <>
      <HelmetMetadata
        title={t('meta.details.title')}
        description={t('meta.details.description')}
      />
      <PokemonDetailsPage />
    </>
  );
};

export default PokemonDetails;
