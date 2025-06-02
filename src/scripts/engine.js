const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        countdown: document.querySelector('#timeLeft'),
        score: document.querySelector('#score'),
        playerLives: document.querySelector('#playerLives'),
        btnSound: null
    },
    values: {
        timerId: null,
        countdownTimerId: null,
        gameSpeed: 1000,
        countdown: 30,
        score: 0,
        lives: 4,
        hitPosition: null,
        hasGameStarted: false,
        firstClickDone: false,
        gameMusic: new Audio('./src/audios/gamer.mp3'),
        iniciarSound: new Audio('./src/audios/iniciar.mp3')
    }
};

// Configurações iniciais dos áudios
state.values.gameMusic.loop = true;
state.values.gameMusic.volume = 0.5;
state.values.iniciarSound.loop = true;
state.values.iniciarSound.volume = 0.7;

function playHitSound() {
    const audio = new Audio('./src/audios/hit.m4a');
    audio.play();
}

function playGameOverSound() {
    const audio = new Audio('./src/audios/gameover.m4a');
    audio.play();
}

function playGameSound() {
    if (state.values.gameMusic.paused) {
        state.values.gameMusic.play();
    }
}

function randomSquare() {
    state.view.squares.forEach(square => square.classList.remove('enemy'));
    const index = Math.floor(Math.random() * state.view.squares.length);
    const square = state.view.squares[index];
    square.classList.add('enemy');
    state.values.hitPosition = square.id;
}

function moveEnemy() {
    if (state.values.timerId) return; // Evita múltiplos timers
    state.values.timerId = setInterval(randomSquare, state.values.gameSpeed);
}

function startCountdown() {
    state.view.countdown.textContent = state.values.countdown;
    if (state.values.countdownTimerId) clearInterval(state.values.countdownTimerId);
    state.values.countdownTimerId = setInterval(() => {
        state.values.countdown--;
        state.view.countdown.textContent = state.values.countdown;

        if (state.values.countdown <= 0) {
            clearInterval(state.values.countdownTimerId);
            clearInterval(state.values.timerId);
            endGame('⏰ Tempo esgotado!');
        }
    }, 1000);
}

function addListeners() {
    // Adiciona os listeners apenas uma vez
    state.view.squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition) {
                if (!state.values.firstClickDone) {
                    state.values.iniciarSound.pause();
                    state.values.iniciarSound.currentTime = 0;
                    state.values.firstClickDone = true;
                    return;
                }

                if (!state.values.hasGameStarted) {
                    playGameSound();
                    startCountdown();
                    state.values.hasGameStarted = true;
                }

                playHitSound();
                state.values.score++;
                state.view.score.textContent = state.values.score;
                state.values.hitPosition = null;
                randomSquare();
            } else {
                loseLife();
            }
        });
    });
}

function loseLife() {
    if (!state.values.hasGameStarted) return;

    state.values.lives--;
    state.view.playerLives.textContent = 'x' + state.values.lives;

    if (state.values.lives <= 0) {
        clearInterval(state.values.timerId);
        clearInterval(state.values.countdownTimerId);
        endGame('💀 Você perdeu todas as vidas!');
    }
}

function endGame(message) {
    playGameOverSound();
    state.values.gameMusic.pause();
    state.values.gameMusic.currentTime = 0;

    const currentScore = state.values.score;
    const storedHighScore = parseInt(localStorage.getItem('highScore') || 0, 10);

    if (currentScore > storedHighScore) {
        localStorage.setItem('highScore', currentScore);
    }

    setTimeout(() => {
        const playerName = prompt(`${message}\n🏆 Pontuação final: ${currentScore}\n\nDigite seu nome para salvar no placar:`);

        if (playerName) {
            fetch('/save_score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: playerName, score: currentScore })
            })
            .then(response => response.json())
            .then(data => {
                alert('Pontuação salva! Veja o placar na página inicial.');
                resetGame();
            })
            .catch(err => {
                alert('Erro ao salvar pontuação.');
                resetGame();
            });
        } else {
            resetGame();
        }
    }, 500);
}

function resetGame() {
    clearInterval(state.values.timerId);
    clearInterval(state.values.countdownTimerId);
    state.values.timerId = null;
    state.values.countdownTimerId = null;

    const lastScore = state.values.score;

    state.values.score = 0;
    state.values.firstClickDone = false;
    state.values.hasGameStarted = false;
    state.view.score.textContent = 0;

    state.view.squares.forEach(sq => sq.classList.remove('enemy'));

    document.getElementById('difficulty-menu').style.display = 'flex';

    // Atualiza vidas e contador conforme valores atuais
    state.view.playerLives.textContent = 'x' + state.values.lives;
    state.view.countdown.textContent = state.values.countdown;

    const lastScoreDisplay = document.getElementById('lastScore');
    const highScoreDisplay = document.getElementById('highScoreDisplay');
    const highScore = localStorage.getItem('highScore') || 0;

    if (lastScoreDisplay) {
        lastScoreDisplay.textContent = `🧾 Última pontuação: ${lastScore}`;
    }

    if (highScoreDisplay) {
        highScoreDisplay.textContent = `🥇 Melhor pontuação: ${highScore}`;
    }
}

function setDifficulty(level) {
    switch (level) {
        case 'easy':
            state.values.gameSpeed = 1200;
            state.values.lives = 5;
            state.values.countdown = 40;
            break;
        case 'hard':
            state.values.gameSpeed = 700;
            state.values.lives = 3;
            state.values.countdown = 20;
            break;
        default:
            state.values.gameSpeed = 1000;
            state.values.lives = 4;
            state.values.countdown = 30;
    }

    state.view.playerLives.textContent = 'x' + state.values.lives;
    state.view.countdown.textContent = state.values.countdown;
}

function runGame() {
    alert('Clique no inimigo para começar!');

    const iniciar = state.values.iniciarSound;
    iniciar.muted = true;
    iniciar.play().then(() => {
        iniciar.muted = false;
    }).catch(err => {
        console.warn('Autoplay bloqueado:', err);
    });

    randomSquare();
    moveEnemy();

    state.view.btnSound = document.querySelector('#btnSound');
    if (state.view.btnSound) {
        state.view.btnSound.addEventListener('click', () => {
            if (state.values.gameMusic.paused) {
                state.values.gameMusic.play();
                state.view.btnSound.textContent = '🔊';
                state.view.btnSound.classList.remove('muted');
            } else {
                state.values.gameMusic.pause();
                state.view.btnSound.textContent = '🔈';
                state.view.btnSound.classList.add('muted');
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    addListeners();

    const menu = document.getElementById('difficulty-menu');
    const buttons = document.querySelectorAll('.btn-difficulty');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const level = button.getAttribute('data-level');
            setDifficulty(level);
            menu.style.display = 'none';
            runGame();
        });
    });
});
