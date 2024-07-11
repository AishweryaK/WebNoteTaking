import { useRoutes } from 'react-router-dom';
import { useEffect } from 'react';
import DocumentTitle from './DocumentTitle';
import { authenticatedRoutes, guestRoutes } from './config';
import AppLayout from '../Components/Layouts/AppLayout';
import { useReduxSelector } from '../Store';

function RootRouter() {
  const guest = useRoutes(guestRoutes);
  const authenticated = useRoutes(authenticatedRoutes);
  // const token = useReduxSelector((state: RootState) => state?.common?.token);
  const { uid } = useReduxSelector((state) => state?.user);
  const isAuthenticated = !!uid; // to convert value to boolean
  const isDarkMode = useReduxSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.querySelector('html')?.classList.add('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <>
      <DocumentTitle isAuthenticated={isAuthenticated} />
      <AppLayout isAuthenticated={isAuthenticated}>
        {uid ? authenticated : guest}
      </AppLayout>
    </>
  );
}

export default RootRouter;
