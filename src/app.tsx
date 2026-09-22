import type { ParentComponent } from 'solid-js';
import ModalProvider from '~/components/providers/ModalProvider/ModalProvider';

const App: ParentComponent = (props) => {
  return (
    <>
      {props.children}
      <ModalProvider />
    </>
  );
};

export default App;
