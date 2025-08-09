// Your full JavaScript code here (moved from <script> tag)
// Including the dares, board logic, rollDice(), etc.

const board = document.getElementById('board');
const log = document.getElementById('log');
const turnDisplay = document.getElementById('turnDisplay');

const numPlayers = 4;
const playerSymbols = ['🔴 Player 1', '🔵 Player 2', '🟢 Player 3', '🟡 Player 4'];
const playerClasses = ['p1', 'p2', 'p3', 'p4'];
let currentPlayer = 0;
let playerPositions = Array(numPlayers).fill(1);

const dares = [
  "Do 10 jumping jacks!",
  "Sing a song for 10 seconds 🎤",
  "Act like a chicken for 15 seconds 🐔",
  "Dance without music for 20 seconds 💃",
  "Say the alphabet backwards!",
  "Tell a funny joke 😄",
  "Do your best animal impression 🐯",
  "Compliment every other player 😊",
  "Speak in a robot voice for the next round 🤖",
  "Make a silly face and hold it for 10 seconds 😜",
  "Do 5 push-ups 💪",
  "Make a silly face and hold it for 10 seconds 😜",
  "Spin around 3 times without falling 🌀",
  "Hop on one leg for 10 seconds 🦵",
  "Say the alphabet backwards 🔤",
  "Pretend to be a cat for 15 seconds 🐱",
  "Do a quick impression of your favorite cartoon character 🎭"
];

const snakes = {
  98: 78,
  95: 75,
  93: 73,
  87: 24,
  64: 60,
  62: 19,
  17: 7
};

const ladders = {
  4: 14,
  9: 31,
  28: 84,
  40: 59,
  51: 67,
  63: 81
};

const cells = [];

function getRowColor(row) {
  if (row < 2) return 'row-red';
  if (row < 4) return 'row-orange';
  if (row < 7) return 'row-green';
  return 'row-blue';
}

function buildBoard() {
  board.innerHTML = "";
  for (let row = 9; row >= 0; row--) {
    for (let col = 0; col < 10; col++) {
      const num = row % 2 === 0
        ? row * 10 + col + 1
        : row * 10 + (9 - col) + 1;

      const cell = document.createElement('div');
      cell.className = `cell ${getRowColor(row)}`;
      cell.innerText = num;

      if (snakes[num]) {
        cell.classList.add('snake');
        cell.innerHTML += `<br>🐍 to ${snakes[num]}`;
      } else if (ladders[num]) {
        cell.classList.add('ladder');
        cell.innerHTML += `<br>🪜 to ${ladders[num]}`;
      }

      board.appendChild(cell);
      cells[num] = cell;
    }
  }
}

function renderPlayers() {
  document.querySelectorAll('.player').forEach(p => p.remove());
  playerPositions.forEach((pos, idx) => {
    const dot = document.createElement('div');
    dot.className = `player ${playerClasses[idx]}`;
    cells[pos].appendChild(dot);
  });
}

function rollDice() {
  if (turnDisplay.textContent.includes("Game Over")) {
    log.innerHTML = "Game over. Please reset.";
    return;
  }

  const roll = Math.floor(Math.random() * 6) + 1;
  let pos = playerPositions[currentPlayer];
  let next = pos + roll;

  log.innerHTML = `${playerSymbols[currentPlayer]} rolled <b>${roll}</b>!`;

  if (next > 100) {
    log.innerHTML += `<br>Need exact number to reach 100. Still at ${pos}.`;
  } else {
    if (ladders[next]) {
      log.innerHTML += `<br>🪜 Ladder! Climb to ${ladders[next]}`;
      next = ladders[next];
    } else if (snakes[next]) {
      const dare = dares[Math.floor(Math.random() * dares.length)];
      log.innerHTML += `<br>🐍 Snake! Slide to ${snakes[next]}<br><b style="color:crimson;">🎯 Dare:</b> ${dare}`;
      alert(`🐍 Oh no! You got bitten by a snake!\n🎯 Your Dare: ${dare}`);
      next = snakes[next];
    }
    playerPositions[currentPlayer] = next;
  }

  renderPlayers();

  if (playerPositions[currentPlayer] === 100) {
    log.innerHTML += `<br>🎉 ${playerSymbols[currentPlayer]} wins!`;
    turnDisplay.textContent = "🏁 Game Over";
    return;
  }

  currentPlayer = (currentPlayer + 1) % numPlayers;
  turnDisplay.textContent = `Turn: ${playerSymbols[currentPlayer]}`;
}

function resetGame() {
  currentPlayer = 0;
  playerPositions = Array(numPlayers).fill(1);
  turnDisplay.textContent = `Turn: ${playerSymbols[currentPlayer]}`;
  log.innerHTML = "Game reset.";
  renderPlayers();
}
document.getElementById('startBtn').addEventListener('click', function() {
  document.getElementById('startScreen').style.display = 'none';
});

buildBoard();
renderPlayers();


