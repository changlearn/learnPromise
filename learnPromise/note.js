const PENDING = 'PENDING',
      REJECTED = 'REJECTED',
      FULFILLED = 'FULFILLED'

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason
      }
    }
  
    executor(resolve, reject)
  }
}

module.exports = MyPromise;