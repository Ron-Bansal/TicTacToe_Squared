// const boxes_array = [...document.querySelectorAll(".box")];
const boxesArray = document.querySelectorAll(".box");
const turnText = document.querySelector(".turn");
const turnTextPlayer = document.querySelector(".current_player");

let currentTurn = true;
// true = p1; false = p2
const claimedGridArray = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

boxesArray.forEach(function (box) {
  box.addEventListener("click", (event) => {
    // let clicked_box = box.getAttribute("value");
    // validateMove(box);
    if (!validateMove(box)) {
      return;
    }
    insertPiece(box);
    updateClaimedGrid(box);
    if (checkVictory()) {
      let winner = currentTurn ? "1 (X)" : "2 (O)";
      turnText.innerHTML = "player " + winner + " is the winner!";
      console.log("HEY WE HAVE A WINNER!");
      return;
    }
    // checkVictory();
    updateTurn(box);
  });
});

function validateMove(box) {
  let existing_pieces = box.innerText;

  let num_Xs = existing_pieces.split("x").length - 1;
  let num_Os = existing_pieces.split("o").length - 1;
  if (num_Xs == 3) {
    console.log("this square has been fully claimed, please pick another");
    return false;
  } else if (num_Os == 3) {
    console.log("this square has been fully claimed, please pick another");
    return false;
  } else {
    return true;
  }
}

function insertPiece(box) {
  let existing_pieces = box.innerText;

  let span = document.createElement("span");
  let symbol = currentTurn ? "x" : "o";
  let piece = document.createTextNode(symbol);

  currentTurn ? (span.style.color = "blue") : (span.style.color = "red");
  span.appendChild(piece);
  box.appendChild(span);
}

function updateClaimedGrid(box) {
  let playerNum = currentTurn ? "1" : "2";
  let existing_pieces = box.innerText;

  let box_row = box.getAttribute("value")[0];
  let box_col = box.getAttribute("value")[1];

  let num_Xs = existing_pieces.split("x").length - 1;
  let num_Os = existing_pieces.split("o").length - 1;
  if (num_Xs == 3) {
    claimedGridArray[box_row][box_col] = playerNum;
    console.log("this square has been fully claimed, please pick another");
    return;
  } else if (num_Os == 3) {
    claimedGridArray[box_row][box_col] = playerNum;
    console.log("this square has been fully claimed, please pick another");
    return;
  }

  // claimedGridArray[box_row][box_col] = playerNum;
  console.log(claimedGridArray);
}

function updateTurn(box) {
  currentTurn = !currentTurn;
  turnTextPlayer.innerHTML = currentTurn ? "1 (x)" : "2 (o)";
  turnText.classList.toggle("red");
}

function checkVictory() {
  let winnerGlow = currentTurn ? "blue_highlight" : "red_highlight";
  let w1, w2, w3;
  for (let row in [0, 1, 2]) {
    if (
      claimedGridArray[row][0] > 0 &&
      claimedGridArray[row][0] == claimedGridArray[row][1] &&
      claimedGridArray[row][1] == claimedGridArray[row][2]
    ) {
      if (row == 0) {
        [w1, w2, w3] = [0, 1, 2];
      } else if (row == 1) {
        [w1, w2, w3] = [3, 4, 5];
      } else {
        [w1, w2, w3] = [6, 7, 8];
      }
      boxesArray[w1].classList.toggle(winnerGlow);
      boxesArray[w2].classList.toggle(winnerGlow);
      boxesArray[w3].classList.toggle(winnerGlow);
      return true;
    }
  }
  for (let col in [0, 1, 2]) {
    if (
      claimedGridArray[0][col] > 0 &&
      claimedGridArray[0][col] == claimedGridArray[1][col] &&
      claimedGridArray[1][col] == claimedGridArray[2][col]
    ) {
      if (col == 0) {
        [w1, w2, w3] = [0, 3, 6];
      } else if (col == 1) {
        [w1, w2, w3] = [1, 4, 7];
      } else {
        [w1, w2, w3] = [2, 5, 8];
      }
      boxesArray[w1].classList.toggle(winnerGlow);
      boxesArray[w2].classList.toggle(winnerGlow);
      boxesArray[w3].classList.toggle(winnerGlow);
      return true;
    }
  }

  if (
    claimedGridArray[0][0] > 0 &&
    claimedGridArray[0][0] == claimedGridArray[1][1] &&
    claimedGridArray[1][1] == claimedGridArray[2][2]
  ) {
    boxesArray[0].classList.toggle(winnerGlow);
    boxesArray[4].classList.toggle(winnerGlow);
    boxesArray[8].classList.toggle(winnerGlow);
    return true;
  }
  if (
    claimedGridArray[0][2] > 0 &&
    claimedGridArray[0][2] == claimedGridArray[1][1] &&
    claimedGridArray[1][1] == claimedGridArray[2][0]
  ) {
    boxesArray[2].classList.toggle(winnerGlow);
    boxesArray[4].classList.toggle(winnerGlow);
    boxesArray[6].classList.toggle(winnerGlow);
    return true;
  }
  return false;
}
