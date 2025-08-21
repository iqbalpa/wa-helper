import { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  );
};

export default Layout;
