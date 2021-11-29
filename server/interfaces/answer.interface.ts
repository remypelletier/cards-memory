import Card from './card.interface';
import Test from './test.interface';
import AnswerCategory from './answerCategory.interface';

interface Answer {
    card: number | Card;
    test: number | Test;
    answerCategory: string | AnswerCategory;
    date: Date;
}

export default Answer;
