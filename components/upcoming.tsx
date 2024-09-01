"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { de } from "date-fns/locale"
import { isSameDay, endOfDay, startOfDay, differenceInDays, differenceInMinutes } from "date-fns"

const timezone = "Europe/Berlin"

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
      (event.start < startOfDay(date!) && event.end > endOfDay(date!))
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

  const isFullDay = differenceInMinutes(end, start) === 24 * 60 && (start.getHours() === 2 && end.getHours() === 2 || start.getHours() === 1 && end.getHours() === 1);

  const isSameDay = differenceInDays(end, start) === 0;

  const isMultiDay = differenceInDays(end, start) > 1 && (start.getHours() === 2 && end.getHours() === 2 || start.getHours() === 1 && end.getHours() === 1);

  if (isFullDay) {
    return (
      <p>ganztägig</p>
    );
  }

  if (isSameDay) {
    return (
      <p>{start.toLocaleTimeString('de-DE', { timeStyle: 'short', timeZone: timezone })} - {end.toLocaleTimeString('de-DE', { timeStyle: 'short', timeZone: timezone })}</p>
    );
  }

  if (isMultiDay) {
    const adjustedEnd = new Date(end);
    adjustedEnd.setDate(adjustedEnd.getDate() - 1);
    return (
      <p>{start.toLocaleDateString('de-DE', { dateStyle: 'short', timeZone: timezone })} - {adjustedEnd.toLocaleDateString('de-DE', { dateStyle: 'short', timeZone: timezone })}</p>
    );
  }

  return (
    <>
      <p>{start.toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short', timeZone: timezone })} - {end.toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short', timeZone: timezone })}</p>
    </>
  );
}