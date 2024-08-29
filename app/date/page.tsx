import ical from 'ical';
import { format, toZonedTime } from 'date-fns-tz';

async function fetchEvents() {
  const icsUrl = 'https://gas-wadern.de/iserv/public/calendar?key=93c3cb1233d2b766ac86aac74d27585e';
  const response = await fetch(icsUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
      'X-Forwarded-For': '85.214.132.117' // Eine deutsche IP-Adresse (Beispiel)
    } }, );
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
