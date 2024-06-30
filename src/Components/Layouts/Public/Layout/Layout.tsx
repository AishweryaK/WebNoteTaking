// import { Outlet } from 'react-router-dom';

// import { Outlet } from 'react-router-dom';
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

// function Layout() {
//   return (
//     <div className="bg-cyan-300 w-2/3 h-98 rounded-2xl shadow-lg grid lg:grid-cols-12 overflow-hidden items-center">
//       <div className="sm:hidden md:block md:col-span-3 lg:col-span-6">
//         <img
//           // height={'100%'}
//           // width={'100%'}
//           className="w-full max-h-full"
//           alt=""
//           src={ICONS.Books}
//         />
//       </div>
//       <div className="sm:col-span-12 md:col-span-9 lg:col-span-6 items-center text-center justify-center">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default Layout;

function Layout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg w-3/4 max-w-4xl overflow-hidden">
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="https://via.placeholder.com/500"
            alt="Side illustration"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <div className="flex flex-col justify-center">
            <div className="mb-6 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-b from-purple-400 to-purple-600 flex items-center justify-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Logo"
                  className="h-10 w-10"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">
              Welcome back
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Welcome back! Please enter your details.
            </p>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="******"
                />
              </div>
              <div className="mb-6 flex items-center justify-between">
                <label className="inline-flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-purple-600"
                  />
                  <span className="ml-2">Remember for 30 days</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-purple-600 hover:text-purple-800"
                >
                  Forgot password
                </a>
              </div>
              <div className="mb-4">
                <button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Sign in
                </button>
              </div>
              <div className="mb-4">
                <button
                  className="w-full bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded border border-gray-300 focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  <img
                    src={ICONS.Google}
                    alt="Google"
                    className="inline-block mr-2 w-6"
                  />
                  Sign in with Google
                </button>
              </div>
            </form>
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-purple-600 hover:text-purple-800">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
