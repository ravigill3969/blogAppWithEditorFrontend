import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { Button } from "./ui/button";
import useAppStore from "@/zustand/zustand";
import { Menu } from "lucide-react";
import { useState } from "react";

function Nav() {
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const [show, setShow] = useState(false);

  return (
    <div className="m-3">
      <div className="flex justify-between items-center">
        <Link to={"/"}>
          <img src={logo} width={"224px"} />
        </Link>
        <div className="flex min-w-64 justify-between">
          <NavLink
            to="/category"
            className={
              ({ isActive }) =>
                isActive
                  ? "font-bold text-xl underline" // Active styles
                  : "font-bold text-xl hover:underline" // Default styles
            }
          >
            Write
          </NavLink>
          <span className="font-bold text-xl">Bookmark</span>
          <span className="font-bold text-xl">Search</span>
        </div>
        <div>
          {!isLoggedIn ? (
            <div className="flex gap-3">
              <Link to={"./login"}>
                <Button className="p-6">Login</Button>
              </Link>
              <Link to={"./register"}>
                <Button className="p-6">Register</Button>
              </Link>
            </div>
          ) : (
            <>
              <Button
                className="font-bold text-2xl mr-2 p-4 "
                onClick={() => setShow(!show)}
              >
                <Menu />
              </Button>
              <div className="absolute">
                {/* {show ? (
                  <div className="fixed flex flex-col bg-black text-white p-3 rounded-xl right-10">
                    <span className="hover:underline">Profile</span>
                  <span>Blogs</span>
                    <span className="hover:underline">Logout</span>
                  </div>
                ) : (
                  ""
                )} */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
