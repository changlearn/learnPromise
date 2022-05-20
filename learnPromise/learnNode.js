// const fs = require('fs');
// const path = require('path');
// const http = require('http');
// const md5 = require('md5');
// const util = require('util');
const fetch = require('node-fetch');

// fs.rename('learnNode.js', 'learn.js', err => {
//   if (err) return console.log(err);
// })



// const a = {
//   x: '12'
// }
//a.x = a.x.replace(/.*?/g, 'h');
// console.log(__dirname)
//const filePath = path.join(__dirname, 'index.html');
// console.log(filePath)

// fs.readFile(filePath, 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//     return
//   }
//   console.log(data);
// })

// let getReadFilePromise = util.promisify(fs.readFile);

// let p1 = getReadFilePromise(filePath);

// Promise.all([p1]).then((data) => {
//   console.log(data);
// })

// const content = fs.readFileSync(filePath, 'utf-8');

// const PORT = 1935;

// let serve = http.createServer((req, res) => {
//   if (req.url == '/') {
//     res.write(content);
//     res.end(); 
//   } 
// })

// serve.listen(PORT, () => {
//   console.log('启动了');
// })

// console.log(md5('你是谁'));

// async function getNum() {
//   let ret = await 123;
//   return ret;
// }
// getNum().then((value) => {
//   console.log(value, '90');
// })

console.log(1);
