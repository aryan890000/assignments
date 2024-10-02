function HourClock_24() {
    setInterval(() => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        const currentTime = hours + ":" + minutes + ":" + seconds;
        console.log(currentTime);
    }, 1000);       
}

function HourClock_12() {
    setInterval(() => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        
        let time = "";
        if(hours >= 12) {
            if(hours > 12) {
                hours -= 12;
            }
            time = "PM";
        } else {
            if(hours === 0) {
                hours += 12;
            }
            time = "AM";
        }

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        
        const currentTime = hours + ":" + minutes + ":" + seconds + " " + time;
        console.log(currentTime);
    }, 1000);       
}