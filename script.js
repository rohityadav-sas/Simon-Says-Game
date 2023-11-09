let divs = Array.from(document.querySelectorAll('#container div'));
let parent = document.getElementById('parent'); let button = document.getElementById('button'); let gameArray, gameArrayIndex, score, gameOver; let highestScore = 0; let close = document.getElementById('close'); let curscr = Array.from(document.querySelectorAll('#currentScr div')).length; let highscr = Array.from(document.querySelectorAll('#highScr div')).length; let currentScr = document.getElementById('currentScr'); let highScr = document.getElementById('highScr'); let title = document.getElementById('title');
startGame = () => {
    gameOver = false; gameArray = []; gameArrayIndex = 0; score = 0;
    divs.forEach(e => {
        e.style.cursor = 'pointer';
        e.addEventListener('click', eventlisten);
    })
    let random = Math.floor(Math.random() * divs.length);
    gameArray.push(random);
    setTimeout(() => { divs[random].classList.add('flash'); }, 200);
    setTimeout(() => { divs[random].classList.remove('flash'); }, 500);
}

function eventlisten() {
    this.classList.add('flash');
    setTimeout(() => { this.classList.remove('flash'); }, 200);
    checkWin(parseInt(this.textContent));
}

async function gameAutomate() {
    gameArrayIndex = 0;
    if (gameArray.length != 0) { await setColor(); }
    let random = Math.floor(Math.random() * divs.length);
    gameArray.push(random);
    divs[random].classList.add('flash');
    setTimeout(() => { divs[random].classList.remove('flash'); }, 200);
}

checkWin = (boxText) => {
    (gameArray[gameArrayIndex] != boxText) ? (resetGame()) : ({});
    if (gameArrayIndex == gameArray.length - 1 && !gameOver) {
        setTimeout(() => {
            score++;
            (score > highestScore) ? (highestScore = score) : ({});
            gameAutomate();
        }, 500);
    }
    if (gameArray.length != 0) { gameArrayIndex++ };
}

setColor = () => {
    return new Promise(async (resolve, reject) => {
        divs.forEach(e => {
            e.removeEventListener('click', eventlisten);
            e.style.cursor = 'default';
        })
        for (let i = 0; i < gameArray.length; i++) {
            divs[gameArray[i]].classList.add('flash');
            await removeColor(i);
            await changeColor();
            if (i == gameArray.length - 1) {
                divs.forEach(e => {
                    e.addEventListener('click', eventlisten);
                    e.style.cursor = 'pointer';
                })
                resolve(true);
            };
        }
    })
};

removeColor = (index) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            divs[gameArray[index]].classList.remove('flash');
            resolve(true);
        }, 200);
    })
};

changeColor = () => { return new Promise((resolve, reject) => { setTimeout(() => { resolve(true); }, 200); }) }

function resetGame() {
    gameOver = true;
    divs.forEach(e => {
        e.removeEventListener('click', eventlisten);
        e.style.cursor = 'default';
    })
    addElements(score, curscr, currentScr); addElements(highestScore, highscr, highScr);
    inst.innerHTML = '<div id="gameFinished">Game Over!</div><i class="fa-solid fa-xmark" id="close"></i>';
    inst.classList.add('gameOver');
    inst.style.transform = 'translate(-50%,-50%) scale(1)';
    close = document.getElementById('close');
    close.addEventListener('click', scale);
}

function addElements(a, b, c) {
    if (a > b - 1) {
        for (let i = b; i <= a; i++) {
            let x = document.createElement('div');
            x.innerText = i;
            c.appendChild(x);
        }
    };
    c.style.transform = `translateY(${-50 * a}px)`;
}
close.addEventListener('click', scale);

function scale() {
    inst.style.transform = 'translate(-50%, -50%) scale(0)';
    parent.style.transform = 'scale(1)';
    button.style.transform = 'scale(1)';
    currentScr.style.transform = '';
    title.style.opacity = '0.5';
}