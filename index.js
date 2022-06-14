// const boxes_array = [...document.querySelectorAll(".box")];
const boxesArray = document.querySelectorAll(".box");
const turnText = document.querySelector(".turn");
const turnTextPlayer = document.querySelector(".current_player");

let currentTurn = true;
// true = p1; false = p2

boxesArray.forEach(function (box) {
  box.addEventListener("click", (event) => {
    let clicked_box = box.getAttribute('value');
    insertPiece(box);
    updateTurn(box);
  });
});


function insertPiece(box) {
    let existing_pieces = box.innerText;
    let num_Xs = existing_pieces.split("x").length - 1;
    let num_Os = existing_pieces.split("o").length - 1;
    if (num_Xs == 3) {
        console.log("this square has been fully claimed, please pick another");
        updateTurn(box);
        return;
    } else if (num_Os == 3) {
        console.log("this square has been fully claimed, please pick another");
        updateTurn(box);
        return;
    } 
    
    let span = document.createElement("span");
    let symbol = (currentTurn ? 'x' : 'o');
    let piece = document.createTextNode(symbol);

    (currentTurn ? span.style.color = "blue" : span.style.color = "red");
    span.appendChild(piece);
    box.appendChild(span);
}

function updateTurn(box) {
    currentTurn = !currentTurn;
    turnTextPlayer.innerHTML = (currentTurn ? '1 (x)' : '2 (o)');
    turnText.classList.toggle('red');

}
