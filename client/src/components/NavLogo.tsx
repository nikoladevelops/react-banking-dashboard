import FibankLogo from "../assets/navbar/fibank-logo-white.svg?react";
import { Link } from "react-router";

export default function NavLogo({ className }) {
  return (
    <div className={`${className}`}>
      <Link to="/" className="inline-flex items-center justify-center">
        <FibankLogo className="w-45 h-10 hover-themed" />
      </Link>
    </div>
  );
}
