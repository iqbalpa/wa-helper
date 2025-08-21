import { FC } from "react";
import { Logo } from "@/widgets";
import Menu from "../Menu/Menu";

const LayoutHeader: FC = () => {
  return (
    <>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <nav className="navbar max-w-7xl mx-auto px-4">
          <Menu
            links={[
              { name: "Home", href: "/" },
            ]}
          />
          <Logo logoName={"WhatsApp Helper"} />
          <div className="navbar-end">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Ready</span>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default LayoutHeader;
