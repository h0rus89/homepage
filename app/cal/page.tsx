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

  // Sortiere die Ereignisse nach Startdatum
  const sortedEvents = events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  // Formatiere die Ereignisse für die Upcoming-Komponente
  const formattedEvents = sortedEvents.map(event => ({
    date: new Date(event.start),
    title: event.summary,
    description: event.description,
    start: new Date(event.start),
    end: new Date(event.end)
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold">Kalender</h1>
      <div className="flex flex-col items-center justify-center">
        <Upcoming events={formattedEvents} />
      </div>
    </div>
  );
}