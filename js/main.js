let deck;
window.onload = function () {
    deck = new Deck();
    deck.shuffle();

    startGame();
}

function startGame() {
    const playerHand = new Hand();

    playerHand.addCard(deck.deal());
    playerHand.addCard(deck.deal());
    console.log(playerHand);
}

