document.getElementById('draw').addEventListener('click', function () {
    const resultElement = document.getElementById('result');
    const omikujiResults = ['超大吉', '大吉', '中吉', '小吉', '末吉', '凶'];

    resultElement.classList.remove('fade-in');
    document.body.classList.remove('bad-luck');
    resultElement.textContent = '運勢を占っています...';

    setTimeout(() => {
        const result = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];

        const rainbowClass = result === '超大吉' ? 'rainbow-text' : '';

        resultElement.innerHTML = `あなたの運勢は… <span class="fortune-text ${rainbowClass}">${result}</span>`;
        resultElement.classList.add('fade-in');

        const fortuneSpan = resultElement.querySelector('.fortune-text');

        if (result === '超大吉') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else if (result === '大吉') {
            fortuneSpan.classList.add('is-daikichi');
        } else if (result === '凶') {
            document.body.classList.add('bad-luck');
        }
    }, 500);
});