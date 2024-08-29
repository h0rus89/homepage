"use client"

interface Event {
    uid: string;
    title: string;
    start: string;
    end: string;
  }

  function listEvents(events: any) {
    return events.map((event: any) => (
        <ul>
        <li className="py-2" key={event.uid}>
            <p>{event.title}</p>
            <p>{event.start}</p>
            <p>{new Date(event.start).toLocaleString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin'})}</p>
        </li>
        </ul>
    ));
}

  export function ClientEvents({ events }: { events: Event[] }) {
    return (
        <div>
            {listEvents(events)}
        </div>
    )
  }