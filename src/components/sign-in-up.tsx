import { useAuthActions } from "@convex-dev/auth/react";
import { LockKeyhole, UserRound } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Image from "next/image";
import VeoLogo from "@/../public/veo.png";

export function SignInUp() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signUp" | "signIn">("signIn");

  return (
    <div className='flex flex-row w-screen h-screen'>
      <div className='hidden md:flex md:flex-col items-center justify-center bg-accent text-accent-foreground min-w-[60%] gap-y-5'>
        <h1 className='font-semibold text-6xl'>PowerPulse</h1>
        <div className='max-w-md text-lg text-center'>
          Join PowerPulse to monitor every asset, coordinate field
          crews in real time and keep your power network running
          smoothly.
        </div>
      </div>
      <form
        className='flex flex-col justify-center items-center w-full gap-y-5'
        onSubmit={async event => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          await signIn("password", formData);
        }}>
        <div className='max-w-[30%] mb-10'>
          <Image
            className='object-cover'
            src={VeoLogo}
            alt='Veo Logo'
          />
        </div>
        <div className='flex flex-col gap-y-2 w-[60%]'>
          <Label htmlFor='email'>Email</Label>
          <div className='flex flex-row gap-x-2 items-center'>
            <UserRound className='w-4 h-4' />
            <Input name='email' placeholder='Email' type='text' />
          </div>
        </div>
        <div className='flex flex-col gap-y-2 w-[60%]'>
          <Label htmlFor='password'>Password</Label>
          <div className='flex flex-row gap-x-2 items-center'>
            <LockKeyhole className='w-4 h-4' />
            <Input
              name='password'
              placeholder='Password'
              type='password'
            />
          </div>
        </div>
        <input name='flow' type='hidden' value={step} />
        <Button className='cursor-pointer w-[60%]' type='submit'>
          {step === "signIn" ? "Log in" : "Sign up"}
        </Button>
        <div className='flex flex-wrap items-center'>
          Don't have an account?{" "}
          <Button
            variant='link'
            type='button'
            onClick={() => {
              setStep(step === "signIn" ? "signUp" : "signIn");
            }}>
            {step === "signIn"
              ? "Sign up instead"
              : "Sign in instead"}
          </Button>
        </div>
      </form>
    </div>
  );
}
