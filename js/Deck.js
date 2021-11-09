
const suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
class Deck {
    constructor() {
        this.deck = [];
        this.reset();
    }

    reset() {
        this.deck = [];
        for (let suit = 0; suit < 4; suit++) {
            for (let rank = 1; rank <= 13; rank++) {
                const value = rank > 10 ? 10 : rank;
                const name = this.getName(rank);
                this.deck.push(new Card(suits[suit], value, `${name} of ${suits[suit]}`));
            }
        }
    }

    getName(rank) {
        switch (rank) {
            case 1:
                return 'Ace';
            case 11:
                return 'Jack';
            case 12:
                return 'Queen';
            case 13:
                return 'King';
            default:
                return rank;
        }
    }

    shuffle() {
        let arrayLen = this.deck.length;
        let randomIndex;
        let card;
        // While there remain elements to shuffle…
        while (arrayLen) {

            // Pick a remaining element…
            randomIndex = Math.floor(Math.random() * arrayLen--);

            // And swap it with the current element.
            card = this.deck[arrayLen];
            this.deck[arrayLen] = this.deck[randomIndex];
            this.deck[randomIndex] = card;
        }
        console.log(this.deck)
    }

    deal() {
        return this.deck.shift();
    }
}