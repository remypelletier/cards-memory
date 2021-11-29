import DeckEntity from '../entities/deck.entity';
import Model from '../interfaces/model.interface';
import Deck from '../interfaces/deck.interface';

class DeckModel implements Model {

    public static async getAll(filters?: Object): Promise<DeckEntity[]> {
        const decks = await DeckEntity.find(filters);
        return decks;
    }
    public static async getOne(id: number): Promise<DeckEntity> {
        const deck = await DeckEntity.findOne({ where: {user: id} });
        return deck;
    }
    public static async post(deck: Deck): Promise<DeckEntity> {
        const deckToSave = new DeckEntity();
        deckToSave.name = deck.name;
        deckToSave.user = deck.user;
        return await deckToSave.save();
    }
    public static async patch(deck: Deck): Promise<DeckEntity> {
        const deckToSave = await DeckEntity.findOne({ where: {id: deck.id} })
        deckToSave.name = deck.name;
        return await deckToSave.save();
    }
    public static async delete(id: number): Promise<DeckEntity> {
        const deckToRemove = await DeckEntity.findOne({ where: {id: id} });
        return await deckToRemove.remove();
    }

}

export default DeckModel;
