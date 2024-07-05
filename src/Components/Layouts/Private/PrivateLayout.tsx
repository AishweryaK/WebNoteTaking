import { AppLayoutProps } from '../AppLayout.d';

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {

  return (
    <>
      {children}
    </>
  );
}

export default PrivateLayout;
