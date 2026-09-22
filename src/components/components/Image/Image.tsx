import {
  createEffect,
  createSignal,
  mergeProps,
  on,
  Show,
  splitProps,
} from 'solid-js';

import type { ImageProps } from '~/components/components/Image/Image.interface';
import Skeleton from '~/components/components/Skeleton/Skeleton';
import { asStyleObject, toCssValue } from '~/utils/styleUtils';
import classes from './Image.module.scss';

type Status = 'loading' | 'loaded' | 'error';

const Image = (rawProps: ImageProps) => {
  const props = mergeProps(
    { loading: 'lazy' as const, decoding: 'async' as const },
    rawProps,
  );

  const [local, rest] = splitProps(props, [
    'class',
    'wrapperClass',
    'style',
    'borderRadius',
    'width',
    'height',
    'src',
    'alt',
    'loading',
    'decoding',
    'onLoad',
    'onError',
  ]);

  let imgRef: HTMLImageElement | undefined;
  const [status, setStatus] = createSignal<Status>('loading');

  createEffect(
    on(
      () => local.src,
      () => {
        setStatus(imgRef?.complete ? 'loaded' : 'loading');
      },
    ),
  );

  return (
    <span
      classList={{
        [classes.wrapper]: true,
        ...(local.wrapperClass ? { [local.wrapperClass]: true } : {}),
      }}
      style={{
        ...(local.width !== undefined && { width: toCssValue(local.width) }),
        ...(local.height !== undefined && {
          height: toCssValue(local.height),
        }),
        ...(local.borderRadius !== undefined && {
          'border-radius': toCssValue(local.borderRadius),
        }),
      }}
    >
      <Show when={status() === 'loading'}>
        <Skeleton
          aria-hidden="true"
          class={classes.skeleton}
          borderRadius={local.borderRadius}
          minHeight="100%"
        />
      </Show>
      <Show when={status() !== 'error'}>
        <img
          {...rest}
          ref={imgRef}
          src={local.src}
          alt={local.alt}
          width={local.width}
          height={local.height}
          loading={local.loading}
          decoding={local.decoding}
          style={{
            ...asStyleObject(local.style),
            ...(local.borderRadius !== undefined && {
              'border-radius': toCssValue(local.borderRadius),
            }),
          }}
          classList={{
            [classes.image]: true,
            [classes.hidden]: status() === 'loading',
            ...(local.class ? { [local.class]: true } : {}),
          }}
          onLoad={(event) => {
            setStatus('loaded');
            local.onLoad?.(event);
          }}
          onError={(event) => {
            setStatus('error');
            local.onError?.(event);
          }}
        />
      </Show>
    </span>
  );
};

export default Image;
