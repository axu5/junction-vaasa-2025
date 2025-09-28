import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

// Mock data from SCADA
const status: "ok" | "degraded" | "down" = "ok";
const uptime = 99.66;
const customers = [
  {
    name: "Vaasan Sähkö",
    status: "ok",
    uptime: 99.9,
  },
  {
    name: "City of Vaasa",
    status: "degraded",
    uptime: 97.5,
  },
  {
    name: "Fortum",
    status: "down",
    uptime: 92.3,
  },
];

export default function StatusPage() {
  return (
    <div className='mt-24 w-screen'>
      <h1 className='text-3xl font-bold mb-4 mx-auto w-full text-center'>
        Customer Status
      </h1>
      <div className='flex flex-col gap-y-4 px-4 md:px-12 lg:px-24'>
        <Card
          className={cn("rounded-sm", {
            "border-2 border-green-500 bg-green-200": status === "ok",
            "border-2 border-yellow-500 bg-yellow-300":
              status === "degraded",
            "border-2 border-red-500 bg-red-200": status === "down",
          })}>
          <CardHeader className='font-bold text-lg flex flex-row items-center gap-x-2'>
            {status === "ok" && <span>All Systems Operational</span>}
            {status === "degraded" && (
              <span>Degraded Performance</span>
            )}
            {status === "down" && <span>Partial Outage</span>}
          </CardHeader>
        </Card>
        <div className='font-semibold'>
          Uptime (last 90 days): {uptime}%
        </div>
      </div>
      {/* Heatmap of last 90 days for each customer, with data from SCADA */}
      <div className='mt-12 px-4 md:px-12 lg:px-24 grid grid-cols-[3fr_1fr_1fr_1fr]'>
        <div className='font-bold text-xl'>Customer</div>
        <div className='font-semibold text-center'>Status</div>
        <div className='font-semibold text-center'>Uptime</div>
        <div className='font-semibold text-center'>Last 90 Days</div>
        {customers
          .sort((a, b) => a.uptime - b.uptime)
          .map(customer => (
            <Fragment key={customer.name}>
              <div key={customer.name}>{customer.name}</div>
              <div
                className={cn("text-center font-bold", {
                  "text-green-600": customer.status === "ok",
                  "text-yellow-600": customer.status === "degraded",
                  "text-red-600": customer.status === "down",
                })}>
                {customer.status === "ok" && (
                  <Badge className='bg-green-700 rounded-full px-3'>
                    Operational
                  </Badge>
                )}
                {customer.status === "degraded" && (
                  <Badge className='bg-yellow-700 rounded-full px-3'>
                    Degraded
                  </Badge>
                )}
                {customer.status === "down" && (
                  <Badge className='bg-red-700 rounded-full px-3'>
                    Outage
                  </Badge>
                )}
              </div>
              <div className='text-center'>{customer.uptime}%</div>
              <div className='h-3 bg-gray-200 rounded-full overflow-hidden'>
                <div
                  className={cn("h-3 rounded-full", {
                    "bg-green-500": customer.status === "ok",
                    "bg-yellow-500": customer.status === "degraded",
                    "bg-red-500": customer.status === "down",
                  })}
                  style={{ width: `${customer.uptime}%` }}></div>
              </div>
            </Fragment>
          ))}
      </div>

      <Separator className='my-12' />

      <div className='mt-12 px-4 md:px-12 lg:px-24'>
        <h2 className='text-2xl font-semibold mb-4'>
          Incident History
        </h2>

        <div className='flex flex-col gap-y-4'>
          <div className='italic text-center'>
            No reported incidents in the last 90 days.
          </div>
        </div>
      </div>

      <div className='h-32' />
    </div>
  );
}
