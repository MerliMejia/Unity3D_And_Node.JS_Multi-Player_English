export default class Timer {
  private interval: number = 60;
  private si: any;

  constructor();
  constructor(execute: Function);
  constructor(execute: Function, interval: number);
  constructor(execute?: Function, interval?: number) {
    if (interval !== undefined) this.interval = interval;
    if (execute !== undefined) this.start(execute);
  }

  private start(execute: Function) {
    this.si = setInterval(() => {
      execute();
    }, 1000 / this.interval);
  }

  stop() {
    clearInterval(this.si);
  }

  executeAfter(time: number, callback?: Function): Promise<void> {
    return new Promise((res, rej) => {
      let interval = setInterval(() => {
        callback !== undefined ? callback() : null;
        res();
        clearInterval(interval);
      }, 1000 * time);
    });
  }
}
