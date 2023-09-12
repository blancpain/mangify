import { Outlet } from 'react-router-dom';
import { HeaderMegaMenu } from '@/components/Header';
import { Footer } from '@/components/Footer';

//! one approach is to add a user check here and display a different root route dependin on
//! user being logged in or not - also check how they do it in react bulletproof
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
