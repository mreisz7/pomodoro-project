var sessionLength = 25 * 60;
var breakLength = 5 * 60;
var timerLength = sessionLength;
var timerStart = timerLength;
var timer;
var timerRunning = false;
var currentTimer = "session";
var circumference = Math.round(document.getElementById('countdown-circle').getBBox().width * 3.14159);

$(document).ready(function() {

  $('#time-remaining').text(timerLength.formatted());
  $('#session-length').text(sessionLength.formatted());
  $('#break-length').text(breakLength.formatted());
  $('#countdown-circle').addClass('session');
  $('#countdown-circle').css('stroke-dashoffset', 0);

  $('#timer').on('click', function() {
    if (timerRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  })

  $('#increase-session-length').on('click', function() {
    changeTimerLength("session", "increase");
  });
  $('#decrease-session-length').on('click', function() {
    changeTimerLength("session", "decrease");
  });
  $('#increase-break-length').on('click', function() {
    changeTimerLength("break", "increase");
  });
  $('#decrease-break-length').on('click', function() {
    changeTimerLength("break", "decrease");
  });
})

Number.prototype.formatted = function () {
    var sec_num = this; // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (this == 0) {
      return "00:00";
    }

    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    if (hours == 0) {
      return minutes + ":" + seconds;
    } else {
      return hours + ":" + minutes + ":" + seconds;
    }
}

function startTimer() {
  timerRunning = true;
  timer = setInterval(function() {
    $('#time-remaining').text(timerLength.formatted());
    if (timerLength == 0) {
      switchCurrentTimer();
      return;
    }
    if (timerLength == 0 && timerStart == 0) {
      stopTimer();
      return;
    }
    if (sessionLength == 0 && breakLength == 0) {
      stopTimer();
      timerLength = 0;
      timerStart = 0;
      return;
    }
    var circleDashOffset = -(circumference - (circumference * (timerLength / timerStart)));
    $('#countdown-circle').css('stroke-dashoffset', circleDashOffset);
    timerLength--;
  }, 1000);
};

function stopTimer() {
  timerRunning = false;
  clearInterval(timer);
};

function switchCurrentTimer() {
  if (currentTimer == "session") {
    currentTimer = "break";
    timerLength = breakLength;
    timerStart = timerLength;
  } else {
    currentTimer = "session";
    timerLength = sessionLength;
    timerStart = timerLength;
  }
  $('#countdown-circle').toggleClass('session break');
}

function changeTimerLength(timerType, direction) {
  // Get the current timer length (in minutes rounded)
  var newTimerLength = (timerType == "session") ? Math.round(sessionLength / 60) : Math.round(breakLength / 60);
  if (direction == "increase") {
    newTimerLength += 1;
    if (timerType == currentTimer && newTimerLength > timerStart) {
      timerStart = newTimerLength;
    }
  } else if (direction == "decrease") {
    newTimerLength -= 1;
    newTimerLength = (newTimerLength > 0) ? newTimerLength : 0;
  }
  var newTimerLengthSeconds = newTimerLength * 60;
  $('#' + timerType + '-length').html(newTimerLengthSeconds.formatted());
  if (timerType == 'session') {
    sessionLength = newTimerLengthSeconds;
  } else {
    breakLength = newTimerLengthSeconds;
  }
  if (timerType == "session" && currentTimer == timerType) {
    timerLength = sessionLength;
  } else if (timerType == "break" && currentTimer == timerType) {
    timerLength = breakLength;
  }
  if (timerRunning == false) {
    timerStart = timerLength;
  }
  $('#time-remaining').text(timerLength.formatted());
}
