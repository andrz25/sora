var intervalId = null;
var workTimer = 60*25;
var breakTimer = 60*5;
var count = 0;
var currentTimer = workTimer;
var pauseTime = 0;
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    if (intervalId) {
        return;
    }
    intervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(intervalId);
            intervalId = null;

            if (count < 7) {
                count++;
                if (count%2 === 1) {
                    alert("Break Time!");
                    currentTimer = breakTimer;
                } 
                else {
                    alert("Back to Work!");
                    currentTimer = workTimer;
                }
                startTimer(currentTimer, display);
            }
        }

        
    }, 1);
}

window.onload = function () {
    var display = document.querySelector('#time');
       // display.textContent = "00:"+count;
        display.textContent = "25:00";
        document.getElementById('start').addEventListener('click', function () { 
        if (intervalId == null) {
            if (pauseTime > 0) {
                startTimer(pauseTime, display);
                pauseTime = 0;
            }
            else {
                startTimer(currentTimer, display);
            }
            
        }
    	
      });

      document.getElementById('stop').addEventListener('click', function () {
        if (intervalId !== null) {
            clearInterval(intervalId);
            minutes = parseInt(display.textContent.split(":")[0], 10);
            seconds = parseInt(display.textContent.split(":")[1], 10);
            pauseTime = minutes * 60 + seconds;
            intervalId = null;
        }

      });
      
      document.getElementById('reset').addEventListener('click', function () {
        clearInterval(intervalId);
        intervalId = null;
        currentTimer = workTimer;
        count = 0;
        pauseTime = 0;
        display.textContent = "25:00";
      });

};