"use client"

import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { isSameDay, isWithinInterval, subDays, endOfDay, startOfMonth, endOfMonth, addMonths, subMonths} from "date-fns"
import { toZonedTime, formatInTimeZone } from "date-fns-tz"
import { de } from "date-fns/locale"
import { Suspense } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

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

export function Upcoming({ initialEvents }: { initialEvents: Event[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const getMonthKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}`;
  const [loadedMonths, setLoadedMonths] = useState<Set<string>>(new Set([getMonthKey(new Date())]));

  useEffect(() => {
    if (month) {
      const prevMonth = subMonths(month, 1);
      const nextMonth = addMonths(month, 1);
      const monthKey = getMonthKey(month);
      const prevMonthKey = getMonthKey(prevMonth);
      const nextMonthKey = getMonthKey(nextMonth);
      
      if (!loadedMonths.has(monthKey)) {
        fetchEventsForMonth(month);
        console.log("fetch month")
      }

      if (!loadedMonths.has(nextMonthKey)) {
        fetchEventsForMonth(nextMonth);
        console.log("fetch next month")
      }

      if (!loadedMonths.has(prevMonthKey)) {
        fetchEventsForMonth(prevMonth);
        console.log("fetch prev month")
      }
    }
  }, [month]);

  const fetchEventsForMonth = async (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const response = await fetch(`/api/events?start=${start.toISOString()}&end=${end.toISOString()}`);
    const newEvents = await response.json();
    setEvents(oldEvents => [...oldEvents, ...newEvents]);
    setLoadedMonths(oldMonths => new Set(oldMonths).add(getMonthKey(date)));
  };

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

  function EventListSkeleton() {
    return (
      <ul className="space-y-4 flex-grow w-full sm:w-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="border p-4 rounded-md bg-white">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start justify-start mt-8">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        onMonthChange={setMonth}
        className="rounded-md border bg-white mx-auto sm:mx-0"
        modifiers={{ hasEvents }}
        modifiersClassNames={{
          hasEvents: "underline"
        }}
        locale={de}
      />
      
        {selectedEvents.length > 0 ? (
          <Suspense fallback={<EventListSkeleton />}>
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
          </Suspense>
        ) : (
          <EventListSkeleton />
        )}

    </div>
  )
}