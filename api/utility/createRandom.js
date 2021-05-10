function randomIndex (min, max, isFloor = true, decimalDigit = 2) {
  let random = (Math.random() * (max - min + 1)) + min
  if (isFloor) {
    random = Math.floor(random)
  } else {
    random = random.toFixed(decimalDigit)
  }
  return Number(random)
}

function createSerialRandom (min, max, count) {
  const serial = []
  let loop = 0
  while (loop < count) {
    const contrary = loop === 0
      ? min
      : serial[loop - 1] === max || max - serial[loop - 1] <= 10
        ? max - min
        : serial[loop - 1]
    let random = randomIndex(contrary, max)
    if (loop !== 0 && Math.abs(random - serial[loop - 1]) >= 7) {
      random = randomIndex(serial[loop - 1], serial[loop - 1] + 4)
    }
    serial.push(random)
    loop++
  }
  return serial
}

function getRandomArray (arr, n) {
  const result = new Array(n)
  let len = arr.length
  const taken = new Array(len)
  if (n > len) {
    throw new RangeError("getRandom: more elements taken than available")
  }
  while (n--) {
    const x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

module.exports = {
  randomIndex,
  createSerialRandom,
  getRandomArray
}
