import { Outlet } from 'react-router-dom';
import { HeaderMegaMenu, Footer } from '@/components';

export function PublicRoot() {
  return (
    <>
      <HeaderMegaMenu />
      <Outlet />
      <Footer
        links={[
          { label: 'About', link: 'www.google.com' },
          { label: 'Contact', link: 'www.google.com' },
          { label: 'Learn', link: 'www.google.com' },
        ]}
      />
    </>
  );
}
