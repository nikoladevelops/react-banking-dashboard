import NavLogo from "./NavLogo.js";
import NavLinks from "./NavLinks.js";
import NavAuth from "./NavAuth.js";
import MenuBurger from "../assets/navbar/menu-burger.svg?react";

export default function NavBar({ user, setUser }) {
  return (
    <>
      <nav className="flex w-full p-10 gap-5 justify-between items-center bg-white dark:bg-[#0c0e36] border-b border-gray-200 dark:border-black max-xl:hidden">
        <NavLogo className="flex items-center justify-center" />
        <NavLinks className="flex gap-5 justify-center" />
        <NavAuth user={user} setUser={setUser} className="flex gap-5" />
      </nav>
      <nav className="flex flex-col p-10 gap-10 text-2xl content-center justify-between items-center bg-white dark:bg-[#0c0e36] border-b border-gray-200 dark:border-black xl:hidden">
        <div className="flex w-full justify-between">
          <NavLogo logoWidth={200} />
          <MenuBurger
            width="45"
            height="45"
            className="flex items-center justify-center hover-themed"
          />
        </div>

        <NavLinks className="flex flex-col gap-10 justify-center items-center" />
        <NavAuth
          user={user}
          setUser={setUser}
          className="flex flex-col gap-10 justify-center items-center"
        />
      </nav>
    </>
  );
}
