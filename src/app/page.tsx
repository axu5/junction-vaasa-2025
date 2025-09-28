"use client";

import { SignInUp } from "@/components/sign-in-up";
import { Authenticated, Unauthenticated } from "convex/react";
import { Map } from "@/components/map";

export default function Page() {
  return (
    <>
      <Unauthenticated>
        <SignInUp />
      </Unauthenticated>
      <Authenticated>
        <Map />
      </Authenticated>
    </>
  );
}
