import { Meta, Title } from '@solidjs/meta';
import { createMemo, type ParentProps } from 'solid-js';
import { t } from '~/lib/i18n';

type HelmetMetadataProps = {
  title?: string;
  description?: string;
  imageUrl?: string;
} & ParentProps;

const HelmetMetadata = (props: HelmetMetadataProps) => {
  const metaTitle = createMemo(() => props.title ?? t('meta.home.title'));
  const metaDescription = createMemo(
    () => props.description ?? t('meta.home.description'),
  );

  const imageLocation = '/images/seo/og-image.png';

  const metaImageUrl = createMemo(() => {
    if (props.imageUrl) return props.imageUrl;
    if (typeof window !== 'undefined')
      return `${window.location.origin}${imageLocation}`;
    return imageLocation;
  });

  return (
    <>
      <Title>{metaTitle()}</Title>

      <Meta name="description" content={metaDescription()} />

      <Meta property="og:type" content="website" />
      <Meta property="og:title" content={metaTitle()} />
      <Meta property="og:description" content={metaDescription()} />
      <Meta property="og:image" content={metaImageUrl()} />
      <Meta property="og:image:secure_url" content={metaImageUrl()} />
      <Meta property="og:image:alt" content={metaTitle()} />

      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={metaTitle()} />
      <Meta name="twitter:description" content={metaDescription()} />
      <Meta name="twitter:image" content={metaImageUrl()} />

      {props.children}
    </>
  );
};

export default HelmetMetadata;
