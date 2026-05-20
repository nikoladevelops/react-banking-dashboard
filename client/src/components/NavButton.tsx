import { Link } from "react-router";
import { type ComponentType, type SVGProps } from "react";

interface NavButtonProps {
  to: string;
  SvgIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  SvgIcon2?: ComponentType<SVGProps<SVGSVGElement>>;
  iconWidth?: number;
  iconHeight?: number;
  children: React.ReactNode;
}

export default function NavButton({
  to,
  SvgIcon,
  SvgIcon2,
  iconWidth = 5,
  iconHeight = 4,
  children,
}: NavButtonProps) {
  const iconClassName = `w-${iconWidth} h-${iconHeight}`;

  return (
    <Link
      to={to}
      className="flex justify-center items-center gap-2 text-black dark:text-white hover-themed transition-colors"
    >
      <div className="flex">
        {SvgIcon && <SvgIcon className={iconClassName} />}
        {SvgIcon2 && <SvgIcon2 className={iconClassName} />}
      </div>
      {children}
    </Link>
  );
}
