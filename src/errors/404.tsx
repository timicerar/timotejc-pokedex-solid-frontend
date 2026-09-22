import HelmetMetadata from '~/components/components/HelmetMetadata/HelmetMetadata';
import NotFoundPage from '~/containers/NotFoundPage/NotFoundPage';
import { t } from '~/lib/i18n';

const NotFoundRoute = () => {
  return (
    <>
      <HelmetMetadata
        title={t('meta.notFound.title')}
        description={t('meta.notFound.description')}
      />
      <NotFoundPage />
    </>
  );
};

export default NotFoundRoute;
