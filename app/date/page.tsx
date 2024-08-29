import ical from 'ical';
import { ClientEvents } from '@/components/client';

interface ICalEvent {
    uid: string;
    summary: string;
    start: Date;
    end: Date;
  }

  interface FormattedEvent {
    uid: string;
    title: string;
    start: string;
    end: string;
  }

async function getEvents() {
    const icsUrl = 'https://gas-wadern.de/iserv/public/calendar?key=93c3cb1233d2b766ac86aac74d27585e';
    const response = await fetch(icsUrl, {next: {revalidate: 60 * 60 * 24}});
    const icsData = await response.text();
  
    // Parse the ICS data
    const parsedData = ical.parseICS(icsData);
  
    // Extrahiere und formatiere Ereignisse

    const events: FormattedEvent[] = Object.values(parsedData)
      .filter((event): event is ICalEvent => 
        typeof event === 'object' &&
        event !== null &&
        'uid' in event &&
        'summary' in event &&
        'start' in event &&
        'end' in event &&
        event.start instanceof Date &&
        event.end instanceof Date
      )
      .map((event: ICalEvent) => ({
        uid: event.uid,
        title: event.summary,
        start: event.start.toISOString(),
        end: event.end.toISOString(),
      }));
  
    return events.slice(0, 3);
  }

function listEvents(events: FormattedEvent[]) {
  return (
    <ul>
      {events.map((event) => (
        <li className="py-2" key={event.uid}>
          <p>{event.title}</p>
          <p>{event.start}</p>
          <p>{new Date(event.start).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit', timeZone: 'UTC'})}</p>
        </li>
      ))}
    </ul>
  );
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