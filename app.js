if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

let turn = true;
let xScore = 0;
let oScore = 0;
let timeSelected = 1;

function ready() {
  checking();
  reStartBtn();
}

function checking() {
  const cells = document.querySelectorAll(".cell");
  const whoTurn = document.querySelector(".whoTurn");

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (!cell.innerHTML) {
        if (turn) {
          cell.innerHTML = "X";
          turn = false;
          whoTurn.textContent = `O의 차례입니다.`;
        } else {
          cell.innerHTML = "O";
          turn = true;
          whoTurn.textContent = `X의 차례입니다.`;
        }
      }
      identifyWinLose();
      cellColorChange(cell);
    });
  });
}

function identifyWinLose() {
  const cells = document.querySelectorAll(".cell");
  const xWin = document.querySelector(".X-win");
  const oWin = document.querySelector(".O-win");
  const winCase = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  for (let i = 0; i < winCase.length; i++) {
    let caseIdx = winCase[i];

    const whoWin = (a) => {
      return (
        cells[caseIdx[0] - 1].textContent === `${a}` &&
        cells[caseIdx[1] - 1].textContent === `${a}` &&
        cells[caseIdx[2] - 1].textContent === `${a}`
      );
    };

    if (whoWin("X")) {
      xScore++;

      xWin.textContent = `X : ${xScore}`;
      xWin.classList.add("winColor");
      setTimeout(() => {
        reStart();
        xWin.classList.remove("winColor");
      }, 1000);

      return winModal("X");
    } else if (whoWin("O")) {
      oScore++;

      oWin.textContent = `O : ${oScore}`;
      oWin.classList.add("winColor");
      setTimeout(() => {
        reStart();
        oWin.classList.remove("winColor");
      }, 1000);

      return winModal("O");
    }
  }

  if (isFull()) {
    setTimeout(() => {
      reStart();
    }, 1000);

    return winModal("drow");
  }

  return timer(timeSelected);
}

function reStart() {
  const cells = document.querySelectorAll(".cell");
  const whoTurn = document.querySelector(".whoTurn");

  turn = true;
  whoTurn.textContent = `X의 차례입니다.`;
  cells.forEach((cell) => {
    cell.textContent = "";
  });
}

function isFull() {
  const cells = document.querySelectorAll(".cell");

  let full = true;

  cells.forEach((cell) => {
    if (cell.textContent === "") {
      full = false;
    }
  });

  return full;
}

function reStartBtn() {
  const reStartButton = document.querySelector(".reStart");
  const xWin = document.querySelector(".X-win");
  const oWin = document.querySelector(".O-win");

  reStartButton.addEventListener("click", () => {
    oWin.textContent = `O : 0`;
    xWin.textContent = `X : 0`;
    reStart();
  });
}

function winModal(value) {
  const winModalText = document.querySelector(".win-modal");
  const winModalTitle = document.querySelector(".win-title");
  const myModal = new bootstrap.Modal(document.getElementById("winLoseModal"), {
    keyboard: true,
    backdrop: true,
  });

  if (value === "drow") {
    winModalTitle.textContent = `DROW!`;
    winModalText.textContent = `동점입니다!`;
    myModal.show();
  } else {
    winModalTitle.textContent = `WIN!`;
    winModalText.textContent = `${value}가 이겼습니다!`;
    myModal.show();
  }
}

function timer(value) {
  const timer = document.querySelector(".timer-text");
  const xWin = document.querySelector(".X-win");
  const oWin = document.querySelector(".O-win");
  const cells = document.querySelectorAll(".cell");

  let time = value * 100;

  timer.textContent = `0${value}:00`;
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      clearInterval(interval);
    });
  });
  const interval = setInterval(() => {
    timer.textContent = `00:${time}`;
    time--;

    if (time === 0) {
      clearInterval(interval);
      timer.textContent = `00:00`;

      if (!turn) {
        xScore++;

        xWin.textContent = `X : ${xScore}`;
        xWin.classList.add("winColor");
        setTimeout(() => {
          reStart();
          xWin.classList.remove("winColor");
        }, 1000);

        return winModal("X");
      } else if (turn) {
        oScore++;

        oWin.textContent = `O : ${oScore}`;
        oWin.classList.add("winColor");
        setTimeout(() => {
          reStart();
          oWin.classList.remove("winColor");
        }, 1000);

        return winModal("O");
      }
    }
  }, 10);
}

function cellColorChange(value) {
  value.classList.add("cell-click");
  setTimeout(() => {
    value.classList.remove("cell-click");
  }, 100);
}

function AI() {
  // 처음엔 랜덤하게 시작
  // 그 다음엔 계속 랜덤하게 두다가
  // 사용자가 2개 이상 쌓이면
  // 이를 제지한다.
  // 이를 제지할 확률을 변동시킴에 따라
  // 난이도를 조절한다.
}
