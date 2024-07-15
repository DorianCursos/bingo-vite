import { fillArrayWithBingoNumbers, fillBoard, generateNumbersOfBoard } from './board';
import { bingoElement, pcBoardElement, userBoardElement } from './dom';

let bingoNumbers = [];
let userNumbers = [];
let pcNumbers = [];
let areWinner = false;

let intervalId;

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
  bingoNumbers = fillArrayWithBingoNumbers();
  userNumbers = generateNumbersOfBoard();
  pcNumbers = generateNumbersOfBoard();
  fillBoard(userNumbers, userBoardElement);
  fillBoard(bingoNumbers, bingoElement);
  fillBoard(pcNumbers, pcBoardElement);
  intervalId = setInterval(() => {
    extractRandomNumbers();
  }, 100);
};

export { startGame };
