"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { de } from "date-fns/locale"
import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

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
                <p>
                  {formatEventDateRange(event.start, event.end)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function formatEventDateRange(start: Date, end: Date): string {
  const timeZone = 'Europe/Berlin'
  const zonedStart = utcToZonedTime(start, timeZone)
  const zonedEnd = utcToZonedTime(end, timeZone)

  const startIsFullDay = zonedStart.getHours() === 0 && zonedStart.getMinutes() === 0
  const endIsFullDay = zonedEnd.getHours() === 0 && zonedEnd.getMinutes() === 0
  const isSameDay = format(zonedStart, 'yyyy-MM-dd') === format(zonedEnd, 'yyyy-MM-dd')

  if (startIsFullDay && endIsFullDay) {
    if (isSameDay) {
      return format(zonedStart, 'dd.MM.yyyy', { locale: de })
    } else {
      return `${format(zonedStart, 'dd.MM.yyyy', { locale: de })} - ${format(zonedEnd, 'dd.MM.yyyy', { locale: de })}`
    }
  } else if (isSameDay) {
    return `${format(zonedStart, 'dd.MM.yyyy, HH:mm', { locale: de })} - ${format(zonedEnd, 'HH:mm', { locale: de })}`
  } else {
    return `${format(zonedStart, 'dd.MM.yyyy, HH:mm', { locale: de })} - ${format(zonedEnd, 'dd.MM.yyyy, HH:mm', { locale: de })}`
  }
}
