import ical from 'ical';
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
    title: event.summary,
    start: event.start ? event.start.toISOString() : '',
    end: event.end ? event.end.toISOString() : '',
  }));

  return events;
}

export default async function EventsPage() {
  const events = await fetchEvents();
  
  return (
    <div>
      <h1 className="text-2xl font-bold">Kalender</h1>
      
        <Upcoming events={events} />
      
    </div>
  );
}