// import { useEffect } from "react";

import { Outlet, useRoutes } from 'react-router-dom';
import { ICONS } from '../../Shared/icons';
import useLabels from '../../Components/Labels/Label';
import Notes from '../Notes/Notes';
import { ROUTES_CONFIG } from '../../Shared/Constants';
import { CustomRouter } from '../../Routes/RootRoutes';

export default function Home() {
  const labels = useLabels();
  // useEffect(()=>{
  //   localStorage.clear();
  // })
  const dynamicRoutes = labels.map((label) => ({
    path: `${label.text}`,
    element: <Notes />,
    title: ROUTES_CONFIG.NOTES.title,
  }));
  const routes = useRoutes([
    {
      path: '/notes',
      element: <Outlet />,
      children: [
        ...dynamicRoutes,
        { index: true, element: <Notes />, title: 'Notes' } as CustomRouter,
      ],
    },
  ]);

  return routes;
}
