"use client";

import { SignUp as SignUpClerkPage } from "@clerk/nextjs";

export default function SignUp() {
  return (
    <main className="flex h-screen items-center justify-center">
      <SignUpClerkPage />
    </main>
  );
}
