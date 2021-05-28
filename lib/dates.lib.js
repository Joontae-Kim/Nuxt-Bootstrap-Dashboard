import dayjs from 'dayjs'

export function dateFormmter (date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}
