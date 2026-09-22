import HelmetMetadata from '~/components/components/HelmetMetadata/HelmetMetadata';
import NotFound from '~/components/compositions/NotFound/NotFound';
import { NotFoundTypes } from '~/constants/not-found';
import { t } from '~/lib/i18n';

const NotFoundRoute = () => {
  return (
    <>
      <HelmetMetadata
        title={t('meta.notFound.title')}
        description={t('meta.notFound.description')}
      />

      <NotFound type={NotFoundTypes.GENERIC} />
    </>
  );
};

export default NotFoundRoute;
