import { Upcoming } from '@/components/upcoming';

interface ICSEvent {
  uid: string;
  title: string;
  start: string;
  end: string;
}

interface ISOEvent {
  uid: string;
  title: string;
  start: Date;
  end: Date;
}

async function fetchEvents(): Promise<ISOEvent[]> {
  const icsUrl = 'https://gas-wadern.de/iserv/public/calendar?key=93c3cb1233d2b766ac86aac74d27585e';
  const response = await fetch(icsUrl, { cache: 'no-store' });
  const icsData = await response.text();

  function parseICS(icsData: string): Record<string, any> {
    const lines = icsData.split('\n');
    const events: Record<string, any> = {};
    let currentEvent: Record<string, any> | null = null;

    for (let line of lines) {
      line = line.trim();

      if (line === 'BEGIN:VEVENT') {
        currentEvent = {};
      } else if (line === 'END:VEVENT' && currentEvent) {
        if (currentEvent.uid) {
          events[currentEvent.uid] = currentEvent;
        }
        currentEvent = null;
      } else if (currentEvent) {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':');

        switch (key) {
          case 'UID':
            currentEvent.uid = value;
            break;
          case 'SUMMARY':
            currentEvent.summary = value.replace(/\\,/g, ',');
            break;
          case 'DTSTART;VALUE=DATE':
            currentEvent.start = value;
            break;
          case 'DTEND;VALUE=DATE':
            currentEvent.end = value;
            break;
          case 'DTSTART;TZID=Europe/Berlin':
            currentEvent.start = value;
            break;
          case 'DTEND;TZID=Europe/Berlin':
            currentEvent.end = value;
            break;
        }
      }
    }
    return events;
  }

  const parsedData = parseICS(icsData);

  const events = Object.values(parsedData).map((event: any) => ({
    uid: event.uid,
    title: event.summary,
    start: convertToUTC(event.start),
    end: convertToUTC(event.end),
  }));


  return events;
}

function convertToUTC(dateString: string): Date {
  const berlinTimeZone = 'Europe/Berlin';
  const dateWithTime = /(\d{8})T(\d{6})/;
  const dateOnly = /(\d{8})/;

  let date: Date;

  if (dateWithTime.test(dateString)) {
    const [_, datePart, timePart] = dateString.match(dateWithTime) || [];
    const year = parseInt(datePart.slice(0, 4));
    const month = parseInt(datePart.slice(4, 6)) - 1;
    const day = parseInt(datePart.slice(6, 8));
    const hours = parseInt(timePart.slice(0, 2));
    const minutes = parseInt(timePart.slice(2, 4));
    const seconds = parseInt(timePart.slice(4, 6));

    date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
  } else if (dateOnly.test(dateString)) {
    const [_, datePart] = dateString.match(dateOnly) || [];
    const year = parseInt(datePart.slice(0, 4));
    const month = parseInt(datePart.slice(4, 6)) - 1;
    const day = parseInt(datePart.slice(6, 8));

    date = new Date(Date.UTC(year, month, day));
  } else {
    throw new Error('Invalid date string format');
  }

  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));

  return utcDate;
}

export default async function EventsPage() {
  const events = await fetchEvents();
  
  return (
    <div>
      <h1 className="text-2xl font-bold">Kalender</h1>
      <ul className="mt-4 space-y-2">
        {events.map((event) => (
          <li key={event.uid} className="p-2 bg-white rounded shadow">
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-600">
              {event.start.toLocaleString()} - {event.end.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              {event.start.toISOString()} - {event.end.toISOString()}
            </p>
          </li>
        ))}
      </ul>
      {/* <Upcoming events={events} /> */}
    </div>
  );
}