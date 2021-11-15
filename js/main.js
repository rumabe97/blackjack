let deck;
let players = [];
let playerSelector;
let bank;
let numPlayer = 0;

window.onload = start;

function start() {
    deck = new Deck();
    deck.shuffle();
    playerSelector = document.getElementById("playerSelector");

    printPlayerSelector();
}

function printPlayerSelector() {
    for (let i = 2; i <= 5; i++) {
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
    if (playerSelector.childElementCount >= 7) return;
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
    printBankCardsFirst();
}

function createPlayer(type) {
    const playerHand = new Hand(0, type);

    playerHand.addCard(deck.deal());
    playerHand.addCard(deck.deal());
    return playerHand;
}

function printPlayerCards() {
    const playerCard = document.getElementById("playerCards");
    playerCard.innerHTML = "";
    players[numPlayer].cards.forEach(card => {
        playerCard.appendChild(printCard(card));
    });
    document.getElementById('points').innerHTML = `Points : ${players[numPlayer].getPoints()}`;
}

function addCard() {
    if (players[numPlayer].getPoints() >= 21) return;
    players[numPlayer].addCard(deck.deal());
    if (players[numPlayer].getPoints() > 21) {
        document.getElementById('info').innerHTML = `You Lose`;
        document.getElementById('stick').innerHTML = 'Continue';
    }
    printPlayerCards();
}

function stickPlayer() {
    numPlayer++;
    if (numPlayer >= players.length) {
        printBankCards();
        playBot(bank);
        return;
    }
    printPlayerCards();
    document.getElementById('stick').innerHTML = players[numPlayer].type === 'bot' ? 'Continue' : "Stick";
    document.getElementById('stick').disabled = players[numPlayer].type === 'bot' ? true : false;
    document.getElementById('getCard').disabled = players[numPlayer].type === 'bot' ? true : false;

    if (players[numPlayer].type === 'bot') {
        playBot(players[numPlayer]);
    }
}

function playBot(player) {
    while (true) {
        if (player.getPoints() < 17) {
            player.addCard(deck.deal());
            player.type === 'bot' ? printPlayerCards() : printBankCards();
        } else {
            document.getElementById('stick').disabled = false;
            break;
        }
    }
    if (player.type === 'bot') document.getElementById('info').innerHTML = `Player ${numPlayer + 1} finish (${player.getPoints() > 21 ? 'lose' : player.getPoints()}), please press continue`;
}

function printBankCards() {
    const bankCard = document.getElementById("bankCards");
    bankCard.innerHTML = "";
    bank.cards.forEach(card => {
        bankCard.appendChild(printCard(card));
    });
    document.getElementById('pointsBank').innerHTML = `Points : ${bank.getPoints()}`;
}

function printBankCardsFirst() {
    const bankCards = document.getElementById("bankCards");
    bankCards.appendChild(printCard(bank.cards[0]));
    bankCards.appendChild(printCard('back'));
    document.getElementById('pointsBank').innerHTML = `Points : ${bank.getPoints() - bank.cards[1].value}`;
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
