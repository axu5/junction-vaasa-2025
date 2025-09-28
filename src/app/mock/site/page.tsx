"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@convex_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

export default function MockSite() {
  const [enteredOtp, setEnteredOtp] = useState("");

  const verifyOtp = useMutation(api.functions.otp.verifyOtp);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const valid = await verifyOtp({
        otp: enteredOtp,
        siteId: "exampleSiteId",
      });
      if (!valid) {
        throw new Error("Invalid OTP");
      }
      toast("Access granted and logged");
    } catch {
      toast("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <form
        className='w-md flex flex-col gap-4'
        onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <Label>Enter the one-time code provided</Label>
          <Input
            type='number'
            placeholder='XXX XXX'
            onChange={e => setEnteredOtp(e.currentTarget.value)}
          />
        </div>
        <Button>Enter</Button>
      </form>
    </div>
  );
}
