import ical from 'ical';
import fetch from 'node-fetch';

async function fetchEvents() {
  const icsUrl = 'https://gas-wadern.de/iserv/public/calendar?key=93c3cb1233d2b766ac86aac74d27585e';
  const response = await fetch(icsUrl);
  const icsData = await response.text();

  // Parse the ICS data
  const parsedData = ical.parseICS(icsData);

  // Extrahiere und formatiere Ereignisse
  const events = Object.values(parsedData).map((event: any) => ({
    uid: event.uid,
    summary: event.summary,
    description: event.description,
    location: event.location,
    start: event.start,
    end: event.end,
    organizer: event.organizer,
  }));

  return events;
}

export default async function EventsPage() {
  const events = await fetchEvents();

  return (
    <div>
      <h1 className="text-2xl font-bold">Events</h1>
      <ul className="space-y-4 mt-8">
        {events.map((event, index) => (
          <li key={index}>
            <h2>{event.summary}</h2>
            <p>{event.description}</p>
            <p>Location: {event.location}</p>
            <p>
              Start: {new Date(event.start).toLocaleString()}
              <br />
              End: {new Date(event.end).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}