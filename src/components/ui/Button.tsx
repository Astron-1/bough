import { ReactNode } from "react";
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
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "flex justify-center items-center w-[8.5rem] h-[2.5rem] ml-2 rounded-full transition-colors   text-center";

  const variantStyles = {
    primary: "bg-[#1143E8] hover:bg-[#0e39c5]",
    secondary: "bg-transparent border border-white hover:bg-white/10",
  };

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const buttonStyle = {
    fontFamily: "var(--font-sf-pro)",
    fontSize: "16px",
    fontWeight: 500,
    color: "white",
    lineHeight: "22px",
    padding: "0.5rem 1rem",
  };

  if (href) {
    return (
      <Link href={href} className={buttonStyles} style={buttonStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonStyles} onClick={onClick} style={buttonStyle}>
      {children}
    </button>
  );
}
