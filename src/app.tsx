import { type ParentComponent, Suspense } from 'solid-js';

const App: ParentComponent = (props) => {
  return (
    <main>
      <Suspense>{props.children}</Suspense>
    </main>
  );
};

export default App;
