  import { Upcoming } from '@/components/upcoming';

async function fetchEvents() {
  const icsUrl = 'https://gas-wadern.de/iserv/public/calendar?key=93c3cb1233d2b766ac86aac74d27585e';
  const response = await fetch(icsUrl, { cache: 'no-store' });
  const icsData = await response.text();


  // Funktion zum Parsen der ICS-Daten
  function parseICS(icsData: string) {
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
            currentEvent.summary = value;
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

  // Parse die ICS-Daten
  const parsedData = parseICS(icsData);
  console.log(parsedData);


  // Extrahiere und formatiere Ereignisse
  const events = Object.values(parsedData).map((event: any) => ({
    uid: event.uid,
    title: event.summary,
    start: event.start,
    end: event.end,
  }));

  return events;
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
                {event.start} - {event.end}
              </p>
            </li>
          ))}
        </ul>
        {/* <Upcoming events={events} /> */}
      
    </div>
  );
}