import dayjs from "dayjs"
import { dateFormmter } from './dates.lib'

export function transformEvent (event) {
  if (event.publishedAt) {
    event.publishedAt = dateFormmter(event.publishedAt, 'YYYY-MM-DD hh:mm')
  }

  if (event.openAt) {
    event.openAt = dateFormmter(event.openAt)
  }

  if (event.closedAt) {
    event.closedAt = dateFormmter(event.closedAt)
  }

  event.isDeleting = false
  return event
}

export function transformMultiEvent (events) {
  return new Promise((resolve, reject) => {
    try {
      const transformed = events.reduce((transformedEvents, event) => {
        event = transformEvent(event)
        transformedEvents.push(event)
        return transformedEvents
      }, [])
      resolve(transformed)
    } catch (e) {
      reject(e)
    }
  }, [])
}

export function generateEventDurationObject (drStatus, date) {
  return {
    date: dayjs(date).format('YYYY-MM-DD'),
    status: drStatus,
    days: !date ? 0 : dayjs(new Date()).diff(date, 'day')
  }
}

export function generateEventDate (publishedAt, modifiedAt) {
  const dates = {}
  if (publishedAt) {
    dates.publishedAt = dayjs(publishedAt).format('YYYY-MM-DD hh:mm')
  }
  if (modifiedAt) {
    dates.modifiedAt = dayjs(modifiedAt).format('YYYY-MM-DD hh:mm')
  }
  return dates
}
