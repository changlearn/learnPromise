const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED'

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<MyPromise>'));
  }

  let called = false;

  if ((typeof x === 'object' && typeof x !== null) || typeof x === 'function') {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
          if (called) return;
          called = true;
          reject(r);
        })
      } else {
        resolve(x);
      }
    } catch(e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }

      // 发布
      this.onFulfilledCallbacks.forEach((callback) => callback());
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
      }

      // 发布
      this.onRejectedCallbacks.forEach((callback) => callback());
    }

    try {
      executor(resolve, reject);
    } catch(e) {
      reject(e);
    }
  }

  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    })
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    })
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };

    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch(e) {
            reject(e)
          }
        }, 0);
      }
  
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch(e) {
            reject(e);
          }
        }, 0);
      }
      
      // 订阅
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch(e) {
            reject(e)
          }
        })
  
        // 订阅
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch(e) {
            reject(e);
          }
        })
      }
    })

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then((value) => {
      callback();
      return value;
    }, (reason) => {
      callback();
      throw reason;
    })
  }
}

module.exports = MyPromise;