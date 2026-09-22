import type { NotFoundType } from '~/constants/not-found';

export type NotFoundProps = {
  type: NotFoundType;
};

export type NotFoundButtonData = {
  label: string;
  to: string;
};

export type NotFoundData = {
  showLogo?: boolean;
  code?: string;
  title: string;
  description?: string;
  button?: NotFoundButtonData;
};
