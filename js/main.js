let deck;
let players = [];
let playerSelector;
let bank;

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
    player.innerHTML = `<P>Player ${playerSelector.childElementCount + 1} type:</P>`;
    player.innerHTML += `<input type="radio" id="bot" name="player${playerSelector.childElementCount + 1}" value="bot"> <label for="bot">Bot</label>`;
    player.innerHTML += `<input type="radio" id="player" name="player${playerSelector.childElementCount + 1}" value="player"> <label for="player">Player</label>`;
    return player;
}

function addPlayer() {
    playerSelector.appendChild(createNodoPlayer());
}

function startGame() {
    const numPlayers = playerSelector.children;

    for (player of numPlayers) {
        const type = player.children[3].checked ? "player" : "bot";
        players.push(createPlayer(type));
    }
    bank = createPlayer('bank');
    document.getElementById("start").style.display = "none";
}

function createPlayer(type) {
    const playerHand = new Hand(0, type);

    playerHand.addCard(deck.deal());
    playerHand.addCard(deck.deal());
    return playerHand;
}