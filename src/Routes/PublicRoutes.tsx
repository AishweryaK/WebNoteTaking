import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
// import Dashboard from '../Views/Dashboard/Dashboard';
import { CustomRouter } from './RootRoutes';
import Login from '../Views/Login/Login';
import Signup from '../Views/Signup/Signup';
import Layout from '../Components/Layouts/Public/Layout/Layout';

// eslint-disable-next-line import/prefer-default-export
// export const PUBLIC_ROUTES: Array<CustomRouter> = [
//   {
//     path: ROUTES_CONFIG.HOMEPAGE.path,
//     element: <Dashboard />,
//     title: ROUTES_CONFIG.HOMEPAGE.title,
//   },
//   {
//     path: `${ROUTES_CONFIG.LOGIN.path}`,
//     title: ROUTES_CONFIG.LOGIN.title,
//     element: <Login />,
//   },
//   {
//     path: '*',
//     element: <Navigate to={WILDCARD_ROUTES.PUBLIC} />,
//     title: 'Rendering wildcard',
//   },
// ];

const PUBLIC_ROUTES: CustomRouter[] = [
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <Layout />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
    children: [
      {
        index: true,
        path: `${ROUTES_CONFIG.LOGIN.path}`,
        title: ROUTES_CONFIG.LOGIN.title,
        element: <Login />,
      },
      {
        path: `${ROUTES_CONFIG.SIGNUP.path}`,
        title: ROUTES_CONFIG.SIGNUP.title,
        element: <Signup />,
      },
      {
        path: '*',
        title: 'Rendering wildcard',
        element: <Navigate to={WILDCARD_ROUTES.PUBLIC} />,
      },
    ] as CustomRouter[],
  },
];

export default PUBLIC_ROUTES;
