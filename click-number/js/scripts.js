const container = document.getElementById('game-container');
const timerDisplay = document.getElementById('timer');
const totalNumbers = 10; // クリックする数字の総数
let currentNumber = 1;
let startTime;
let timerInterval;

function initGame() {
    for (let i = 1; i <= totalNumbers; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.textContent = i;

        // ランダムなサイズ (40~100px)
        const size = Math.floor(Math.random() * 61) + 40;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;

        // ランダムな色 (HSLを使用して鮮やかな色を生成)
        const hue = Math.floor(Math.random() * 360);
        circle.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;

        // ランダムな位置 (画面内に収まるように計算)
        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (window.innerHeight - size - 100) + 100;
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        circle.addEventListener('click', () => {
            if (i === currentNumber) {
                if (i === 1) {
                    startTimer();
                }
                
                circle.style.visibility = 'hidden';
                currentNumber++;

                if (currentNumber > totalNumbers) {
                    stopTimer();
                }
            }
        });

        container.appendChild(circle);
    }
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        timerDisplay.textContent = elapsedTime.toFixed(3);
    }, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
}

initGame();