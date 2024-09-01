"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { isSameDay, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { de } from "date-fns/locale"


interface Event {
  uid: string;
  title: string;
  start: Date;
  end: Date;
}


export function Upcoming({ events }: { events: Event[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const selectedEvents = events.filter(event => {
    if (!date) return false;
    return (
      isSameDay(event.start, date) ||
      isWithinInterval(date, { start: startOfDay(event.start), end: endOfDay(new Date(event.end.getTime() - 86400000)) })
    );
  });

  const hasEvents = (day: Date) => events.some(event => {
    
    return ( 
      isSameDay(event.start, day) ||
      isWithinInterval(day, { start: startOfDay(event.start), end: endOfDay(new Date(event.end.getTime() - 86400000)) })
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
                Von: {event.start.toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' })}
              </p>
              <p className="text-sm text-gray-600">
                Bis: {event.end.toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' })}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}