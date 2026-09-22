import { useNavigate } from '@solidjs/router';
import { FaRegularHome } from 'solid-icons/fa';
import { createMemo, Show } from 'solid-js';

import Button from '~/components/components/Button/Button';
import Logo from '~/components/components/Logo/Logo';
import Typography from '~/components/components/Typography/Typography';
import type { NotFoundProps } from '~/components/compositions/NotFound/NotFound.interface';
import { ButtonVariants } from '~/constants/button';
import { getNotFoundData } from '~/utils/notFoundUtils';
import classes from './NotFound.module.scss';

const NotFound = (props: NotFoundProps) => {
  const navigate = useNavigate();

  const data = createMemo(() => getNotFoundData(props.type));

  return (
    <div classList={{ [classes.notFound]: true, [classes[props.type]]: true }}>
      <Show when={data().showLogo}>
        <Logo class={classes.logo} />
      </Show>
      <Show when={data().code}>
        <Typography type="display-4xl" class={classes.code}>
          {data().code}
        </Typography>
      </Show>
      <div class={classes.wrapper}>
        <Typography as="h1" type="display-base" uppercase>
          {data().title}
        </Typography>
        <Typography type="body-sm" color="muted-foreground">
          {data().description}
        </Typography>
      </div>
      <Show when={data().button}>
        {(button) => (
          <Button
            variant={ButtonVariants.PRIMARY}
            class={classes.button}
            leadingIcon={<FaRegularHome />}
            onClick={() => navigate(button().to)}
          >
            {button().label}
          </Button>
        )}
      </Show>
    </div>
  );
};

export default NotFound;
