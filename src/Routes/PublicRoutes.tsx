import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import { CustomRouter } from './RootRoutes';
import Login from '../Views/Login/Login';
import Signup from '../Views/Signup/Signup';
import Layout from '../Components/Layouts/Public/Layout/Layout';
import ForgotPwd from '../Views/ForgotP/ForgotPwd';

// eslint-disable-next-line import/prefer-default-export
const PUBLIC_ROUTES: CustomRouter[] = [
  {
    path: ROUTES_CONFIG.LOGIN.path,
    element: <Layout />,
    title: ROUTES_CONFIG.LOGIN.title,
    children: [
      {
        index: true,
        title: ROUTES_CONFIG.LOGIN.title,
        element: <Login />,
      },
      {
        path: `${ROUTES_CONFIG.SIGNUP.path}`,
        title: ROUTES_CONFIG.SIGNUP.title,
        element: <Signup />,
      },
      {
        path: `${ROUTES_CONFIG.FORGOT_PASSWORD.path}`,
        title: ROUTES_CONFIG.FORGOT_PASSWORD.title,
        element: <ForgotPwd />,
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
