"use client";
import { Anchor, Title, Card, Grid, Breadcrumbs } from "@components/shared";
import { Button } from "@components/shared/client";
import { useBookings } from "@components/admin/reservations/BookingsProvider";
import { photoshootTypes } from "@lib/photoshoot";

export default function Booking({ params }: { params: { status: "pending" | "approved"; id: string } }) {
  const booking = useBookings(params.status).find((b) => b.id === parseInt(params.id))!;
  return (
    <>
      <Breadcrumbs>
        <Anchor href={"/admin/reservations"}>Reservations</Anchor>
        <Anchor href={`/admin/reservations/${params.status}`} className="capitalize">
          {params.status}
        </Anchor>
        <Anchor href={`/admin/reservations/${params.status}/${params.id}`}>{booking.id}</Anchor>
      </Breadcrumbs>
      <div className="flex ml-auto mb-16 mt-10 justify-between">
        <Title order={"h1"} className="text-3xl">
          {booking.date}
        </Title>
        <div className="flex gap-2">
          <Button intent="accept" className="h-fit">
            Send Email
          </Button>
          <Button intent="reject" className="h-fit">
            Cancel reservation
          </Button>
        </div>
      </div>
      <Card glow className="rounded-md mb-5">
        <Grid fullWidth>
          <div className="col-span-6 space-y-2">
            <Title order={"h2"}>Contact information</Title>

            <p>
              <span className="font-semibold">Name:</span> {booking.firstName} {booking.lastName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {booking.email}
            </p>
            <p>
              <span className="font-semibold">Phone number:</span> {booking.phone}
            </p>
          </div>
          <div className="col-span-6 space-y-2">
            <Title order={"h2"}>Reservations details</Title>
            <p>
              <span className="font-semibold">Photoshoot type:</span> {photoshootTypes.get(booking.type as any)?.label}
            </p>
            <p>
              <span className="font-semibold">Date:</span> 21/07/2022. {booking.time}
            </p>
            <strong className="inline-block">Selected features:</strong>
            <ul className="list-disc pl-4">
              <li>Decor</li>
              <li>Assistant</li>
              <li>Makeup</li>
            </ul>
          </div>
          <div className="col-span-6">
            <Title className="mb-5" order={"h2"}>
              Additional comments
            </Title>
            <p className="text-lg">{booking.description}</p>
          </div>
        </Grid>
      </Card>
      <div className="flex justify-between">
        <Button intent={"secondary"}>Previous</Button>
        <Button>Next</Button>
      </div>
    </>
  );
}