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