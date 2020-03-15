'use strict';

{
    const words = [
        'apple','sky','blue','middle','set','english','word',
        'characteristic','nevertheless','play','select',
        'supercalifragilisticexpialidocious','school',
        'class','pencil','pen','desk','bag','notebook',
        'homework','window','book','chair','piano','guitar',
        'room', 'kitchen','cup','123','glass','bed','floor','table','picture','pot',
    ];
    let word;
    let loc;  //何文字目か
    let score;
    let miss;
    let timeLimit = 30 * 1000;  //タイムリミット
    let startTime;
    let isPlaying = false;  //ゲームが始まっているかどうか
    let succession =  0;

    const target = document.getElementById('target');  //idがtargetをゲット
    const scoreLabel = document.getElementById('score'); //idがscoreをゲット
    const missLabel = document.getElementById('miss');  //idがmissをゲット
    const timerLabel = document.getElementById('timer');  //idがmissをゲット
    const audio = document.getElementById('music');
    const audio1 = document.getElementById('music1');
    const gaji = document.getElementById('gaji');
    const puls = document.getElementById('puls');

    function updateTarget(){
        let placeholder ='';
        for(let i = 0 ; i < loc; i++){
            placeholder += '_';
        }
        target.textContent = placeholder + word.substring(loc);
    }

    function updateTimer(){
        const timeLeft = startTime + timeLimit - Date.now();
        timerLabel.textContent = (timeLeft / 1000).toFixed(2);
        if(succession===30){
            puls.style.display='block';
            audio1.play();
            succession=0;
            timeLimit+=5*1000;
        }

        const timeputId = setTimeout(() => {   //10m秒後にupdateTimerを呼ぶ
            updateTimer();
        },10);

        if(timeLeft < 0){
            isPlaying = false;  //ゲーム終了

            clearTimeout(timeputId);
            timerLabel.textContent = '0.00';  //終わったときの時間を０にする
            setTimeout(() =>{             //ちゃんと０の時におわるようにアラート表示を遅らせる
                showResult();
            },100);

            target.textContent = 'click to replay';
        }
    }

    function showResult(){
        const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
        alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`)
    }


    window.addEventListener('click',() => {

        if(isPlaying === true){  //すでに始まっているか
            return;
        }
        isPlaying = true;  // ゲームが始まるのでisPlayingをtrueにする
        succession = 0;
        gaji.value = succession;
        loc = 0;    //　初期化
        score = 0;  //　初期化
        miss = 0;  //　初期化
        scoreLabel.textContent = score; 
        missLabel.textContent = score;
        word = words[Math.floor(Math.random() * words.length)];

        target.textContent = word;  //打つ文字をwordにする。
        startTime = Date.now();
        updateTimer();
    });


    window.addEventListener('keydown', (e) => {   //キーボードを押したとき
        if(isPlaying !== true){
            return;
        }
        if(e.key === word[loc]){   // 文字が合っているか？
            loc++;
            if(loc === word.length){
               word = words[Math.floor(Math.random() * words.length)];
               loc = 0;
            }
            updateTarget();
            score++;
            scoreLabel.textContent = score;
            succession++;
            gaji.value = succession;
        }else{
            audio.play();
            miss++;
            missLabel.textContent = miss;
            succession=0;
            gaji.value = succession;
        }
    });

}
