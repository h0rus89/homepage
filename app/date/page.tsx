import ical from 'ical';
import { ClientEvents } from '@/components/client';

async function getEvents() {
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
  
    return events.slice(0, 3);
  }

function listEvents(events: any) {
    return events.map((event: any) => (
        <ul>
        <li key={event.uid}>
            <p>{event.summary}</p>
            <p>{event.start.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit' })}</p>
        </li>
        </ul>
    ));
}
  
export default async function Events() {

    const events = await getEvents();

    return(
        <>
            <h1 className="text-2xl font-bold">Server</h1>
            {listEvents(events)}
            <h1 className="text-2xl font-bold mt-4">Client</h1>
            <ClientEvents events={events} />
        </>
    )
}