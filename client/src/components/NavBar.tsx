import NavLogo from "./NavLogo.js";
import NavLinks from "./NavLinks.js";
import NavAuth from "./NavAuth.js";

export default function NavBar({ user, setUser }) {
  return (
    <nav className="flex p-10 gap-5 flex-wrap justify-between items-center bg-white dark:bg-[#0c0e36] border-b border-gray-200 dark:border-black ">
      <NavLogo className="flex items-center justify-center" />
      <NavLinks className="flex gap-5 justify-center" />
      <NavAuth user={user} setUser={setUser} className="flex gap-5" />
    </nav>
  );
}
