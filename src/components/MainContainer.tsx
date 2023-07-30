import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
};

export function MainContainer({ children, className }: ButtonProps) {
  return (
    <div className={
      twMerge("flex min-h-full max-w-sm flex-col rounded-xl md:px-16 transition-all hover:transform hover:shadow-neutral-800 lg:justify-between lg:shadow-2xl lg:hover:scale-110 -mt-3", className)
    }>
      {children}
    </div>
  );
}
