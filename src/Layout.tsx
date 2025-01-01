import React from "react";
import Nav from "./components/Nav";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div >
      <Nav />
      <div className="max-w-[1024px] mx-auto flex flex-col p-4">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
