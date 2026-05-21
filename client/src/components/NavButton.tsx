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
  iconWidth = 18,
  iconHeight = 18,
  children,
}: NavButtonProps) {
  return (
    <Link
      to={to}
      className="flex justify-center items-center gap-2 text-black dark:text-white hover-themed transition-colors"
    >
      <div className="flex">
        {SvgIcon && (
          <SvgIcon width={`${iconWidth}px`} height={`${iconHeight}px`} />
        )}
        {SvgIcon2 && (
          <SvgIcon2 width={`${iconWidth}px`} height={`${iconHeight}px`} />
        )}
      </div>
      {children}
    </Link>
  );
}
