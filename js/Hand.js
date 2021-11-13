const limit = 21;

class Hand {
    constructor(numCards = 0,type) {
        this.numCards = numCards;
        this.cards = [];
        this.points = 0;
        this.type = type;
    }

    deleteCards() {
        this.cards = [];
        this.numCards = 0;
    }

    addCard(card) {
        this.cards.push(card);
        this.numCards++;
        this.points = this.getPoints();
    }

    getNumCards() {
        return this.numCards;
    }

    getPoints() {
        let points = 0;
        this.cards.forEach(card => {
            points += card.value === 1 ? this.checkAs(points) : card.getPoints();
        });
        return points;
    }

    checkAs(points) {
        if (points + 11 > limit) {
            return 1;
        }
        return 11;
    }

    toString() {
        let str = "";
        this.cards.forEach(card => {
            str += card.toString() + " ";
        });
        return str;
    }

}