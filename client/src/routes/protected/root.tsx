import { Outlet } from 'react-router-dom';

export function PrivateRoot() {
  return (
    <>
      <h1>Welcome!</h1>
      <Outlet />
    </>
  );
}
