"use client";

import { Map } from "@/components/map";
import { Navbar } from "@/components/navbar";
import { OperatorView } from "@/components/operator-view";
import { SignInUp } from "@/components/sign-in-up";
import { api } from "@convex_generated/api";
import {
  Authenticated,
  Unauthenticated,
  useQuery,
} from "convex/react";

export default function Page() {
  const role = useQuery(api.functions.user.getUserRole);

  return (
    <>
      <Unauthenticated>
        <SignInUp />
      </Unauthenticated>
      <Authenticated>
        {role === "admin" ? (
          <>
            <Navbar />
            <Map />
          </>
        ) : (
          <OperatorView />
        )}
      </Authenticated>
    </>
  );
}
