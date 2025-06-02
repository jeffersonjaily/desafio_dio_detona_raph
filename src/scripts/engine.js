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
        gameSpeed: 1500,
        countdown: 50,
        score: 0,
        lives: 5,
        hitPosition: null,
        hasGameStarted: false,
        firstClickDone: false,
        gameMusic: new Audio('./src/audios/gamer.mp3'),
        iniciarSound: new Audio('./src/audios/iniciar.mp3')
    }
};

// Configuração dos áudios
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
    state.values.timerId = setInterval(randomSquare, state.values.gameSpeed);
}

function startCountdown() {
    state.view.countdown.textContent = state.values.countdown;
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

    setTimeout(() => {
        const playerName = prompt(`${message}\n🏆 Pontuação final: ${state.values.score}\n\nDigite seu nome para salvar no placar:`);

        if (playerName) {
            // Envia para backend Flask via POST
            fetch('/save_score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: playerName, score: state.values.score })
            })
            .then(response => response.json())
            .then(data => {
                alert('Pontuação salva! Veja o placar na página inicial.');
                location.reload();
            })
            .catch(err => {
                alert('Erro ao salvar pontuação.');
                location.reload();
            });
        } else {
            location.reload();
        }
    }, 500);
}


function startGame() {
    alert('🎮 Bem-vindo ao Detona Ralph!\nClique no inimigo para começar!');

    // Toca iniciar.mp3 com mute ativado para evitar bloqueio de autoplay
    const iniciar = state.values.iniciarSound;
    iniciar.muted = true;
    iniciar.play().then(() => {
        iniciar.muted = false;
    }).catch(err => {
        console.warn('Autoplay bloqueado:', err);
    });

    randomSquare();
    moveEnemy();
    addListeners();

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

// Aguarda carregamento do DOM antes de iniciar o jogo
window.addEventListener('DOMContentLoaded', startGame);
