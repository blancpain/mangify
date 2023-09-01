import { Outlet } from 'react-router-dom';
import { HeaderMegaMenu } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function Root() {
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
