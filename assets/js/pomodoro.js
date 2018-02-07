var timerLength = 60;
var timerStart = timerLength;
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

    console.log(timerLength);
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
  timerLength = 60;
  $('#countdown-circle').css('stroke-dashoffset', 0);

  $('#timer').on('click', function() {
    if (timerRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  })
})
