var timerLength = 25 * 60;
var timerStart = timerLength;
var sessionLength;
var breakLength;
var circumference = Math.round(document.getElementById('countdown-circle').getBBox().width * 3.14159);
var timer;
var timerRunning = false;

function startTimer() {
  timerRunning = true;
  timer = setInterval(function() {
    $('#time-remaining').text(formatSeconds(timerLength));
    $('#countdown-circle').css('stroke-dashoffset', -(circumference - (circumference * (timerLength / timerStart))));
    if (timerLength == 0) {
      stopTimer();
      return;
    }
    timerLength--;
  }, 1000);
};

function stopTimer() {
  timerRunning = false;
  clearInterval(timer);
};


function formatSeconds(seconds) {
  var formattedTime = new Date(seconds * 1000).toISOString().substr(14, 5);
  console.log(formattedTime);
  return formattedTime
};

$(document).ready(function() {
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

function changeTimerLength(timerType, direction) {
  var newTimerLength = Number($('#' + timerType + '-length').attr('data-' + timerType + '-length'));
  if (direction == "increase") {
    newTimerLength += 1;
  } else if (direction == "decrease") {
    newTimerLength -= 1;
  }
  $('#' + timerType + '-length').attr('data-' + timerType + '-length', newTimerLength);
  $('#' + timerType + '-length').html(newTimerLength.toString() + ":00");
  if (timerType == 'session') {
    sessionLength = newTimerLength * 60;
  } else {
    breakLength = newTimerLength * 60;
  }
}
