import { ReactNode, useState } from "react";
import Link from "next/link";

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
  const [hover, setHover] = useState(false);

  const baseStyles =
    "flex justify-center items-center w-[8.5rem] h-[2.5rem] ml-2 rounded-full transition-colors duration-200 text-center whitespace-nowrap";

  const primary = "bg-[#1143E8] text-white border border-transparent";
  const secondary = "bg-white text-black border border-blue-500";

  const dynamicStyle = variant === "secondary" || hover ? secondary : primary;

  const buttonStyles = `${baseStyles} ${dynamicStyle} ${className}`;

  const hoverHandlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  if (href) {
    return (
      <Link href={href} className={buttonStyles} {...hoverHandlers}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonStyles} {...hoverHandlers}>
      {children}
    </button>
  );
}
