/* @refresh reload */
import 'solid-devtools';
import '~/styles/tokens.css';
import '~/styles/global.scss';

import { MetaProvider } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { QueryClientProvider } from '@tanstack/solid-query';
import { render } from 'solid-js/web';
import { queryClient } from '~/lib/queryClient';
import ThemeProvider from '~/theme/ThemeProvider';
import App from './app';
import { routes } from './routes';

const root = document.getElementById('root');

if (!(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router
          root={(props) => (
            <MetaProvider>
              <App>{props.children}</App>
            </MetaProvider>
          )}
        >
          {routes}
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  ),
  root,
);
