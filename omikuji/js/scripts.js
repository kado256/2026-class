document.getElementById('draw').addEventListener('click', function () {
    const resultElement = document.getElementById('result');
    const omikujiResults = ['大吉', '中吉', '小吉', '末吉', '凶'];

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

        // 大吉の時だけ紙吹雪を降らせる
        if (result === '大吉') {
            confetti({
                particleCount: 150, // 大吉なので少し多めに
                spread: 100,        // 広がりも大きく
                origin: { y: 0.6 }
            });
        }

        // 凶の時だけ画面を暗くして揺らす演出を追加
        if (result === '凶') {
            document.body.classList.add('bad-luck');
        }
    }, 500);
});