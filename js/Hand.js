const limit = 21;

class Hand {
    constructor(numCards = 0) {
        this.numCards = numCards;
        this.cards = [];
        this.points = 0;
    }

    deleteCards() {
        this.cards = [];
        this.numCards = 0;
    }

    addCard(card) {
        this.cards.push(card);
        this.numCards++;
        this.getPoints();
    }

    getNumCards() {
        return this.numCards;
    }

    getPoints() {
        let points = 0;
        this.cards.forEach(card => {
            points += card.getPoints();
        });
        return points;
    }

    toString() {
        let str = "";
        this.cards.forEach(card => {
            str += card.toString() + " ";
        });
        return str;
    }

}