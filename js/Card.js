class Card {
    constructor(suit, value, name) {
        this.suit = suit;
        this.value = value;
        this.name = name;
    }

    getSuit() {
        return this.suit;
    }

    getValue() {
        return this.value;
    }

    toString() {
        return this.name;
    }

    //get cardPoints
    getPoints() {
        if (this.value > 10) {
            return 10;
        } else {
            return this.value;
        }
    }
}
