// Create a 40-card deck: Ace (1) to 10 of each suit
function createDeck() {
  const suits = ["♠", "♣", "♥", "♦"];
  const deck = [];
console.log("Script loaded!");
  for (let suit of suits) {
    for (let value = 1; value <= 10; value++) {
      deck.push({ suit, value });
    }
  }

  return deck;
}

// Draw 6 unique cards from the deck
function drawUniqueCards(deck, count = 6) {
  const shuffled = deck.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Display drawn cards
function displayCards(cards) {
  const cardDisplay = document.getElementById("cardDisplay");
  cardDisplay.innerHTML = cards.map(card =>
    `<div class="card">${card.value}${card.suit}</div>`
  ).join("");
}

// Draw a random number (1–40)
function drawRandomNumber() {
  return Math.floor(Math.random() * 40) + 1;
}

// Display random number
function displayNumber(number) {
  document.getElementById("numberDisplay").textContent = number;
}

// Run 500 simulations and track suit/value frequencies
function runSimulations(numSimulations = 500) {
  const suitCounts = { "♠": 0, "♣": 0, "♥": 0, "♦": 0 };
  const valueCounts = {};

  for (let i = 1; i <= 10; i++) {
    valueCounts[i] = 0;
  }

  for (let i = 0; i < numSimulations; i++) {
    const deck = createDeck();
    const draw = drawUniqueCards(deck, 6);

    draw.forEach(card => {
      suitCounts[card.suit]++;
      valueCounts[card.value]++;
    });
  }

  displaySimulationResults(suitCounts, valueCounts, numSimulations);
}

// Display simulation results in HTML
function displaySimulationResults(suits, values, totalDraws) {
  const suitDiv = document.getElementById("suitResults");
  const valueDiv = document.getElementById("valueResults");

  suitDiv.innerHTML = "<h4>Suits</h4><ul>" +
    Object.entries(suits).map(([suit, count]) =>
      `<li>${suit}: ${count} (${((count / (totalDraws * 6)) * 100).toFixed(2)}%)</li>`
    ).join("") + "</ul>";

  valueDiv.innerHTML = "<h4>Values</h4><ul>" +
    Object.entries(values).map(([value, count]) =>
      `<li>${value}: ${count} (${((count / (totalDraws * 6)) * 100).toFixed(2)}%)</li>`
    ).join("") + "</ul>";
}

// Reset display
function resetApp() {
  document.getElementById("cardDisplay").innerHTML = "";
  document.getElementById("numberDisplay").textContent = "";
  document.getElementById("suitResults").innerHTML = "";
  document.getElementById("valueResults").innerHTML = "";
  document.getElementById("historyLog").innerHTML = "";
}

// Save custom suit order (placeholder)
function saveSuitOrder() {
  const select = document.getElementById("suitOrderSelect");
  const selected = Array.from(select.selectedOptions).map(opt => opt.value);
  alert("Saved suit order: " + selected.join(", "));
}

// Event listeners
document.getElementById("drawButton").addEventListener("click", () => {
  const deck = createDeck();
  const drawnCards = drawUniqueCards(deck, 6);
  const randomNumber = drawRandomNumber();

  displayCards(drawnCards);
  displayNumber(randomNumber);

  const historyLog = document.getElementById("historyLog");
  const entry = document.createElement("li");
  entry.textContent = `Draw: ${drawnCards.map(c => `${c.value}${c.suit}`).join(" ")} | Number: ${randomNumber}`;
  historyLog.prepend(entry);
});

document.getElementById("simulateButton").addEventListener("click", () => {
  runSimulations(500);
});

document.getElementById("resetButton").addEventListener("click", resetApp);
