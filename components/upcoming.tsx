"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { de } from "date-fns/locale"

type Event = {
  date: Date;
  title: string;
  description: string;
  start: Date;
  end: Date;
}

export function Upcoming({ events }: { events: Event[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const selectedEvents = events.filter(
    event => date && (
      (event.start <= date && event.end >= date) ||
      event.date.toDateString() === date.toDateString()
    )
  )

  // Funktion zum Überprüfen, ob ein Datum Ereignisse hat
  const hasEvents = (day: Date) => {
    return events.some(event => 
      (event.start <= day && event.end >= day) ||
      event.date.toDateString() === day.toDateString()
    )
  }

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border bg-white"
        modifiers={{ hasEvents }}
        modifiersStyles={{
          hasEvents: { textDecoration: "underline" }
        }}
        locale={de}
      />
      {selectedEvents.length > 0 && (
        <div className="mt-4">
          <ul className="space-y-4 mt-2">
            {selectedEvents.map((event, index) => (
              <li key={index} className="border p-4 rounded-md bg-white">
                <h4 className="font-bold">{event.title}</h4>
                <p>{event.description}</p>
                <p>{event.start.toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' })}</p>
                <p>{event.end.toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' })}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Client-Veranstaltungen</h2>
        <ul className="space-y-4">
          {events.slice(0, 5).map((event, index) => (
            <li key={index} className="border p-4 rounded-md bg-white shadow-sm">
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-500 mt-2">
                Start: {event.start.toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
              <p className="text-sm text-gray-500">
                Ende: {event.end.toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
