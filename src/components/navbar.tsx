"use client";

import Link from "next/link";
import Image from "next/image";
import VeoLogo from "@/../public/veo.png";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const currentPage = usePathname();
  console.log(currentPage);

  return (
    <header className='w-screen fixed border border-x-0 border-t-0 border-b-accent top-0 left-0 h-16 bg-background/50 backdrop-blur-md z-50'>
      <div className='flex flex-row justify-center lg:justify-start items-center h-full px-4 md:px-8 lg:px-12'>
        <Link href='/' className='hidden lg:block font-bold text-lg'>
          <div className='flex flex-col items-end'>
            PowerPulse
            <Image src={VeoLogo} alt={"Veo logo"} height={6} />
          </div>
        </Link>
        <div className='hidden lg:flex lg:flex-1' />
        <nav className='flex flex-row items-center gap-4'>
          <Link
            href='/'
            className={cn("text-sm font-medium hover:underline", {
              underline: currentPage === "/",
            })}>
            Map
          </Link>
          <Link
            href='/dashboard'
            className={cn("text-sm font-medium hover:underline", {
              underline: currentPage === "/dashboard",
            })}>
            Dashboard
          </Link>
          <Link
            href='/status'
            className={cn("text-sm font-medium hover:underline", {
              underline: currentPage === "/status",
            })}>
            Status
          </Link>
          <Link
            href='/maintenance'
            className={cn("text-sm font-medium hover:underline", {
              underline: currentPage === "/maintenance",
            })}>
            Maintenance
          </Link>
        </nav>
      </div>
    </header>
  );
}
