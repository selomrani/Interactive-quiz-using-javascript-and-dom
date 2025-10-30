let score = 0;

document.addEventListener('DOMContentLoaded', () => {

    let timeLeft = 600;
    const timerElement = document.getElementById('timer');
    const timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerElement.textContent = "0:00";
            alert("Time's up!");
        } else {
            const minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;

            seconds = seconds < 10 ? '0' + seconds : seconds;
            timerElement.textContent = `${minutes}:${seconds}`;
            timeLeft--;
        }
    }
});
let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode')
  darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})