// Initial Data

let board = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
};

let currentPlayer = '';
let message = '';
let isPlaying = false;

reset();

// Events

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Functions
function handleCellClick(event) {
    let cell = event.target.getAttribute('data-item');
    if (isPlaying && board[cell] === '') {
        board[cell] = currentPlayer;
        renderBoard();
        togglePlayer();
    }
}

function reset() {
    message = '';

    let random = Math.floor(Math.random() * 2);
    currentPlayer = (random === 0) ? 'x' : 'o';

    for (let i in board) {
        board[i] = '';
    }

    isPlaying = true;

    renderBoard();
    renderInfo();
}

function renderBoard() {
    for (let i in board) {
        let cell = document.querySelector(`div[data-item=${i}]`);
        cell.innerHTML = board[i];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.turn').innerHTML = currentPlayer;
    document.querySelector('.result').innerHTML = message;
}

function togglePlayer() {
    currentPlayer = (currentPlayer === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if (checkWinnerFor('x')) {
        message = '"X" wins!';
        isPlaying = false;
    } else if (checkWinnerFor('o')) {
        message = '"O" wins!';
        isPlaying = false;
    } else if (isFull()) {
        message = 'It\'s a tie!';
        isPlaying = false;
    }
}

function checkWinnerFor(player) {
    let positions = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let combo of positions) {
        let pArray = combo.split(',');
        let hasWon = pArray.every(pos => board[pos] === player);
        if (hasWon) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for (let i in board) {
        if (board[i] === '') {
            return false;
        }
    }

    return true;
}
