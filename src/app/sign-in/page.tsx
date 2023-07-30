"use client";

import { SignIn as SignInClerkPage } from "@clerk/nextjs";

export default function SignIn() {
  return (
    <main className="flex h-screen items-center justify-center">
      <SignInClerkPage />
    </main>
  );
}
