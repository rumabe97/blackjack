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
        playerSelector.appendChild(createNodePlayer());
    }
}

function createNodePlayer() {
    const player = document.createElement("div");
    player.classList.add("playerSelector__player")
    player.innerHTML = `<P>Player ${playerSelector.childElementCount + 1} type:</P>`;
    player.innerHTML += `<input type="radio" id="bot" name="player${playerSelector.childElementCount + 1}" value="bot"> <label for="bot">Bot</label>`;
    player.innerHTML += `<input type="radio" id="player" name="player${playerSelector.childElementCount + 1}" value="player"> <label for="player">Player</label>`;
    return player;
}

function addPlayer() {
    playerSelector.appendChild(createNodePlayer());
}

function startGame() {
    const numPlayers = playerSelector.children;

    for (player of numPlayers) {
        const type = player.children[3].checked ? "player" : "bot";
        players.push(createPlayer(type));
    }
    bank = createPlayer('bank');
    document.getElementById("start").style.display = "none";
    document.getElementById("bank").style.display = "flex";
    document.getElementById("players").style.display = "flex";

    printPlayerCards();
    printBankCards();
}

function createPlayer(type) {
    const playerHand = new Hand(0, type);

    playerHand.addCard(deck.deal());
    playerHand.addCard(deck.deal());
    return playerHand;
}

function printPlayerCards() {
    const playerCard = document.getElementById("playerCards");
    playerCard.appendChild(printCard(players[0].cards[0]));
    playerCard.appendChild(printCard(players[0].cards[1]));
    
}
function printBankCards() {
    const bankCards = document.getElementById("bankCards");
    bankCards.appendChild(printCard(bank.cards[0]));
    bankCards.appendChild(printCard('back'));
}

function printCard(card) {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('bankHand__card');
    cardDiv.classList.add('zoom');

    let x;

    switch (card?.suit) {
        case suits[3]:
            x = "0%";
            break;
        case suits[0]:
            x = "20%";
            break;
        case suits[1]:
            x = "40%";
            break;
        case suits[2]:
            x = "60%";
            break;
        default:
            x = "80%";
    }
    const cardValue = card?.value ?? 1;
    const calc = 8.3333 * (cardValue - 1);
    cardDiv.style.backgroundPosition = calc + "%" + "" + x;
    return cardDiv;
}
