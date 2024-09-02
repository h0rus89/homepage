import { NextRequest, NextResponse } from 'next/server'
import { fetchEvents } from '@/lib/events'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const start = searchParams.get('start')
  const end = searchParams.get('end')

  if (!start || !end) {
    return NextResponse.json({ error: 'Start and end dates are required' }, { status: 400 })
  }

  const events = await fetchEvents(new Date(start), new Date(end))
  return NextResponse.json(events)
}