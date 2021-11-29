import Deck from './deck.interface';

interface Card {
    id: number;
    name: string;
    answer: string;
    deck: Deck;
}

export default Card;
