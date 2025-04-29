"use client";

import React from "react";
import ClickSpark from "./ClickSpark";

interface GlobalClickSparkProps {
  children: React.ReactNode;
}

/**
 * A global wrapper component that adds click spark effects to the entire application.
 * This component should be placed at the root level to cover the whole website.
 */
const GlobalClickSpark: React.FC<GlobalClickSparkProps> = ({ children }) => {
  return (
    <ClickSpark
      sparkColor="#3498db"
      sparkRadius={25}
      sparkCount={8}
      sparkSize={14}
      extraScale={1.2}
      duration={200}
    >
      {children}
    </ClickSpark>
  );
};

export default GlobalClickSpark;
