import CardEntity from '../entities/card.entity';
import Model from '../interfaces/model.interface';
import { getManager } from 'typeorm';
import Card from '../interfaces/card.interface';

class CardModel implements Model {

    public static async getAll(filters?: Object): Promise<CardEntity[]> {
        const cards = await CardEntity.find(filters);
        return cards;
    }
    public static async getOne(id: number): Promise<CardEntity> {
        const cards = await CardEntity.findOne({ where: {id: id} });
        return cards;
    }
    public static async post(card: Card): Promise<CardEntity> {
        const cardToSave = new CardEntity();
        cardToSave.name = card.name;
        cardToSave.answer = card.answer;
        cardToSave.deck = card.deck;
        return await cardToSave.save();
    }
    public static async patch(card: Card): Promise<CardEntity> {
        const cardToSave = await CardEntity.findOne({ where: {id: card.id} })
        if (card.name !== undefined)
            cardToSave.name = card.name;
        if (card.answer !== undefined)
            cardToSave.answer = card.answer;
        return await cardToSave.save();
    }
    public static async delete(id: number): Promise<CardEntity> {
        const cardToRemove = await CardEntity.findOne({ where: {id: id} });
        return await cardToRemove.remove();
    }
    /**
     * Get all answers by deckId
     * @returns card
     */
    public static async getAllAnswerByDeckId(id) {
        const entityManager = getManager();
        const card = entityManager.query(`
            SELECT card.id, card.name, card.answer, answer.answer_category_code, answer.date FROM card
            LEFT JOIN deck ON card.deck_id = deck.id
            LEFT JOIN answer ON card.id = answer.card_id
            WHERE deck.id = ${id}
            ORDER BY answer.date DESC;
        `);
        return card;
    }

}

export default CardModel;
