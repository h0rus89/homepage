"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { de } from "date-fns/locale"

interface Event {
  uid: string;
  title: string;
  start: {
    date: number;
    time: number | null;
  };
  end: {
    date: number;
    time: number | null;
  };
}

function formatDate(startdate: number, starttime: number | null, enddate: number, endtime: number | null) {
  return(
    `${startdate} - ${enddate}`
  )
}


export function Upcoming({ events }: { events: Event[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const selectedEvents = events.filter(event => {

    const selectedDate = +date!.toISOString().slice(0, 10).replace(/[-]/g, '')+1;

    return (
      event.start.date === selectedDate ||
      (event.start.date < selectedDate && event.end.date > selectedDate)
    );
  });

  const hasEvents = (day: Date) => events.some(event => {

    const selectedDay = +day.toISOString().slice(0, 10).replace(/[-]/g, '')+1;
    
    return (
      event.start.date === selectedDay ||
      (event.start.date < selectedDay && event.end.date > selectedDay)
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
          <p>Local: {date?.toLocaleString()}</p>
          <p>ISO: {date!.toISOString()}</p>
          <p>UTC: {date!.toUTCString()}</p>
          {selectedEvents.map((event, index) => (
            <li key={index} className="border p-4 rounded-md bg-white">
              <h4 className="font-bold">{event.title}</h4>
              {formatDate(event.start.date, event.start.time, event.end.date, event.end.time)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}