import { Outlet } from 'react-router-dom';
import { HeaderMegaMenu } from '@/components/Header';
import { Hero } from '@/features/landing-page';
import { Footer } from '@/components/Footer';
// ? consider separating routes and layouts...

export function Root() {
  return (
    <>
      <HeaderMegaMenu />
      <Hero />
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
