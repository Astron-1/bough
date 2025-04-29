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
    fontClass = { fontFamily: "font-primary" };
  } else {
    fontClass = { fontFamily: "font-secondary" };
  }
  return (
    <div className={`${className} `} style={fontClass}>
      {children}
    </div>
  );
}
