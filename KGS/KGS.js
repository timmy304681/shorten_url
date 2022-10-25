// base 62
const base62 = require("base62/lib/custom");
// 建立Redis連線
const redis = require("redis");
const client = require('../util/cache')
// const hostname = 'localhost';
// const password = '0000';
// const port = '6379';
// const name = 'default';
// const client = redis.createClient({
// 	url: `redis://${name}:${password}@${hostname}:${port}/0`,
// });
// client.connect();
// client.on('error', (err) => console.log('Redis Client Error', err));
// client.on('connect', () => console.log('Redis Connected'));
// module.exports = client;

// 一千萬筆資料

const max = 100
const len = 6

let charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
charset = base62.indexCharset(charset);


const input = async (starter, mySet) => {
	try {

		for (let i = 0; i < max; i += 1) {

			let encoded = base62.encode(i, charset)
			const currentLen = encoded.length
			let complementZero = ''

			for (let i = 0; i < len - currentLen; i += 1) {
				complementZero += '0'
			}
			encoded = starter + complementZero + encoded
			await client.sAdd(mySet, `${encoded}`);
		}
	} catch (err) {
		console.log(err);
	}
}

input('B', 'set1')
input('C', 'set2')
input('D', 'set3')
//插入資料到redis "myset1, myset2, myset3"




