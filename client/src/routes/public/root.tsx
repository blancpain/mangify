import { Outlet } from 'react-router-dom';
import { HeaderMegaMenu, Footer } from '@/components';

export function PublicRoot() {
  return (
    <>
      <HeaderMegaMenu />
      <Outlet />
      <Footer
        links={[
          { label: 'Learn', link: '/learn' },
          { label: 'About', link: '/about' },
        ]}
      />
    </>
  );
}
