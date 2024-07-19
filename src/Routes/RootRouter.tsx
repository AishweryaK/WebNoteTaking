import { useRoutes } from 'react-router-dom';
import { useEffect } from 'react';
import DocumentTitle from './DocumentTitle';
import { authenticatedRoutes, guestRoutes } from './config';
import AppLayout from '../Components/Layouts/AppLayout';
import { useReduxSelector } from '../Store';
import { ToastContainer } from 'react-toastify';
import { ROOT_ROUTER } from '../Shared/Constants';
import ScreenLoader from '../Components/Loader/ScreenLoader';

function RootRouter() {
  const guest = useRoutes(guestRoutes);
  const authenticated = useRoutes(authenticatedRoutes);
  const { uid } = useReduxSelector((state) => state?.user);
  const isAuthenticated = !!uid; // to convert value to boolean
  const isDarkMode = useReduxSelector((state) => state.ui.isDarkMode);
  const {isLoading} = useReduxSelector((state) => state.loader);

  useEffect(() => {
    if (isDarkMode) {
      document.querySelector(ROOT_ROUTER.HTML)?.classList.add(ROOT_ROUTER.DARK);
    } else {
      document.querySelector(ROOT_ROUTER.HTML)?.classList.remove(ROOT_ROUTER.DARK);
    }
  }, [isDarkMode]);

  return (
    <>
      <DocumentTitle isAuthenticated={isAuthenticated} />
      <AppLayout isAuthenticated={isAuthenticated}>
        {uid ? authenticated : guest}
        {isLoading && <ScreenLoader/>}
      </AppLayout>
      <ToastContainer />
    </>
  );
}

export default RootRouter;
