let board;
let score = 0;
const gridContainer = document.getElementById('grid-container');
const scoreDisplay = document.getElementById('score');
const gameStatus = document.getElementById('game-status');
const restartBtn = document.getElementById('restartBtn');
const tileMergeSound = new Audio('merge.mp3');
const tileMoveSound = new Audio('move.mp3');
const winSound = new Audio('win.mp3');
const loseSound = new Audio('lose.mp3');

const TILE_SIZE = 80;
const GRID_SIZE = 4;

// Initialize the game
function initGame() {
    board = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
    score = 0;
    updateScore();
    createNewTile();
    createNewTile();
    renderGrid();
    gameStatus.textContent = '';
    gameStatus.classList.remove('win', 'game-over');
}

// Create a new tile (2 or 4) at a random empty spot
function createNewTile() {
    let emptyCells = [];
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (board[r][c] === 0) {
                emptyCells.push({ r, c });
            }
        }
    }
    if (emptyCells.length > 0) {
        const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Update the score display
function updateScore() {
    scoreDisplay.textContent = score;
}

// Check if there are any valid moves left
function hasValidMoves() {
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (board[r][c] === 0) return true;
            if (r < GRID_SIZE - 1 && board[r][c] === board[r + 1][c]) return true;
            if (c < GRID_SIZE - 1 && board[r][c] === board[r][c + 1]) return true;
        }
    }
    return false;
}

// Check win condition
function checkWin() {
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (board[r][c] === 2048) {
                gameStatus.textContent = 'You Win!';
                gameStatus.classList.add('win');
                winSound.play();
                return true;
            }
        }
    }
    return false;
}

// Check game over condition
function checkGameOver() {
    if (!hasValidMoves()) {
        gameStatus.textContent = 'Game Over';
        gameStatus.classList.add('game-over');
        loseSound.play();
        return true;
    }
    return false;
}

// Render the grid on screen
function renderGrid() {
    gridContainer.innerHTML = '';
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const tileValue = board[r][c];
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (tileValue !== 0) {
                tile.classList.add('tile-' + tileValue);
                tile.textContent = tileValue;
            }
            gridContainer.appendChild(tile);
        }
    }
}

// Merge tiles and move them
function moveTiles(direction) {
    let moved = false;
    let newBoard = [...board];

    if (direction === 'left') {
        // Move left logic
    } else if (direction === 'right') {
        // Move right logic
    } else if (direction === 'up') {
        // Move up logic
    } else if (direction === 'down') {
        // Move down logic
    }

    // Update board, create a new tile and check for game over or win conditions
    board = newBoard;
    createNewTile();
    renderGrid();
    updateScore();
    checkWin();
    checkGameOver();
    return moved;
}

// Keypress event listener
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            moveTiles('up');
            break;
        case 'ArrowDown':
            moveTiles('down');
            break;
        case 'ArrowLeft':
            moveTiles('left');
            break;
        case 'ArrowRight':
            moveTiles('right');
            break;
    }
});

// Restart the game
restartBtn.addEventListener('click', initGame);

// Start the game
initGame();
