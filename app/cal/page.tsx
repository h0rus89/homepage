import { Upcoming } from '@/components/upcoming';

interface Event {
  uid: string;
  title: string;
  start: {
    date: number;
    time: number | null;
  };
  end: {
    date: number;
    time: number | null;
  };
}

async function fetchEvents(): Promise<Event[]> {
  const icsUrl = 'https://gas-wadern.de/iserv/public/calendar?key=93c3cb1233d2b766ac86aac74d27585e';
  const response = await fetch(icsUrl, { cache: 'no-store' });
  const icsData = await response.text();

  function parseICS(icsData: string): Record<string, any> {
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
            currentEvent.summary = value.replace(/\\,/g, ',');
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

  const parsedData = parseICS(icsData);

  const events: Event[] = Object.values(parsedData).map((event: any) => ({
    uid: event.uid,
    title: event.summary,
    start: {
      date: +event.start.split('T')[0],
      time: +event.start.split('T')[1] || null,
    },
    end: {
      date: +event.end.split('T')[0],
      time: +event.end.split('T')[1] || null,
    },
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