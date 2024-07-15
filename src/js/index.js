// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const userBoardElement = document.getElementById('user-board');
const bingoElement = document.getElementById('bingo');
const pcBoardElement = document.getElementById('pc-board');

const bingoNumbers = [];
let userNumbers = [];
let pcNumbers = [];
let areWinner = false;

let intervalId;

const fillArrayWithBingoNumbers = () => {
  for (let index = 1; index < 100; index++) {
    bingoNumbers.push(index);
  }
};

const generateNumbersOfBoard = () => {
  const numbers = [];
  while (numbers.length < 15) {
    const randomNumber = Math.floor(Math.random() * 99 + 1);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
};

const fillBoard = (numbers, board) => {
  const fragment = document.createDocumentFragment();
  numbers.forEach(number => {
    const newNumber = document.createElement('span');
    newNumber.classList.add('number');
    newNumber.textContent = number;
    newNumber.dataset.number = number;
    fragment.append(newNumber);
  });

  board.append(fragment);
};

const checkWinner = () => {
  const userBoardChecked = userBoardElement.querySelectorAll('.number--user-check');

  const pcBoardChecked = pcBoardElement.querySelectorAll('.number--pc-check');

  if (userBoardChecked.length === 15 && pcBoardChecked.length === 15) {
    areWinner = true;
    console.log('DRAW');
    return;
  }

  if (userBoardChecked.length === 15) {
    console.log('USER WIN');
    areWinner = true;
  }

  if (pcBoardChecked.length === 15) {
    console.log('PC WIN');
    areWinner = true;
  }
};

const extractRandomNumbers = () => {
  if (bingoNumbers.length === 0 || areWinner) {
    clearInterval(intervalId);
    return;
  }

  const index = Math.floor(Math.random() * bingoNumbers.length);
  const number = bingoNumbers[index];

  bingoNumbers.splice(index, 1);

  bingoElement.querySelector(`[data-number='${number}']`).classList.add('number--check');

  if (userNumbers.includes(number)) {
    userBoardElement.querySelector(`[data-number='${number}']`).classList.add('number--user-check');
  }

  if (pcNumbers.includes(number)) {
    pcBoardElement.querySelector(`[data-number='${number}']`).classList.add('number--pc-check');
  }

  checkWinner();
};

const startGame = () => {
  fillArrayWithBingoNumbers();
  userNumbers = generateNumbersOfBoard();
  pcNumbers = generateNumbersOfBoard();
  fillBoard(userNumbers, userBoardElement);
  fillBoard(bingoNumbers, bingoElement);
  fillBoard(pcNumbers, pcBoardElement);
  intervalId = setInterval(() => {
    extractRandomNumbers();
  }, 100);
};

startGame();
