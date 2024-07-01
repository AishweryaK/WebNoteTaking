import { PRIVATE_ROUTES } from './PrivateRoutes';
import PUBLIC_ROUTES from './PublicRoutes';
import { CustomRouter } from './RootRoutes';

export const guestRoutes: CustomRouter[] = [...PUBLIC_ROUTES];

export const authenticatedRoutes: CustomRouter[] = [...PRIVATE_ROUTES];
