let deck;
let players = [];
let playerSelector;

window.onload = function () {
    deck = new Deck();
    deck.shuffle();
    playerSelector = document.getElementById("playerSelector");

    printPlayerSelector();
}

function printPlayerSelector() {
    for (let i = 2; i <= 4; i++) {
        playerSelector.appendChild(createNodoPlayer());
    }
}

function createNodoPlayer() {
    const player = document.createElement("div");
    player.classList.add("playerSelector__player")
    player.innerHTML = `<P>Player ${playerSelector.childElementCount+1} type:<P>`;
    player.innerHTML += `<input type="radio" id="boot" name="player${playerSelector.childElementCount+1}" value="boot"> <label for="boot">Boot</label>`;
    player.innerHTML += `<input type="radio" id="player" name="player${playerSelector.childElementCount+1}" value="player"> <label for="boot">Player</label>`;
    return player;
}

function addPlayer() {
    playerSelector.appendChild(createNodoPlayer());
}

function startGame() {
    const count = playerSelector.childElementCount;

    for (let i = 0; i < count; i++) {
        players.push(createPlayer());
    }
    console.log(players);
}

function createPlayer() {
    const playerHand = new Hand();

    playerHand.addCard(deck.deal());
    playerHand.addCard(deck.deal());
    return playerHand;
}