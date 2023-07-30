"use client";

import { PackageCheck, PackageSearch } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex h-16 items-center justify-between bg-secondary lg:px-16 px-4">
      <Link href='/'>
        <h1 className="font-semibold">Quero Açaí</h1>
      </Link>
      <ul className="flex items-center justify-end gap-4">
        <li className="overflow-hidden rounded-full">
          <Link href="/store">
            <PackageCheck
              width={29}
              height={29}
              className="hover:backdrop-brightness-110"
            />
          </Link>
        </li>
        <li className="overflow-hidden rounded-full">
          <Link href="/store/cart">
            <PackageSearch
              width={29}
              height={29}
              className="hover:backdrop-brightness-110"
            />
          </Link>
        </li>
        <li className="border-l-[1px] pl-4">
          <UserButton
            showName
            afterSignOutUrl="/"
            appearance={{
              elements: {
                card: "bg-thirtiary",
                userButtonPopoverActionButtonIcon: "text-white",
                userButtonOuterIdentifier: "capitalize max-sm:hidden",
              },
              variables: {
                colorText: "white",
                colorTextSecondary: "white",
                colorAlphaShade: "white",
                colorInputText: "white",
              },
            }}
          />
        </li>
      </ul>
    </nav>
  );
}
