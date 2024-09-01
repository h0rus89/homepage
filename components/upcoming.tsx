"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import moment from "moment-timezone";
import { de } from "date-fns/locale"

interface Event {
  uid: string;
  title: string;
  start: Date;
  end: Date;
}

function formatEventDate(start: Date, end: Date): string {
  const startMoment = moment(start).tz('Europe/Berlin');
  const endMoment = moment(end).tz('Europe/Berlin');
  
  if (endMoment.diff(startMoment, 'hours') === 24 && 
      startMoment.hour() === 0 && 
      startMoment.minute() === 0) {
    return "ganztägig";
  }

  if (endMoment.diff(startMoment, 'hours') > 24 && 
      startMoment.hour() === 0 && 
      startMoment.minute() === 0) {
    return `${startMoment.format('DD.MM.YYYY')} - ${endMoment.subtract(1, 'day').format('DD.MM.YYYY')}`;
  }
  
  if (startMoment.isSame(endMoment, 'day')) {
    return `${startMoment.format('DD.MM.YYYY HH:mm')} - ${endMoment.format('HH:mm')}`;
  }
  
  return `${startMoment.format('DD.MM.YYYY HH:mm')} - ${endMoment.format('DD.MM.YYYY HH:mm')}`;
}

export function Upcoming({ events }: { events: Event[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const selectedEvents = events.filter(event => {
    if (!date) return false;
    const momentDate = moment(date);
    const momentStart = moment(event.start);
    const momentEnd = moment(event.end).subtract(1, 'day').endOf('day');
    return (
      momentDate.isSame(momentStart, 'day') ||
      momentDate.isBetween(momentStart, momentEnd, 'day', '[]')
    );
  });

  const hasEvents = (day: Date) => events.some(event => {
    const momentDay = moment(day).tz('Europe/Berlin');
    const momentStart = moment(event.start).tz('Europe/Berlin');
    const momentEnd = moment(event.end).tz('Europe/Berlin').subtract(1, 'day').endOf('day');
    
    return ( 
      momentDay.isSame(momentStart, 'day') ||
      momentDay.isBetween(momentStart, momentEnd, 'day', '[]')
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