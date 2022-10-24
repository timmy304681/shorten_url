const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const base = charset.length

function encodeBase62 (number) {
  const encodeChars = []
  while (number / base > 0) {
    const mod = number % base
    encodeChars.unshift(charset[mod])
    number = Math.floor(number / base)
  }
  return encodeChars.join('')
}

module.exports = { encodeBase62 }
