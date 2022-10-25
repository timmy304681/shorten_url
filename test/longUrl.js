const urls = require("./longUrl.json");

const arrUrls = urls.map(url => url['Root Domain'])

console.log(arrUrls);