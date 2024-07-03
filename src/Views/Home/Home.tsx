// import { useEffect } from "react";

import { Outlet } from 'react-router-dom';
import { ICONS } from '../../Shared/icons';

export default function Home() {
  // useEffect(()=>{
  //   localStorage.clear();
  // })

  return <Outlet />;
}
