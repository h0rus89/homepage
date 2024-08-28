import ical from 'ical';
import fetch from 'node-fetch';

async function fetchEvents() {
  const icsUrl = 'https://gas-wadern.de/iserv/public/calendar?key=93c3cb1233d2b766ac86aac74d27585e';
  const response = await fetch(icsUrl, {next: {revalidate: 60 * 60 * 24}});
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

  // Filtere Ereignisse, die älter als heute sind
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredEvents = events.filter((event) => {
    const eventStart = new Date(event.start);
    return eventStart >= today;
  });

  return filteredEvents;
}

export default async function EventsPage() {
  const events = await fetchEvents();

  // Sortiere die Ereignisse nach Startdatum
  const sortedEvents = events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  return (
    <div>
      <h1 className="text-2xl font-bold">Events</h1>
      <ul className="space-y-4 mt-8">
        {sortedEvents.map((event, index) => (
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