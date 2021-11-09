window.onload = function () {
    const deck = new Deck();
    deck.shuffle();
    console.log(deck.deal());
};
