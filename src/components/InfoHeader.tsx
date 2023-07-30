import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InfoHeaderProps extends HTMLAttributes<HTMLTitleElement> {
  text: string;
  errorMessage?: boolean;
}

export function InfoHeader({ text, className, errorMessage }: InfoHeaderProps) {
  return (
    <>
      {errorMessage && (
        <span className="block lg:absolute top-28 rounded-xl min-w-[15rem] border-2 border-red-600 p-2 text-center text-sm text-red-100">
          Você deve selecionar ao menos 1
        </span>
      )}
      <h2
        className={twMerge(
          "m-auto my-6 max-w-min whitespace-nowrap rounded-3xl border py-6px px-3 text-center text-lg font-medium uppercase leading-6 tracking-wider",
          className
        )}
      >
        {text}
      </h2>
    </>
  );
}
