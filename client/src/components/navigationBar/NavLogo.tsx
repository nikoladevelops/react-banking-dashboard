import FibankLogo from "../../assets/navbar/fibank-logo-white.svg?react";
import { Link } from "react-router";
import { useUIStore } from "../../uiStore";

interface NavLogoProps {
  logoWidth?: number;
  logoHeight?: number;
  className?: string;
}

export default function NavLogo({
  logoWidth = 170,
  logoHeight = 55,
  className,
}: NavLogoProps) {
  const closeMainNav = useUIStore((state) => state.closeMainNav);

  return (
    <div className={`${className}`}>
      <Link to="/" className="inline-flex items-center justify-center">
        <FibankLogo
          width={`${logoWidth}px`}
          height={`${logoHeight}px`}
          className={`hover-themed`}
          onClick={closeMainNav}
        />
      </Link>
    </div>
  );
}
