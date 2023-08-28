import { Outlet } from 'react-router-dom';
import { HeaderMegaMenu } from '@/components/Header';
import { Hero } from '@/features/landing-page';
// ? consider separating routes and layouts...

export function Root() {
  return (
    <>
      <HeaderMegaMenu />
      <Hero />
      <Outlet />
    </>
  );
}
