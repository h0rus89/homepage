import ical from 'ical';
import { format, toZonedTime } from 'date-fns-tz';

async function fetchEvents() {
  const icsUrl = 'https://gas-wadern.de/iserv/public/calendar?key=93c3cb1233d2b766ac86aac74d27585e';
  const response = await fetch(icsUrl, { next: { revalidate: 60 * 60 * 24 } });
  const icsData = await response.text();

  // Parse the ICS data
  const parsedData = ical.parseICS(icsData);

  const events = Object.values(parsedData)
    .filter((event: any) => event.type === 'VEVENT')
    .map((event: any) => {
      const timeZone = 'Europe/Berlin';
      const start = toZonedTime(event.start, timeZone);
      const end = toZonedTime(event.end, timeZone);

      return {
        uid: event.uid,
        title: event.summary,
        start: format(start, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone }),
        end: format(end, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone }),
      };
    });

  return events.slice(5, 10);
}

function listEvents(events: Array<{ uid: string; title: string; start: string; end: string }>) {
  return events.map((event) => (
    <div key={event.uid} className="mb-4 p-4 bg-white rounded-md shadow-sm">
      <h3 className="text-lg font-semibold">{event.title}</h3>
      <p className="text-sm text-gray-600">
        {event.start} <br />
        {event.end}
      </p>
    </div>
  ));
}

export default async function EventsPage() {
  const events = await fetchEvents();

  return (
    <div>
      <h1 className="text-2xl font-bold">Server</h1>

      {events.map((event) => (
        <div key={event.uid} className="mb-4 p-4 bg-white rounded-md shadow-sm">
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-sm text-gray-600">
            {event.start}<br />
            {event.end}
          </p>
        </div>
      ))}

      <h1 className="text-2xl font-bold">Client</h1>
      {listEvents(events)}
    </div>
  );
}
