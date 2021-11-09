
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
                this.deck.push(new Card(suits[suit], rank));
            }
        }
    }

    shuffle() {
        let m = this.deck.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = this.deck[m];
            this.deck[m] = this.deck[i];
            this.deck[i] = t;
        }
    }

    deal() {
        return this.deck.pop();
    }
}