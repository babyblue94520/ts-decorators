/**
 * Throttle
 * 相同任務，限定時間內只能執行一次
 * @param interval 間隔時間(ms)
 */
export function Throttle(interval: number) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    let method = descriptor.value;
    let timerName = '__throttle_' + name;
    descriptor.value = function (...args) {
      let remainder = (this[timerName] || 0) - Date.now();
      if (remainder < 0) {
        this[timerName] = Date.now() + interval;
        return method.apply(this, args);
      }
    };
    return descriptor;
  }
}

export function toThrottleFn<T extends Function>(fn: T, interval: number = 0): T {
  let time = 0;
  return <any>function (...args) {
    let remainder = time - Date.now();
    if (remainder < 0) {
      time = Date.now() + interval;
      return Promise.resolve(fn.apply(this, args));
    }
    return Promise.reject(remainder);
  };
}
