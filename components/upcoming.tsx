"use client"

import { useState, useEffect } from "react"
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


  useEffect(() => {
    console.log("Alle Veranstaltungen:", events);
  }, [events]);

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
                <p>{event.start.toISOString()}</p>
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
  const startIsFullDay = start.getHours() === 0 && start.getMinutes() === 0;
  const endIsFullDay = end.getHours() === 0 && end.getMinutes() === 0;
  const isSameDay = start.toDateString() === end.toDateString();

  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Europe/Berlin' };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' };

  if (startIsFullDay && endIsFullDay) {
    if (isSameDay) {
      return start.toLocaleDateString('de-DE', dateOptions);
    } else {
      return `${start.toLocaleDateString('de-DE', dateOptions)} - ${end.toLocaleDateString('de-DE', dateOptions)}`;
    }
  } else if (isSameDay) {
    const date = start.toLocaleDateString('de-DE', dateOptions);
    const startTime = start.toLocaleTimeString('de-DE', timeOptions);
    const endTime = end.toLocaleTimeString('de-DE', timeOptions);
    return `${date}, ${startTime} - ${endTime}`;
  } else {
    const startDateTime = start.toLocaleString('de-DE', {...dateOptions, ...timeOptions});
    const endDateTime = end.toLocaleString('de-DE', {...dateOptions, ...timeOptions});
    return `${startDateTime} - ${endDateTime}`;
  }
}
