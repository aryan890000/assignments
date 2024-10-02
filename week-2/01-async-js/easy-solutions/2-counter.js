let counter = 0

function mySetInterval() {
    setTimeout(function timer() {
        console.log(++counter)
        setTimeout(timer, 1000)
    }, 1000)
}

mySetInterval()