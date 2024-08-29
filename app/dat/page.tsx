function getServerDate() {
    return new Date();
}

function getClientDate() {
    "use client";
    return new Date();
}

export default async function EventsPage() {

    return(
        <>
            <h1>Server</h1>
            <p>{getServerDate().toISOString()}</p>
            <p>{getServerDate().toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' })}</p>
            
            <h1>Client</h1>
            <p>{getClientDate().toISOString()}</p>
            <p>{getClientDate().toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' })}</p>
        </>
    )
}