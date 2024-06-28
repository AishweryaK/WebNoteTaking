// import { Outlet } from 'react-router-dom';

import { Outlet } from 'react-router-dom';
import { ICONS } from '../../../../Shared/icons';

// function Layout() {
//   return (
//     // bg-[url('../../../../assets/Images/books.png')]

//     // <div className="bg-white w-2/3 rounded-2xl shadow-lg flex flex-row">
//        <div className="bg-white w-2/3 rounded-2xl shadow-lg grid lg:grid-cols-12">
//       {/* <p className="w-2/5 lg:text-3xl font-bold underline text-red-500 w-2/4">Layout</p> */}
//       <p className="sm:hidden md:block lg:text-3xl font-bold md:underline md:text-red-500 sm:col-span-0 md:col-span-3 lg:col-span-6">
//         Layout
//       </p>
//       {/* <div className='layout'></div> */}
//       <div className='sm:col-span-12 md:col-span-9 lg:col-span-6 align-middle text-center justify-center'>
//       <Outlet />
//       </div>
//     </div>
//   );
// }

// export default Layout;

function Layout() {
  return (
    <div className="bg-cyan-300 w-2/3 h-98 rounded-2xl shadow-lg grid lg:grid-cols-12 overflow-hidden items-center">
      <div className="sm:hidden md:block md:col-span-3 lg:col-span-6">
        <img
          // height={'100%'}
          // width={'100%'}
          className="w-full max-h-full"
          alt=""
          src={ICONS.Books}
        />
      </div>
      <div className="sm:col-span-12 md:col-span-9 lg:col-span-6 items-center text-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
