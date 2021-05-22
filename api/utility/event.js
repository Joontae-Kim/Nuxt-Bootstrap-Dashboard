import { randomIndex, getRandomArray } from './createRandom'

const eventNameSet = [
  '2021\'s Best Bootstrap Themes Top 10',
  '2021\'s Best Bootstrap Premium Themes',
  '5 Best Bootstrap Corporate Theme',
  'Free Bootstrap Theme Best 10',
  'Vue.js Bootstrap Template Best 10',
  'React.js Bootstrap Template Best 10',
  'Bootstrap Business Theme Best 10',
  'Bestselleing Bootstrap Template',
  '35+ Responsive Bootstrap Themes SALE',
  'The Newest Bootstrap Template in Febrary 2021',
  'The Recommened Vue.js Bootstrap Template in Febrary 2021',
  'The Recommened React.js Bootstrap Template in Febrary 2021'
]

function randomEventSet (count) {
  const eventSet = createEventSet()
  return getRandomArray(eventSet, count)
}

function createEventSet () {
  const set = eventNameSet.reduce((set, name, n) => {
    const views = randomIndex(200, 400)
    const bounce = randomIndex(20, 60)
    const sales = views * (bounce / 100)
    set.push({ name, views, bounce: Math.floor(bounce), sales: Math.floor(sales) })
    return set
  }, [])
  return set
}

module.exports = {
  randomEventSet,
  createEventSet
}
