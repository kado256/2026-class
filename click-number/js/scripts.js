const container = document.getElementById('game-container');
const timerDisplay = document.getElementById('timer');
const replayButton = document.getElementById('replay-button');
const difficultySelect = document.getElementById('difficulty'); // New
const startGameButton = document.getElementById('start-game-button'); // New
const difficultyLabel = document.querySelector('label[for="difficulty"]'); // New

// totalNumbers は難易度選択によって動的に決定されるため、グローバル定数から削除
let currentNumber = 1;
let startTime;
let timerInterval;

function initGame() {
    // ゲーム開始時に難易度選択と開始ボタンを非表示にする
    difficultySelect.style.display = 'none';
    startGameButton.style.display = 'none';
    if (difficultyLabel) difficultyLabel.style.display = 'none';

    container.innerHTML = '';
    currentNumber = 1;
    timerDisplay.textContent = '0.000'; // 新しいゲーム開始時にタイマー表示をリセット
    replayButton.style.display = 'none'; // リプレイボタンが確実に非表示になるようにする

    const totalNumbersForThisGame = parseInt(difficultySelect.value, 10); // 選択された難易度（数字の総数）を取得

    for (let i = 1; i <= totalNumbersForThisGame; i++) { // 選択された数字の総数を使用
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
        // 難易度選択とタイマー表示エリアを考慮してy座標の範囲を調整
        const yOffset = 150; // 難易度選択とタイマーのためのスペース
        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (window.innerHeight - size - yOffset) + yOffset;
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        circle.addEventListener('click', () => {
            if (i === currentNumber) {
                if (i === 1) {
                    startTimer();
                }
                
                circle.style.visibility = 'hidden';
                currentNumber++;

                if (currentNumber > totalNumbersForThisGame) { // 選択された数字の総数と比較
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
    // ゲーム終了後にリプレイボタンとゲームコントロールを表示する
    replayButton.style.display = 'block';
    difficultySelect.style.display = 'inline-block';
    startGameButton.style.display = 'inline-block';
    if (difficultyLabel) difficultyLabel.style.display = 'inline-block';
}

replayButton.addEventListener('click', () => {
    replayButton.style.display = 'none';
    timerDisplay.textContent = '0.000';
    initGame();
});

// 「ゲーム開始」ボタンのイベントリスナーを追加
startGameButton.addEventListener('click', () => {
    initGame();
});

// ページロード時にゲームを自動開始しない。ユーザーが「ゲーム開始」をクリックするまで待つ。