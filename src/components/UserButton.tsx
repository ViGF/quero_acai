"use client";

import { UserButton as UserButtonClerk } from "@clerk/nextjs";

export function UserButton() {
  return (
    <UserButtonClerk
      showName
      afterSignOutUrl="/"
      appearance={{
        elements: {
          card: "bg-thirtiary",
          userButtonPopoverActionButtonIcon: "text-white",
          userButtonOuterIdentifier: "capitalize",
        },
        variables: {
          colorText: "white",
          colorTextSecondary: "white",
          colorAlphaShade: "white",
        },
      }}
    />
  );
}
