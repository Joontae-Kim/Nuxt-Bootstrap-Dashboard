function randomIndex (min, max, isFloor = true, decimalDigit = 2) {
  let random = (Math.random() * (max - min + 1)) + min
  if (isFloor) {
    random = Math.floor(random)
  } else {
    random = random.toFixed(decimalDigit)
  }
  return Number(random)
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

function createSerialRandom (min, max, count, isFloor = true, decimalDigit = 2) {
  const serial = []
  let loop = 0
  while (loop < count) {
    const contrary = loop === 0
      ? min
      : serial[loop - 1] === max || max - serial[loop - 1] <= 10
        ? max - min
        : serial[loop - 1]
    let random = randomIndex(contrary, max, isFloor, decimalDigit)
    if (loop !== 0 && Math.abs(random - serial[loop - 1]) >= 8) {
      random = randomIndex(serial[loop - 1], serial[loop - 1] + 6, isFloor, decimalDigit)
    }
    serial.push(random)
    loop++
  }
  return serial
}

function createSerialRandomByUnique (min, max, unique, count = 7) {
  let randomSerial = []
  let [loop, serialSum] = [0, 0]
  while (serialSum < unique && loop < count) {
    const contrary = loop === 0
      ? min
      : randomSerial[loop - 1] === max || max - randomSerial[loop - 1] <= 10
        ? max - min
        : randomSerial[loop - 1]
    let random = randomIndex(contrary, max, false, 1)
    if (loop !== 0 && Math.abs(random - randomSerial[loop - 1]) >= 6) {
      random = randomIndex(randomSerial[loop - 1], randomSerial[loop - 1] + 4, false, 1)
    }
    randomSerial.push(random)
    serialSum = randomSerial.reduce((a, b) => a + b, 0)
    loop++
  }
  const randomSerialSum = randomSerial.reduce((sum, serial) => sum + serial, 0)
  const overWeight = unique > randomSerialSum ? unique - randomSerialSum : randomSerialSum - unique
  const overWeightShare = Number(Number.parseFloat(overWeight / count).toFixed(2))
  randomSerial = randomSerial.reduce((serial, ele) => {
    const computed = overWeightShare + ele
    serial.push(Number.parseFloat(computed.toFixed(2)))
    return serial
  }, [])
  return randomSerial
}

module.exports = {
  randomIndex,
  getRandomArray,
  createSerialRandom,
  createSerialRandomByUnique
}
