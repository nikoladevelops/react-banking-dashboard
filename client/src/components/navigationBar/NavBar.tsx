import NavLogo from "./NavLogo.js";
import NavLinks from "./NavLinks.js";
import NavAuth from "./NavAuth.js";
import MenuBurger from "../../assets/navbar/menu-burger.svg?react";
import Close from "../../assets/navbar/close.svg?react";

import { useUIStore } from "../../uiStore.js";

export default function NavBar() {
  const isMainNavOpen = useUIStore((state) => state.isMainNavOpen);
  const toggleMainNav = useUIStore((state) => state.toggleMainNav);

  return (
    <>
      <nav className="flex max-xl:text-2xl max-xl:flex-col w-full p-10 gap-5 max-xl:gap-10 justify-between items-center bg-white dark:bg-[#0c0e36] border-b border-gray-200 dark:border-black">
        {/* Logo And Toggle Button */}
        <div className="flex max-xl:w-full justify-between items-center">
          <NavLogo logoWidth={200} />
          <Close
            width="50"
            height="50"
            className={`flex ${isMainNavOpen ? "flex" : "hidden"} xl:hidden items-center justify-center hover-themed`}
            onClick={toggleMainNav}
          />
          <MenuBurger
            width="45"
            height="45"
            className={`flex ${isMainNavOpen ? "hidden" : "flex"} xl:hidden items-center justify-center hover-themed`}
            onClick={toggleMainNav}
          />
        </div>
        {/* NavBar Content */}
        <NavLinks
          className={`${isMainNavOpen ? "flex" : "hidden"} xl:flex max-xl:flex-col gap-5 max-xl:gap-10 justify-center items-center text-center`}
        />
        <NavAuth
          className={`${isMainNavOpen ? "flex" : "hidden"} xl:flex max-xl:flex-col justify-center items-center gap-5 max-xl:gap-10 text-center`}
        />
      </nav>
    </>
  );
}
