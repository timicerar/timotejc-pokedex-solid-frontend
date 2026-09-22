import * as i18n from '@solid-primitives/i18n';
import { createResource, createRoot, createSignal } from 'solid-js';
import { DEFAULT_LOCALE, type Locale } from '~/constants/locale';
import type translation from '../../public/locales/en/translation.json';

export type RawDictionary = typeof translation;
export type Dictionary = i18n.Flatten<RawDictionary>;

const fetchDictionary = async (locale: Locale): Promise<RawDictionary> => {
  const response = await fetch(`/locales/${locale}/translation.json`, {
    cache: 'no-store',
  });

  return response.json();
};

// createResource sets up internal effects, so module-scoped global state
// needs an explicit root — otherwise Solid warns the computations can
// never be disposed.
const { locale, setLocale, dict, t } = createRoot(() => {
  const [locale, setLocale] = createSignal<Locale>(DEFAULT_LOCALE);

  const [rawDictionary] = createResource(locale, fetchDictionary);

  const dict = () => i18n.flatten(rawDictionary() ?? ({} as RawDictionary));

  const t = i18n.translator(dict, i18n.resolveTemplate);

  return { locale, setLocale, dict, t };
});

export { dict, locale, setLocale, t };
