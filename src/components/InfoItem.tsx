import { twMerge } from "tailwind-merge";

type InfoItemProps = {
  text: string;
  className?: string;
};

export function InfoItem({ text, className }: InfoItemProps) {
  return (
    <div className={twMerge("m-auto rounded-md bg-white py-1 px-6 w-60 text-center font-light text-primary", className)}>
      {text}
    </div>
  );
}
