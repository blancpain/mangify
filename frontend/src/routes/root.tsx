import { Outlet } from 'react-router-dom';
import { HeaderMegaMenu } from '@/components/Header';
// ? consider separating routes and layouts...

export function Root() {
  return (
    <>
      <HeaderMegaMenu />
      <Outlet />
    </>
  );
}
