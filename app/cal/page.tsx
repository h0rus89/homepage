import { Upcoming } from '@/components/upcoming';
import { fromZonedTime } from "date-fns-tz"

interface Event {
  uid: string;
  title: string;
  start: Date;
  end: Date;
}

async function fetchEvents(): Promise<Event[]> {
  
  // Fetch the ICS data
  const icsUrl = 'https://gas-wadern.de/iserv/public/calendar?key=93c3cb1233d2b766ac86aac74d27585e';
  const response = await fetch(icsUrl, { next: { revalidate: 86400 } });
  const icsData = await response.text();

  // Function to parse the ICS data
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

  // Parse the ICS data
  const parsedData = parseICS(icsData);


  // Convert the parsed data into an array of events
  const events: Event[] = Object.values(parsedData).map((event: any) => ({
    uid: event.uid,
    title: event.summary,
    start: fromZonedTime(createDateObject(event.start), 'Europe/Berlin'),
    end: fromZonedTime(createDateObject(event.end), 'Europe/Berlin'),
  }));

  return events;
}


// Helper function to create a Date object from the date string
function createDateObject(dateString: string) {
  let formattedString;

  if (dateString.length === 15) {
      // Format "20240904T171500" to "YYYY-MM-DDTHH:MM:SS"
      formattedString = dateString.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6');
  } else if (dateString.length === 8) {
      // Format "20240904" to "YYYY-MM-DD"
      formattedString = dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
  } else {
      throw new Error("Invalid date string format");
  }

  // Create the Date object
  const dateObject = new Date(formattedString);

  return dateObject;
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