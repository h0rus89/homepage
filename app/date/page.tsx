function getServerDate() {
    return new Date("2024-08-29T05:02:10.111Z");
}

function getClientDate(date: Date) {
    "use client";
    return date;
}

export default async function EventsPage() {

    return(
        <>
            <h1>Server</h1>
            <p>{getServerDate().toISOString()}</p>
            <p>{getServerDate().toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' })}</p>
            
            <h1>Client</h1>
            <p>{getClientDate(getServerDate()).toISOString()}</p>
            <p>{getClientDate(getServerDate()).toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' })}</p>
        </>
    )
}