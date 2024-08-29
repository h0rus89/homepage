import ical from 'ical';

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
  
    return events[0].start;
  }
  

function getServerDate() {
    const dat = fetchEvents();
    return dat;
}

function getClientDate(date: Date) {
    "use client";
    return date;
}

export default async function EventsPage() {

    return(
        <>
            <h1>Server</h1>
            <p>{(await getServerDate()).toISOString()}</p>
            <p>{(await getServerDate()).toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' })}</p>
            
            <h1>Client</h1>
            <p>{getClientDate(await getServerDate()).toISOString()}</p>
            <p>{getClientDate(await getServerDate()).toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' })}</p>
        </>
    )
}