

// const data = $.ajax({
//   url: "http://localhost:3000/data.json",
// 	async: false
// })

// console.log(getDataName(data.responseJSON))


const promise = new Promise((resolve, reject) => {
	console.log('first')
	$.ajax({
		url: 'http://127.0.0.1:5501/data.json',
		success(data) {
			resolve(data)
		},
		error(err) {
			reject(err)
		}
	})
})

promise.then((res) => {
	console.log(getDataName(res))
}).catch((err) => {
	console.log(err)
})

console.log('I am a EventLoop')

function getDataName(data) {
	return data.map(function(item){
		return item.name
	})
}