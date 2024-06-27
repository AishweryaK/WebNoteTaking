import { Link } from 'react-router-dom';
import { ROUTES } from '../../Shared/Constants';

export default function Signup() {
  return (
    <h1 className="text-3xl font-bold underline text-center text-red-500">
      <Link to={ROUTES.LOGIN}>Signup </Link>
    </h1>
  );
}
