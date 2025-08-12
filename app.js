/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr'); 
const messageEl = document.getElementById('message'); 
const resetBtnEl = document.createElement('button');
resetBtnEl.textContent = "Reset Game";
resetBtnEl.setAttribute('id', 'reset');
document.body.appendChild(resetBtnEl);

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(square => {
  square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = false;
  tie = false;
  render();
}

function render() {
  updateBoard();
  updateMessage();
  
}

function updateBoard() {
  board.forEach((cell, index) => {
    squareEls[index].textContent = cell;
  });
  
}
init();

function updateMessage() {
  if (winner === false && tie === false) {
    messageEl.textContent = `It's ${turn}'s turn!`;
  } else if (winner === false && tie === true) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `Congratulations, ${turn} wins!`;
  }
}

function handleClick(event) {

  // if (!event.target.classList.contains('square')) {
  //   return;
  // }
  const squareIndex = parseInt(event.target.id);

  

  if (board[squareIndex] !== '' || winner) 
    return;

  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function placePiece(index) {
  board[index] = turn;
  // console.log(board); 
}

function checkForWinner() {
  // for (let i = 0; i < winningCombos.length; i++) {
  //   const combo = winningCombos[i];
  //   const a = combo[0];
  //   const b = combo[1];
  //   const c = combo[2];


  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      board[a] !== '' &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      winner = true;
      return;
    }
  }
  winner = false;
  // console.log(winner); 
}

function checkForTie() {
  if (winner) return;
  tie = board.every(cell => cell !== '');
  // console.log(tie); 
}

function switchPlayerTurn() {
  if (winner) return;
  turn = turn === 'X' ? 'O' : 'X';
  // console.log(turn); 
}
