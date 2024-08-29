"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { de } from "date-fns/locale"
import { isSameDay, endOfDay, startOfDay, differenceInDays, differenceInMinutes } from "date-fns"

interface Event {
  uid: string,
  title: string;
  start: string; // Geändert zu string für ISO-Format
  end: string; // Geändert zu string für ISO-Format
}

export function Upcoming({ events }: { events: Event[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const selectedEvents = events.filter(event => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    return (
      isSameDay(eventStart, date!) ||
      (eventStart < startOfDay(date!) && eventEnd > startOfDay(date!))
    );
  });

  const hasEvents = (day: Date) => events.some(event => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    return (
      isSameDay(eventStart, day) ||
      (eventStart < startOfDay(day) && eventEnd > endOfDay(day))
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

function formatDateTimeRange(start: string, end: string): React.ReactNode {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const isFullDay = differenceInMinutes(endDate, startDate) === 24 * 60 && startDate.getUTCHours() === 22 && endDate.getUTCHours() === 22;

  const isSameDay = differenceInDays(endDate, startDate) === 0;

  const isMultiDay = differenceInDays(endDate, startDate) > 1 && startDate.getUTCHours() === 22 && endDate.getUTCHours() === 22;

  if (isFullDay) {
    return (
      <p>ganztags</p>
    );
  }

  if (isSameDay) {
    return (
      <p>{startDate.toLocaleTimeString('de-DE', { timeStyle: 'short', timeZone: 'Europe/Berlin' })} - {endDate.toLocaleTimeString('de-DE', { timeStyle: 'short', timeZone: 'Europe/Berlin' })}</p>
    );
  }

  if (isMultiDay) {
    return (
      <p>{startDate.toLocaleDateString('de-DE', { dateStyle: 'short', timeZone: 'Europe/Berlin' })} - {new Date(endDate.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString('de-DE', { dateStyle: 'short', timeZone: 'Europe/Berlin' })}</p>
    );
  }

  return (
    <p>{startDate.toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Europe/Berlin' })} - {endDate.toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Europe/Berlin' })}</p>
  );
}
