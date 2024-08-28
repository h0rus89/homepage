import ical from 'ical';
import fetch from 'node-fetch';
import { Upcoming } from '@/components/upcoming';

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

  // Formatiere die Ereignisse für die Upcoming-Komponente
  const formattedEvents = events.map(event => ({
    date: new Date(event.start),
    title: event.summary,
    description: event.description,
    start: new Date(event.start),
    end: new Date(event.end)
  }));

  console.log(formattedEvents);
  
  return (
    <div>
      <h1 className="text-2xl font-bold">Kalender</h1>
      <div className="flex flex-col items-center justify-center">
        <Upcoming events={formattedEvents} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Alle Veranstaltungen</h2>
        <ul className="space-y-4">
          {formattedEvents.map((event, index) => (
            <li key={index} className="border p-4 rounded-md bg-white shadow-sm">
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-500 mt-2">
                Start: {event.start.toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
              <p className="text-sm text-gray-500">
                Ende: {event.end.toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}