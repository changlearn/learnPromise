const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        try {
            executor(this.resolve, this.reject)
        }catch(e) {
            this.reject(e)
        }
    }

    status = PENDING
    value = undefined
    reason = undefined
    successCallback = []
    failCallback = []
    resolve = value => {
        if (this.status !== PENDING) return
        this.status = FULFILLED
        this.value = value
        while (this.successCallback.length) this.successCallback.shift()(value)
    }

    reject = reason => {
        if (this.status !== PENDING) return
        this.status = REJECTED
        this.reason = reason
        while (this.failCallback.length) this.failCallback.shift()(reason)
    }

    then(successCallback, failCallback) {
        successCallback = successCallback ? successCallback : value => value
        failCallback = failCallback ? failCallback : reason => { throw reason }
        let promise2 = new MyPromise((resolve, reject) => {
            // if (!failCallback) {
            //     //console.log('failCallback')
            //     failCallback = reason => reject(reason)
            // }
            if (this.status === FULFILLED) {
                //console.log(4)
                setTimeout(() => {
                    let x = successCallback(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                })
            }else if (this.status === REJECTED) {
                setTimeout(() => {
                    let x = failCallback(this.reason)
                    resolvePromise(promise2, x, resolve, reject)
                })
            }else {
                //console.log(2)
                this.successCallback.push(() => {
                    setTimeout(() => {
                        let x = successCallback(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    })
                })
                this.failCallback.push(() => {
                    setTimeout(() => {
                        let x = failCallback(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    })
                })
            }
        })
        return promise2
    }

    catch(failCallback) {
        //console.log(1, this.status)
        return this.then(undefined, failCallback)
    }

    static resolve(value) {
        if (value instanceof MyPromise){
            return value
        }else {
            return new MyPromise(resolve => resolve(value))
        }
    }

    static all(array) {
        let result = []
        let index = 0
        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                index++
                result[key] = value
                if (index === array.length) resolve(result)
            }
            for (let i = 0; i < array.length; i++) {
                let item = array[i]
                if (item instanceof MyPromise) {
                    item.then(value => addData(i, value), reason => reject(reason))
                }else {
                    addData(i, item)
                }
            }
        })
    }

    finally(callback) {
        return this.then(value => {
            return MyPromise.resolve(callback()).then(() => value)
        }, reason => {
            return MyPromise.resolve(callback()).then(() => { throw reason })
        })
    }
}
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise'))
    }
    if (x instanceof MyPromise) {
        // x.then(value => resolve(value), reason => reject(reason))
        x.then(resolve, reject)
    }else {
        resolve(x)
    }
}

module.exports = MyPromise