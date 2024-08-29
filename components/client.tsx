"use client"

interface Event {
    date?: Date;
    summary: string;
    description: string;
    start: Date;
    end: Date;
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

  export function ClientEvents({ events }: { events: Event[] }) {
    return (
        <div>
            {listEvents(events)}
        </div>
    )
  }