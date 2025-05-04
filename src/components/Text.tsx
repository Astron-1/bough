// components/Text.tsx

export enum Font {
  SOURCE_SANS = "SOURCE_SANS",
  GARAMOND = "GARAMOND",
}

type TextProps = {
  type?: Font;
  children: React.ReactNode;
  className?: string;
};

export default function Text({ type, children, className = "" }: TextProps) {
  let fontClass;
  if (type === Font.GARAMOND) {
    fontClass = "font-[EB_Garamond]";
  } else {
    fontClass = "font-[source-sans]";
  }
  return <div className={`${className} ` + fontClass}>{children}</div>;
}
