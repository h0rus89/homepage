"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { de } from "date-fns/locale"

interface Event {
  uid: string,
  title: string;
  start: Date;
  end: Date;
}

export function Upcoming({ events }: { events: Event[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const selectedEvents = events.filter(event => {
    if (!date) return false;
    return (event.start <= date && event.end >= date)
  })

  const hasEvents = (day: Date) => events.some(event => 
    event.start <= day && event.end >= day
  )

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border bg-white"
        modifiers={{ hasEvents }}
        modifiersClassNames={{
          hasEvents: "underline"
        }}
        locale={de}
      />
      {selectedEvents.length > 0 && (
        <ul className="space-y-4 mt-4">
          {selectedEvents.map((event, index) => (
            <li key={index} className="border p-4 rounded-md bg-white">
              <h4 className="font-bold">{event.title}</h4>
              <p>{event.start.toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short', timeZone: 'UTC' })}</p>
              <p>{event.end.toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short', timeZone: 'UTC' })}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
