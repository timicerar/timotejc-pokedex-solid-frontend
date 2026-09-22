import HelmetMetadata from '~/components/components/HelmetMetadata/HelmetMetadata';
import { t } from '~/lib/i18n';

const NotFound = () => {
  return (
    <>
      <HelmetMetadata
        title={t('meta.notFound.title')}
        description={t('meta.notFound.description')}
      />

      <section>
        <h1>404: Not Found</h1>
        <p>It's gone 😞</p>
      </section>
    </>
  );
};

export default NotFound;
