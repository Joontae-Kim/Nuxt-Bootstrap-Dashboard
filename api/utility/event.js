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

// const eventPrototype = {
//   name: '',
//   views: 0,
//   sales: 0,
//   bounce: 0
// }

function createEventSet () {
  const set = eventNameSet.reduce((set, name, n) => {
    set.push({
      name,
      views: randomIndex(50, 400),
      sales: randomIndex(100, 300),
      bounce: randomIndex(20, 100)
    })
    return set
  }, [])
  return set
}
 
function randomEventSet (count) {
  const eventSet = createEventSet()
  return getRandomArray(eventSet, count)
}

module.exports = {
  createEventSet,
  randomEventSet
}
