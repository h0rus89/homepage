"use client"

import * as React from "react"
import useSWR from 'swr'
import ICAL from 'ical.js'

const ICS_URL = 'https://gas-wadern.de/iserv/public/calendar?key=93c3cb1233d2b766ac86aac74d27585e'

const fetcher = async (url: string) => {
  const res = await fetch(url, { mode: 'cors' })
  if (!res.ok) throw new Error('Failed to fetch ICS file')
  return res.text()
}

export default function Page() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const { data: icsData, error } = useSWR(ICS_URL, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const events = React.useMemo(() => {
    if (!icsData) return {}

    try {
      const jcalData = ICAL.parse(icsData)
      const comp = new ICAL.Component(jcalData)
      const vevents = comp.getAllSubcomponents("vevent")

      const eventMap: { [key: string]: boolean } = {}

      vevents.forEach((vevent) => {
        const event = new ICAL.Event(vevent)
        const startDate = event.startDate.toJSDate()
        const dateKey = startDate.toISOString().split('T')[0]
        eventMap[dateKey] = true
      })

      console.log('Parsed events:', eventMap) // Debugging log
      return eventMap
    } catch (err) {
      console.error('Error parsing ICS data:', err)
      return {}
    }
  }, [icsData])

  React.useEffect(() => {
    console.log('Current events state:', events) // Debugging log
  }, [events])

  if (error) return <div className="text-red-500">Failed to load calendar data: {error.message}</div>
  if (!icsData) return <div className="text-gray-500">Loading calendar data...</div>

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Debugging Info:</h3>
        <p>Total events: {Object.keys(events).length}</p>
        <p>Events for selected date: {date && events[date.toISOString().split('T')[0]] ? 'Yes' : 'No'}</p>
      </div>
    </div>
  )
}