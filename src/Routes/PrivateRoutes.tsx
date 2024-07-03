import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import { CustomRouter } from './RootRoutes';
import Home from '../Views/Home';
import Notes from '../Views/Notes/Notes';

// eslint-disable-next-line import/prefer-default-export
export const PRIVATE_ROUTES: CustomRouter[] = [
  {
    path: ROUTES_CONFIG.HOME.path,
    element: <Home />,
    title: ROUTES_CONFIG.HOME.title,
    // children: [
    //   {
    //     index: true,
    //     element: <Notes />,
    //     title: ROUTES_CONFIG.NOTES.title,
    //   },
    // ],
  },
  // {
  //   path: ROUTES_CONFIG.NOTES.path,
  //   element: <Notes label/>,
  //   title: ROUTES_CONFIG.NOTES.title,
  // },
  {
    path: '/wishlist',
    element: 'Your wishlist here',
    title: 'Dashboard',
  },
  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: 'Rendering wildcard',
  },
];
