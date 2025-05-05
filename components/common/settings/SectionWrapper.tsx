import React from "react";

type SectionWrapperProps = {
  children: React.ReactNode;
};

export function SectionWrapper({ children }: SectionWrapperProps) {
  return <div className="border-b border-gray-300 pb-6 mb-6">{children}</div>;
}
