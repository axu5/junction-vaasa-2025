"use client";

import {
  Activity,
  Calendar,
  ChevronDown,
  Clock,
  Server,
  Users,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

// Type definitions
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

interface DonutChartProps {
  current: number;
  total: number;
  label?: string;
  color?: string;
}

export interface IncidentData {
  name: string;
  value: number;
  maintenance: number;
}

export interface CustomerData {
  name: string;
  downtime: number;
  uptime: number;
}

export interface AnimatedBarChartProps {
  data: IncidentData[];
  title: string;
}

interface CustomerChartProps {
  data: CustomerData[];
}

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  dropdown?: boolean;
}

// Animated Counter Component
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  suffix = "",
}) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number): void => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

// Circular Progress Component
export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = "#22c55e",
}) => {
  const [animatedPercentage, setAnimatedPercentage] =
    useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(
      () => setAnimatedPercentage(percentage),
      100
    );
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius: number = (size - strokeWidth) / 2;
  const circumference: number = radius * 2 * Math.PI;
  const offset: number =
    circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className='relative flex items-center justify-center'>
      <svg
        width={size}
        height={size}
        className='transform -rotate-90'>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke='#374151'
          strokeWidth={strokeWidth}
          fill='none'
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill='none'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
          style={{
            transition: "stroke-dashoffset 2s ease-in-out",
          }}
        />
      </svg>
      <div className='absolute text-3xl font-bold text-foreground'>
        <AnimatedCounter value={percentage} suffix='%' />
      </div>
    </div>
  );
};

// Donut Chart Component
export const DonutChart: React.FC<DonutChartProps> = ({
  current,
  total,
  label,
  color = "#3b82f6",
}) => {
  return (
    <div className='flex items-center justify-center relative'>
      <CircularProgress
        percentage={(current / total) * 100}
        size={100}
        strokeWidth={12}
        color={color}
      />
      {/* <div className='absolute text-center'>
        <div className='text-2xl font-bold text-foreground'>
          <AnimatedCounter value={current} />
        </div>
        <div className='text-xs text-gray-400'>of {total}</div>
      </div> */}
    </div>
  );
};

// Animated Bar Chart Component
export const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({
  data,
  title,
}) => {
  const [animatedData, setAnimatedData] = useState<IncidentData[]>(
    data.map(item => ({ ...item, value: 0, maintenance: 0 }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 300);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div className='h-48'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={animatedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis
            dataKey='name'
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <Bar
            dataKey='maintenance'
            stackId='a'
            fill='#ef4444'
            radius={[0, 0, 2, 2]}
            animationDuration={1500}
            animationBegin={0}
          />
          <Bar
            dataKey='value'
            stackId='a'
            fill='#22c55e'
            radius={[2, 2, 0, 0]}
            animationDuration={1500}
            animationBegin={300}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Customer Downtime Chart
export const CustomerChart: React.FC<CustomerChartProps> = ({
  data,
}) => {
  const [animatedData, setAnimatedData] = useState<CustomerData[]>(
    data.map(item => ({ ...item, downtime: 0, uptime: 0 }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div className=''>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={animatedData}
          margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
          <XAxis
            dataKey='name'
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 10 }}
            angle={-45}
            textAnchor='end'
            height={60}
          />
          <Bar
            dataKey='downtime'
            fill='#ef4444'
            animationDuration={1200}
          />
          <Bar
            dataKey='uptime'
            fill='#22c55e'
            animationDuration={1200}
            animationBegin={200}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  children,
  className = "",
  title,
  // dropdown = true,
}) => {
  return (
    <Card
      className={cn(
        "rounded-xl p-4 transition-all duration-300 hover:shadow-lg",
        className
      )}>
      {title && (
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-foreground font-medium text-sm uppercase tracking-wide'>
            {title}
          </h3>
          {/* {dropdown && (
            <ChevronDown className='w-4 h-4 text-gray-400' />
          )} */}
        </div>
      )}
      {children}
    </Card>
  );
};
