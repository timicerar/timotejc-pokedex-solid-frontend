import { type ParentComponent, Suspense } from 'solid-js';
import SplashScreen from '~/components/components/SplashScreen/SplashScreen';
import ModalProvider from '~/components/providers/ModalProvider/ModalProvider';

const App: ParentComponent = (props) => {
  return (
    <>
      <Suspense fallback={<SplashScreen />}>{props.children}</Suspense>
      <ModalProvider />
    </>
  );
};

export default App;
