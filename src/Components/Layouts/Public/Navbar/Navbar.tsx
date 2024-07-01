import { Link } from 'react-router-dom';
import './navbar.scss';
import { ICONS } from '../../../../Shared/icons';
// import { Link } from 'react-router-dom';
// import { ROUTES } from '../../../../Shared/Constants';

export function Navbar() {
  return (
    // <header className="header d-flex" id="header">
    //   {/* <Link to={ROUTES.HOMEPAGE}>Home page</Link> */}
    //   <Link to={ROUTES.LOGIN}>Login</Link>
    //   <Link to={ROUTES.SIGNUP}>Signup</Link>
    // </header>
    <nav className="bg-white shadow-lg py-4">
      <div>
        <Link to="/" className="text-2xl w-7">
          {ICONS.Hamburger}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
