const fillArrayWithBingoNumbers = () => {
  const bingoNumbers = [];
  for (let index = 1; index < 100; index++) {
    bingoNumbers.push(index);
  }

  return bingoNumbers;
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

export { fillArrayWithBingoNumbers, fillBoard, generateNumbersOfBoard };
