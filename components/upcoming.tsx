"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { de } from "date-fns/locale"
import { isSameDay, endOfDay, startOfDay, differenceInDays, differenceInMinutes, differenceInMilliseconds } from "date-fns"

interface Event {
  uid: string,
  title: string;
  start: Date;
  end: Date;
}

export function Upcoming({ events }: { events: Event[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const selectedEvents = events.filter(event => {
  return (
    isSameDay(event.start, date!) ||
    (event.start < startOfDay(date!) && event.end > startOfDay(date!))
  );
  });

  const hasEvents = (day: Date) => events.some(event => {
  return (
    isSameDay(event.start, day) ||
    (event.start < startOfDay(day) && event.end > endOfDay(day))
  );
  })

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start justify-start mt-8">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border bg-white mx-auto sm:mx-0"
        modifiers={{ hasEvents }}
        modifiersClassNames={{
          hasEvents: "underline"
        }}
        locale={de}
      />
      {selectedEvents.length > 0 && (
        <ul className="space-y-4 flex-grow w-full sm:w-auto">
          {selectedEvents.map((event, index) => (
            <li key={index} className="border p-4 rounded-md bg-white">
              <h4 className="font-bold">{event.title}</h4>
              {formatDateTimeRange(event.start, event.end)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function formatDateTimeRange(start: Date, end: Date): React.ReactNode {

  const isFullDay = differenceInMinutes(end, start) === 24 * 60 && start.getHours() === 2 && end.getHours() === 2;

  const isSameDay = differenceInDays(end, start) === 0;

  const isMultiDay = differenceInDays(end, start) > 1 && start.getHours() === 2 && end.getHours() === 2;

  if (isFullDay) {
    return (
      <p>{start.toLocaleString('de-DE', { dateStyle: 'short', timeZone: 'UTC' })}</p>
    );
  }

  if (isSameDay) {
    return (
      <p>{start.toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short', timeZone: 'UTC' })} - {end.toLocaleTimeString('de-DE', { timeStyle: 'short', timeZone: 'UTC' })}</p>
    );
  }

  if (isMultiDay) {
    return (
      <p>{start.toLocaleDateString('de-DE', { dateStyle: 'short', timeZone: 'UTC' })} - {end.toLocaleDateString('de-DE', { dateStyle: 'short',timeZone: 'UTC' })}</p>
    );
  }

  return (
    <>
      <p>{start.toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short', timeZone: 'UTC' })} - {end.toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short', timeZone: 'UTC' })}</p>
    </>
  );
}