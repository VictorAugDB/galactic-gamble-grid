export function chooseRandomTicketNumbers() {
  function shuffleArray(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))

      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  let numbers = Array.from({ length: 25 }, (_, i) => i + 1)

  numbers = shuffleArray(numbers)
  const randomizedNumbers = numbers.slice(0, 15)
  const filledPositions = new Array(25).fill(0)

  randomizedNumbers.forEach((number) => (filledPositions[number - 1] = 1))

  return filledPositions
}
