"use client";
import { DatePicker as MantineDatePicker } from "@mantine/dates";
import type { DatePickerProps } from "@mantine/dates";

export function DatePicker({ ...props }: DatePickerProps) {
  return (
    <MantineDatePicker
      {...props}
      error={props.error ? "Please select a date." : undefined}
      classNames={{
        input: `border-gray-400 dark:text-gray-400 text-gray-600 font-sans dark:border-gray-700
         bg-zinc-100 dark:bg-zinc-700 rounded-md 
         aria-[invalid=true]:border-red-600 aria-[invalid=true]:dark:border-red-600 `,
        label: "text-gray-900 font-sans dark:text-gray-300 text-base",
        dropdown: "bg-white border-gray-400 dark:border-gray-700 dark:bg-zinc-800",
        day: `text-gray-900 disabled:text-gray-400 dark:disabled:text-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-zinc-600
        data-[outside=true]:text-gray-400 data-[outside=true]:hover:text-gray-700
        data-[outside=true]:dark:hover:text-gray-300 data-[outside=true]:dark:text-gray-500
        data-[weekend=true]:dark:text-red-500 data-[weekend=true]:text-red-600
        data-[selected=true]:text-white data-[selected=true]:dark:text-white`,
        weekday: "text-gray-500 dark:text-gray-400",
        month: "text-red-500 dark:text-gray-400",
        icon: "text-gray-700 dark:text-gray-100 stroke-gray-900",
        yearPickerControl: "hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-900 dark:text-gray-100",
        monthPickerControl: "hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-900 dark:text-gray-100",
        yearPickerControls: "text-rose-600 stroke-rose-600",
        calendarHeaderControl: "text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-600",
        calendarHeaderLevel: "text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-600",
        rightSection: "stroke-gray-900 dark:stroke-gray-400",
        required: "text-red-600 dark:text-red-500",
        error: "text-sm text-red-600 dark:text-red-500"
      }}
    />
  );
}
