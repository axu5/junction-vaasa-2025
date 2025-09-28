"use client";

import { api } from "@convex_generated/api";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function OperatorView() {
  const generateOtp = useMutation(api.functions.otp.generateOtp);
  const activeOtp = useQuery(api.functions.otp.getActiveOtp);
  const [otp, setOtp] = useState<{
    otp: string;
    expiresAt: number;
  } | null>(null);

  const consumedSuccessfully = activeOtp && activeOtp.otpUsedAt !== 0;

  useEffect(() => {
    setOtp(
      activeOtp && activeOtp.otpUsedAt === 0
        ? { otp: activeOtp.code, expiresAt: activeOtp.endTime }
        : null
    );
  }, [activeOtp]);

  const handleGenerateOtp = async () => {
    const code = await generateOtp();
    setOtp(code);
  };

  const isValid = otp && otp.expiresAt > Date.now();

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      {!consumedSuccessfully && (
        <>
          <div className='flex flex-col gap-4 items-center'>
            {!isValid ? (
              <Button onClick={handleGenerateOtp}>
                Generate one time code
              </Button>
            ) : (
              <div className='tracking-wide text-5xl'>{otp.otp}</div>
            )}

            <div>This code works for 5 minutes</div>

            <Link href='/mock/site' target='_blank'>
              Mock site keypad
            </Link>
          </div>
        </>
      )}

      {consumedSuccessfully && (
        <div className='text-3xl text-green-600 font-semibold'>
          Access granted and logged for this site.
        </div>
      )}
    </div>
  );
}
