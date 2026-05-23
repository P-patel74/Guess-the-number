let secret = [
  Math.floor(Math.random() * 10),
  Math.floor(Math.random() * 10),
  Math.floor(Math.random() * 10),
  Math.floor(Math.random() * 10),
];
console.log("Secret Code:", secret);

// Track if players have actually taken their turn
let p1Played = false;
let p2Played = false;
let p1Score = 0;
let p2Score = 0;

let output = document.getElementById("output");

function getGuess(prefix) {
  let guess = [];
  for (let i = 1; i <= 4; i++) {
    let val = document.getElementById(prefix + "_" + i).value;
    // Handle empty inputs as -1 so they don't accidentally match 0
    if (val === "") {
      guess.push(-1);
    } else {
      guess.push(Number(val));
    }
  }
  return guess;
}

function checkMatches(guess) {
  let matches = 0;
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secret[i]) {
      matches++;
    }
  }
  return matches;
}

function checkForWinner() {
  if (p1Score === 4) {
    showWinnerPopup("🏆 PLAYER 1 WINS!");
    output.innerHTML =
      "<h2>Player 1 Guessed the Secret!</h2>" + output.innerHTML;
  } else if (p2Score === 4) {
    showWinnerPopup("🏆 PLAYER 2 WINS!");
    output.innerHTML =
      "<h2>Player 2 Guessed the Secret!</h2>" + output.innerHTML;
  }
  // If you want to handle both getting 4 at once:
  else if (p1Score === 4 && p2Score === 4) {
    showWinnerPopup("🏆 BOTH WIN!");
  }
}

function player1() {
  let guess = getGuess("p1");
  p1Score = checkMatches(guess);

  document.getElementById("p1_result").innerHTML = "Matches: " + p1Score;
  output.innerHTML =
    `<p>Player 1 got ${p1Score} matches</p>` + output.innerHTML;

  checkForWinner();
}

function player2() {
  let guess = getGuess("p2");
  p2Score = checkMatches(guess);

  document.getElementById("p2_result").innerText = "Matches: " + p2Score;
  output.innerHTML =
    `<p>Player 2 got ${p2Score} matches</p>` + output.innerHTML;

  checkForWinner();
}

function showWinnerPopup(text) {
  let popup = document.createElement("div");
  popup.innerHTML = text;
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.background = "black";
  popup.style.color = "White";
  popup.style.padding = "40px";
  popup.style.fontSize = "40px";
  popup.style.fontWeight = "bold";
  popup.style.borderRadius = "15px";
  popup.style.zIndex = "9999";
  popup.style.textAlign = "center";

  document.body.appendChild(popup);
  setTimeout(() => {
    popup.remove();
  }, 3000);
}
