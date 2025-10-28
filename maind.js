let score = 0;

document.addEventListener('DOMContentLoaded', () => {

    let timeLeft = 600;
    const timerElement = document.getElementById('timer');
    const timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerElement.textContent = "0:00";
            alert("Time's up! The quiz will now be submitted.");
        } else {
            const minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;

            seconds = seconds < 10 ? '0' + seconds : seconds;
            timerElement.textContent = `${minutes}:${seconds}`;
            timeLeft--;
        }
    }
});