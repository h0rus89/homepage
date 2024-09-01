"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { isSameDay, isWithinInterval, subDays, endOfDay } from "date-fns"
import { toZonedTime, formatInTimeZone } from "date-fns-tz"
import { de } from "date-fns/locale"

interface Event {
  uid: string;
  title: string;
  start: Date;
  end: Date;
}

const timeZone = 'Europe/Berlin';

function formatEventDate(start: Date, end: Date): string {
  const startZoned = toZonedTime(start, timeZone);
  const endZoned = toZonedTime(end, timeZone);

  if (endZoned.getTime() - startZoned.getTime() === 24 * 60 * 60 * 1000 &&
      startZoned.getHours() === 0 &&
      startZoned.getMinutes() === 0) {
    return "ganztägig";
  }

  if (endZoned.getTime() - startZoned.getTime() > 24 * 60 * 60 * 1000 &&
      startZoned.getHours() === 0 &&
      startZoned.getMinutes() === 0) {
    return `${formatInTimeZone(startZoned, timeZone, 'dd.MM.yyyy', { locale: de })} - ${formatInTimeZone(subDays(endZoned, 1), timeZone, 'dd.MM.yyyy', { locale: de })}`;
  }

  if (isSameDay(startZoned, endZoned)) {
    return `${formatInTimeZone(startZoned, timeZone, 'dd.MM.yyyy HH:mm', { locale: de })} - ${formatInTimeZone(endZoned, timeZone, 'HH:mm', { locale: de })}`;
  }

  return `${formatInTimeZone(startZoned, timeZone, 'dd.MM.yyyy HH:mm', { locale: de })} - ${formatInTimeZone(endZoned, timeZone, 'dd.MM.yyyy HH:mm', { locale: de })}`;
}

export function Upcoming({ events }: { events: Event[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const selectedEvents = events.filter(event => {
    if (!date) return false;
    const zonedDate = toZonedTime(date, timeZone);
    const zonedStart = toZonedTime(event.start, timeZone);
    const zonedEnd = endOfDay(subDays(toZonedTime(event.end, timeZone), 1));
    return (
      isSameDay(zonedDate, zonedStart) ||
      isWithinInterval(zonedDate, { start: zonedStart, end: zonedEnd })
    );
  });

  const hasEvents = (day: Date) => events.some(event => {
    const zonedDay = toZonedTime(day, timeZone);
    const zonedStart = toZonedTime(event.start, timeZone);
    const zonedEnd = endOfDay(subDays(toZonedTime(event.end, timeZone), 1));
    
    return (
      isSameDay(zonedDay, zonedStart) ||
      isWithinInterval(zonedDay, { start: zonedStart, end: zonedEnd })
    );
  });

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
              <p className="text-sm text-gray-600">
                {formatEventDate(event.start, event.end)}
              </p>
            </li>
          ))}
        </ul> 
      )}
    </div>
  )
}
