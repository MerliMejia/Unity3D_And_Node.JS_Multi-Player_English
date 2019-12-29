export default class Timer {

    executeAfter(time: number): Promise<void> {
        return new Promise((res, rej) => {

            let interval = setInterval(() => {
                res()
                clearInterval(interval);
            }, 1000 * time)
        })
    }

}