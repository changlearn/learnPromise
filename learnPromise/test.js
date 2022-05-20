const { reject } = require('./myPromise');
let MyPromise = require('./myPromise');
const { resolve } = require('./o');

let isPromise = false;
let Promise = MyPromise;

const promise1 = new Promise((resolve, reject) => {
	isPromise === true ? resolve('成功') : reject('失败')
	// isPromise === true ? 
	// setTimeout(() => {
	// 	resolve('成功') 
	// }, 2000)
	// : reject('失败')
	//throw new Error('失败了')
})

let promise2 = promise1.then((res) => {
	//return 'Fulfilled: ' + res;
	// return new MyPromise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		//resolve('胜利')
	// 		reject('失败了')
	// 	}, 2000)
	// })
	console.log(2)
	return Promise.reject(res)
}, (err) => {
	console.log(1)
	return err;
});

promise2.then((res) => {
	console.log('Fulfilled:', res)
	return reject('777')
}, (err) => {
	console.log('Rejected: ', err)
}).finally((val) => {
	console.log('good', val)
})
.then((val) => {
	console.log(val, '都说了房间')
})
.catch((err) => {
	console.log('err: ' + err)
})

// const obj = {}

// Object.defineProperty(obj, 'myNaN', {
// 	value: NaN,
// 	writable: false,
// 	configurable: false,
// 	enumerable: false
// })

// Object.defineProperty(obj, 'myNaN', {
// 	value: NaN
// })