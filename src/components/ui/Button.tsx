import { ReactNode } from "react";
import Link from "next/link";
import Text from "../Text";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

export default function Button({
  href,
  children,
  className = "",
  variant = "primary",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "group flex justify-center items-center min-w-[8.5rem] px-4 h-[2.5rem] ml-2 rounded-full text-center relative overflow-hidden transition-all duration-300 ease-out hover:shadow-lg active:shadow-inner active:translate-y-[1px]";

  const primary =
    "bg-[#1143E8] text-white border border-transparent before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:bg-white before:scale-x-0 hover:before:scale-x-100 before:origin-right before:transition-transform before:duration-300 before:ease-out after:absolute after:inset-y-0 after:right-0 after:w-1/2 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:text-black hover:border-[#1143E8]";

  const secondary =
    "bg-white text-black border border-blue-500 before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:bg-[#1143E8] before:scale-x-0 hover:before:scale-x-100 before:origin-right before:transition-transform before:duration-300 before:ease-out after:absolute after:inset-y-0 after:right-0 after:w-1/2 after:bg-[#1143E8] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:text-white";

  const buttonStyles = `${baseStyles} ${
    variant === "secondary" ? secondary : primary
  } ${className}`;

  const childStyles = "relative z-10 transition-colors duration-300";

  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
        <Text>
          <span className={childStyles}>{children}</span>
        </Text>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonStyles}>
      <span className={childStyles}>{children}</span>
    </button>
  );
}
