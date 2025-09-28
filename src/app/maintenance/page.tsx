import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MaintenancePage() {
  const dateString = new Date().toISOString().split("T")[0];

  return (
    <div className='mt-24 w-screen'>
      <h1 className='text-3xl font-bold mb-4 mx-auto w-full text-center'>
        Maintenance
      </h1>

      <h2 className='text-2xl px-4 md:px-12 lg:px-24 font-semibold mt-8 mb-4'>
        Critical • Requires immediate attention
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-12 lg:px-24'>
        <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
          <CardHeader className='font-semibold text-lg flex flex-row items-center gap-x-2'>
            <span>Site 67</span>{" "}
            <Badge className='bg-red-700 rounded-full px-3'>
              Critical Failure
            </Badge>
          </CardHeader>
          <CardContent>No scheduled maintenance.</CardContent>
          <CardFooter>
            <Link
              href='/dashboard'
              className={cn(
                "w-full",
                buttonVariants({ variant: "outline" })
              )}>
              Schedule maintenance now
            </Link>
          </CardFooter>
        </Card>
      </div>

      <h2 className='text-2xl px-4 md:px-12 lg:px-24 font-semibold mt-8 mb-4'>
        Active
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-12 lg:px-24'>
        <Card>
          <CardHeader className='font-semibold text-lg flex flex-row items-center gap-x-2'>
            <span>Site 12</span>{" "}
            <Badge className='bg-green-700 rounded-full px-3'>
              In progress
            </Badge>
          </CardHeader>
          <CardContent>
            Scheduled maintenance on {dateString}. Expected downtime:
            2 hours.
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full cursor-pointer'>
                  View active crew
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Active crew</DialogTitle>
                <div className='flex flex-col gap-y-2 mt-4'>
                  <div>
                    Brian Johnston <Badge>Supervisor</Badge>
                  </div>
                  <div>Elon Musk</div>
                  <div>Jeff Bezos</div>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
          <CardHeader className='font-semibold text-lg flex flex-row items-center gap-x-2'>
            <span>Site 15</span>{" "}
            <Badge className='bg-green-700 rounded-full px-3'>
              In progress
            </Badge>
          </CardHeader>
          <CardContent>
            Scheduled maintenance on {dateString}. Expected downtime:
            2 hours.
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full cursor-pointer'>
                  View active crew
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Active crew</DialogTitle>
                <div className='flex flex-col gap-y-2 mt-4'>
                  <div>
                    Brian Johnston <Badge>Supervisor</Badge>
                  </div>
                  <div>Elon Musk</div>
                  <div>Jeff Bezos</div>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
          <CardHeader className='font-semibold text-lg flex flex-row items-center gap-x-2'>
            <span>Site 17</span>{" "}
            <Badge className='bg-green-700 rounded-full px-3'>
              In progress
            </Badge>
          </CardHeader>
          <CardContent>
            Scheduled maintenance on {dateString}. Expected downtime:
            2 hours.
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full cursor-pointer'>
                  View active crew
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Active crew</DialogTitle>
                <div className='flex flex-col gap-y-2 mt-4'>
                  <div>
                    Brian Johnston <Badge>Supervisor</Badge>
                  </div>
                  <div>Elon Musk</div>
                  <div>Jeff Bezos</div>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
          <CardHeader className='font-semibold text-lg flex flex-row items-center gap-x-2'>
            <span>Site 67</span>{" "}
            <Badge className='bg-yellow-600 rounded-full px-3'>
              Scheduled
            </Badge>
          </CardHeader>
          <CardContent>
            Scheduled maintenance on {dateString}. Expected downtime:
            2 hours.
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full cursor-pointer'>
                  View active crew
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Active crew</DialogTitle>
                <div className='flex flex-col gap-y-2 mt-4'>
                  <div className='italic w-full text-center'>
                    No crew on site
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>

      <h2 className='text-2xl px-4 md:px-12 lg:px-24 font-semibold mt-8 mb-4'>
        No maintenance scheduled
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-12 lg:px-24'>
        <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
          <CardHeader className='font-semibold text-lg flex flex-row items-center gap-x-2'>
            <span>Site 100</span>{" "}
            <Badge className='bg-blue-500 rounded-full px-3'>
              Operational
            </Badge>
          </CardHeader>
          <CardContent>No scheduled maintenance.</CardContent>
          <CardFooter>
            <Link
              href='/dashboard'
              className={cn(
                "w-full",
                buttonVariants({ variant: "outline" })
              )}>
              Schedule maintenance now
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className='h-32' />
    </div>
  );
}
