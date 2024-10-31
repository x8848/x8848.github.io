var exerciseCount = 1;
var song, interval, isNotPausedBefore;
var exercise = document.getElementById("exercise");

var beep = document.getElementById("beep");
var end = document.getElementById("end");
var count = document.getElementById("count");
var go = document.getElementById("go");
var thanks = document.getElementById("thanks");
var applause = document.getElementById("applause");
var current = document.getElementById("current");

var metallica = new Audio("audio/metallica.mp3");
var trauma = new Audio("audio/trauma.mp3");

song = metallica;

function start() {
  interval = setInterval(render, 1000);

  end.onended = function () {
    count.play();
  };

  song.onpause = function () {
    end.play();
    exerciseCount++;
    exercise.innerHTML = exercise.innerHTML + ", " + exerciseCount;
    isNotPausedBefore = false;
  };

  count.play();
  document.getElementsByTagName("button")[0].disabled = true;
  document.getElementsByTagName("input")[0].disabled = true;
  document.getElementsByTagName("input")[1].disabled = true;
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
  exerciseCount = 1;
  clearInterval(interval);
  isNotPausedBefore = false;
  exercise.innerHTML = "";

  document.getElementsByTagName("button")[0].disabled = false;
  document.getElementsByTagName("input")[0].disabled = false;
  document.getElementsByTagName("input")[1].disabled = false;
}

function render() {
  var time = Math.round(song.currentTime);
  var seconds = time % 60;

  current.innerHTML = 60 - seconds;

  if (seconds == 30 || seconds == 55) {
    beep.play();
    isNotPausedBefore = true;
  }
  if (time == 5 * 60) {
    stop();
    return;
  }

  if (isNotPausedBefore && seconds == 0) {
    song.pause();
  }
}

count.onended = function () {
  go.play();
};

go.onended = function () {
  song.play();
};

thanks.onended = function () {
  applause.play();
};
