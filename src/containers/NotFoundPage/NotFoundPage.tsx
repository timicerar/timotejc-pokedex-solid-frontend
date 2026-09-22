import NotFound from '~/components/compositions/NotFound/NotFound';
import { NotFoundTypes } from '~/constants/not-found';

const NotFoundPage = () => {
  return <NotFound type={NotFoundTypes.GENERIC} />;
};

export default NotFoundPage;
