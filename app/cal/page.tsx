import { Upcoming } from '@/components/upcoming';
import { fetchEvents } from '@/lib/events';
import { startOfMonth, endOfMonth } from 'date-fns';

export default async function EventsPage() {
  const currentDate = new Date();
  const initialEvents = await fetchEvents(startOfMonth(currentDate), endOfMonth(currentDate));
  
  return (
    <div>
      <h1 className="text-2xl font-bold">Kalender</h1>
      <Upcoming initialEvents={initialEvents} />
    </div>
  );
}