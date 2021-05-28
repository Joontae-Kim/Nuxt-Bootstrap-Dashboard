import { dateFormmter } from './dates.lib'

export function transformEvent (event) {
  if (event.openAt) {
    event.openAt = dateFormmter(event.openAt)
  }
  if (event.closedAt) {
    event.closedAt = dateFormmter(event.closedAt)
  }
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
