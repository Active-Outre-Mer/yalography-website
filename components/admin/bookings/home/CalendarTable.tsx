"use client";
import { usePagination } from "@lib/hooks/usePagination";
import { Pagination } from "@components/shared/Pagination";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";

import type { SerializedBooking } from "@lib/prisma";

const Table = dynamic(() => import("@components/shared/Table").then(({ Table }) => Table), { ssr: false });

type PropTypes = {
  todaysBookings: SerializedBooking[];
  date: Date | null;
};

export function CalendarTable({ todaysBookings, date }: PropTypes) {
  const { paginatedList, ...props } = usePagination(5, todaysBookings);

  useEffect(() => {
    props.onPageChange(1);
  }, [date]);

  return (
    <div className="space-y-2 basis-3/4 w-full">
      <Table striped className="h-3/4">
        <thead className="border-b border-zinc-200  dark:border-zinc-700">
          <tr>
            <th className="border-r border-zinc-200 dark:border-zinc-700">Name</th>
            <th className="border-r border-zinc-200 dark:border-zinc-700">Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedList.map((booking, key) => {
            return (
              <tr key={key}>
                <td className="border-r border-zinc-200 dark:border-zinc-700">
                  {booking.firstName} {booking.lastName}
                </td>
                <td className="border-r capitalize border-zinc-200 dark:border-zinc-700">{booking.type}</td>
                <td className="capitalize">{booking.status}</td>
                <td>
                  <Link
                    href={`/admin/bookings/${booking.status}/${booking.id}`}
                    className="text-yellow-600 dark:text-yellow-500"
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination {...props} />
    </div>
  );
}
