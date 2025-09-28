import {
  AnimatedBarChart,
  AnimatedCounter,
  CircularProgress,
  CustomerChart,
  CustomerData,
  DashboardCard,
  DonutChart,
  IncidentData,
} from "@/components/dashboard";
import { Clock } from "lucide-react";

const incidentData: IncidentData[] = [
  { name: "Q1", value: 15, maintenance: 5 },
  { name: "Q2", value: 25, maintenance: 8 },
  { name: "Q3", value: 35, maintenance: 12 },
  { name: "Q4", value: 28, maintenance: 10 },
];

const customerData: CustomerData[] = [
  { name: "Customer A", downtime: 20, uptime: 180 },
  { name: "Customer B", downtime: 35, uptime: 165 },
  { name: "Customer C", downtime: 15, uptime: 185 },
  { name: "Customer D", downtime: 45, uptime: 155 },
  { name: "Customer E", downtime: 30, uptime: 170 },
  { name: "Customer F", downtime: 25, uptime: 175 },
  { name: "Customer G", downtime: 40, uptime: 160 },
  { name: "Customer H", downtime: 50, uptime: 150 },
  { name: "Customer I", downtime: 35, uptime: 165 },
  { name: "Customer J", downtime: 45, uptime: 155 },
  { name: "Customer K", downtime: 55, uptime: 145 },
  { name: "Customer L", downtime: 60, uptime: 140 },
];

export default function DashboardPage() {
  return (
    <div className='mt-24 w-screen'>
      <h1 className='text-3xl font-bold mx-auto w-full text-center mb-8'>
        Dashboard
      </h1>

      {/* Dashboard Grid */}
      <div className='mx-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-min max-w-screen'>
        {/* Incident Count */}
        <DashboardCard
          title='INCIDENT COUNT LAST 4Q'
          className='col-span-1 md:col-span-2 lg:col-span-2'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='flex items-center gap-2 text-sm'>
              <div className='w-3 h-3 bg-red-500 rounded-full'></div>
              <span className='text-gray-400'>Critical Issue</span>
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <div className='w-3 h-3 bg-green-500 rounded-full'></div>
              <span className='text-gray-400'>Maintenance</span>
            </div>
          </div>
          <AnimatedBarChart data={incidentData} title='Incidents' />
        </DashboardCard>

        {/* Total Uptime Rate */}
        <DashboardCard title='TOTAL UPTIME RATE'>
          <div className='flex flex-col items-center justify-center h-48'>
            <CircularProgress
              percentage={99}
              size={140}
              strokeWidth={12}
              color='#22c55e'
            />
            <div className='mt-4 text-center'>
              <div className='text-sm text-gray-400'>UPTIME</div>
            </div>
          </div>
        </DashboardCard>

        {/* Current Load/Capacity */}
        <DashboardCard title='CURRENT LOAD/ CAPACITY'>
          <div className='flex flex-col items-center justify-center h-48'>
            <div className='text-5xl font-bold text-foreground mb-4'>
              <AnimatedCounter value={45} />
            </div>
            <DonutChart current={45} total={100} color='#3b82f6' />
          </div>
        </DashboardCard>

        {/* Active Assets */}
        <DashboardCard
          title='ACTIVE ASSETS / TOTAL ASSETS'
          className='col-span-1'>
          <div className='flex flex-col items-center justify-center h-48'>
            <div className='text-4xl font-bold text-foreground mb-4'>
              <AnimatedCounter value={200} />
              <span className='text-2xl text-gray-400'>/ </span>
              <AnimatedCounter value={250} />
            </div>
            <DonutChart current={200} total={250} color='#06b6d4' />
          </div>
        </DashboardCard>

        {/* Average Service Time */}
        <DashboardCard title='AVERAGE SERVICE TIME'>
          <div className='flex flex-col items-center justify-center h-48'>
            <Clock className='w-12 h-12 text-teal-400 mb-4' />
            <div className='text-4xl font-bold text-foreground mb-2'>
              <AnimatedCounter value={23} /> mins
            </div>
            <div className='text-sm text-gray-400'>Response Time</div>
          </div>
        </DashboardCard>
      </div>

      <div className='h-32' />
    </div>
  );
}
