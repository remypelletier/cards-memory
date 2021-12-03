import DeckEntity from '../entities/deck.entity';
import Model from '../interfaces/model.interface';
import Deck from '../interfaces/deck.interface';
import { getManager } from 'typeorm';

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
    /**
     * Get all answers number by category
     * @returns deck
     */
    public static async getAllAnswerCategoryNumberByUserId(id) {
        const entityManager = getManager();
        const deck = entityManager.query(`
            SELECT deck.name,
            COUNT(DISTINCT card.id) as cardNumber,
            COUNT(answer.answer_category_code) as answerNumber,
            COUNT(CASE WHEN answer.answer_category_code = "GOOD" THEN 1 END) AS answerCategoryNumberGood,
            COUNT(CASE WHEN answer.answer_category_code = "ALMOST" THEN 1 END) AS answerCategoryNumberAlmost,
            COUNT(CASE WHEN answer.answer_category_code = "NOT_ANSWERED" THEN 1 END) AS answerCategoryNumberNotAnswered,
            COUNT(CASE WHEN answer.answer_category_code = "NEED_REVIEW" THEN 1 END) AS answerCategoryNumberNeedReview
            FROM deck
            LEFT JOIN card on card.deck_id = deck.id
            LEFT JOIN answer on answer.card_id = card.id
            WHERE deck.user_id = ${id}
            GROUP BY deck.id
        `);
        return deck;
    }

}

/*

select deck.name, COUNT(DISTINCT card.id) as cardNumber, COUNT(answer.answer_category_code) as answerNumber,
COUNT(CASE WHEN answer.answer_category_code = "GOOD" THEN 1 END) AS answerNumberGood,
COUNT(CASE WHEN answer.answer_category_code = "ALMOST" THEN 1 END) AS answerNumberAlmost,
COUNT(CASE WHEN answer.answer_category_code = "NOT_ANSWERED" THEN 1 END) AS answerNumberNotAnswered,
COUNT(CASE WHEN answer.answer_category_code = "REVIEW" THEN 1 END) AS answerNumberReview
FROM deck
LEFT JOIN card on card.deck_id = deck.id
LEFT JOIN answer on answer.card_id = card.id
GROUP BY deck.id

*/

export default DeckModel;
