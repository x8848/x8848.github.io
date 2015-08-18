var TIMEOUT = 60;
var isItBreak, seconds, interval, exerciseCount;

var song = new Audio("audio/song.mp3");
var beep = new Audio("audio/beep.wav");
var end = new Audio("audio/end.wav");
var count = new Audio("audio/count.wav");
var go = new Audio("audio/go.wav");
var thanks = new Audio("audio/thanks.wav");
var applause = new Audio("audio/applause.wav");

var current = document.getElementById("current");
var exercise = document.getElementById("exercise");

song.loop = true;
current.innerHTML = TIMEOUT;

function start() {
    seconds = 0;
    exerciseCount = 1;
    isItBreak = true;
    interval = setInterval(render, 1000);

    end.onended = function () {
        count.play();
    };

    song.onpause = function () {
        seconds = 0;
        isItBreak = true;
        end.play();
        exerciseCount++;
        exercise.innerHTML = exercise.innerHTML + ", " + exerciseCount;
    };

    count.play();
    document.getElementsByTagName("button")[0].disabled = true;
}

function stop() {
    song.onpause = function () {
        end.play();
    };
    end.onended = function () {
        thanks.play();
    };

    song.pause();
    song.currentTime = 0;
    clearInterval(interval);
    exercise.innerHTML = "";
    document.getElementsByTagName("button")[0].disabled = false;
}

function render() {
    if (isItBreak) return;

    seconds = seconds + 1;
    current.innerHTML = TIMEOUT - seconds;

    if (seconds == (TIMEOUT / 2) || seconds == (TIMEOUT - 5)) beep.play();

    if (seconds == TIMEOUT) {
        current.innerHTML = TIMEOUT;
        if (exerciseCount == 5) {
            stop();
            return;
        }
        song.pause();
    }
}

count.onended = function () {
    go.play();
};

go.onended = function () {
    isItBreak = false;
    song.play();
};

thanks.onended = function () {
    applause.play();
};

song.onended = function () {
    song.play();
};