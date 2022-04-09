const startingMinutes = 20;
let time = startingMinutes * 60;
const timer = document.getElementById("timer");

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  timer.innerHTML = `${minutes}:${seconds}`;

  time <= 0 ? null : time--;
}
