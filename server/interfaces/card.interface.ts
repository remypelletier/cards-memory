import DeckEntity from '../entities/deck.entity';

interface Card {
    id?: number;
    name: string;
    answer: string;
    deck?: DeckEntity;
}

export default Card;
