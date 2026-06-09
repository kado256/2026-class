document.getElementById('draw').addEventListener('click', function () {
    const resultElement = document.getElementById('result');
    const omikujiResults = ['超大吉', '大吉', '中吉', '小吉', '末吉', '凶'];

    resultElement.classList.remove('fade-in');
    document.body.classList.remove('bad-luck');
    resultElement.textContent = '運勢を占っています...';

    // 500ミリ秒（0.5秒）後に結果を表示する
    setTimeout(() => {
        const result = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];

        // 大吉の時だけ虹色アニメーション用のクラスを付与
        const rainbowClass = result === '大吉' ? 'rainbow-text' : '';

        resultElement.innerHTML = `あなたの運勢は… <span class="fortune-text ${rainbowClass}" ${colorStyle}>${result}</span>`;
        resultElement.classList.add('fade-in'); // CSSで定義するアニメーションクラスを追加

        if (result === '超大吉') {
            // 超大吉：虹色テキスト + 紙吹雪
            fortuneSpan.classList.add('rainbow-text');
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else if (result === '大吉') {
            // 大吉：赤文字にする
            fortuneSpan.classList.add('is-daikichi');
        } else if (result === '凶') {
            // 凶：画面全体を暗くして揺らす
            document.body.classList.add('bad-luck');
        }
    }, 500);
});

