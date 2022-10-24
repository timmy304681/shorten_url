const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const base = charset.length
const maxPower = 5

const decodeBase62 = (input) => {
  const theArray = Array.from(input)
  let power = maxPower
  let result = 0

  for (let i of theArray) {
    result += +charset.indexOf(i) * (base ** power)
    power -= 1
  }

  return result
}

module.exports = { decodeBase62 }
