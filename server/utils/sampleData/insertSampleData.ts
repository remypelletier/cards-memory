import User from "../../entities/user.entity";
import UserRole from "../../entities/userRole.entity";
import Deck from "../../entities/deck.entity";
import Card from "../../entities/card.entity";
import AnswerCategory from "../../entities/answerCategory.entity";
import TestCategory from "../../entities/testCategory.entity";
import Answer from "../../entities/answer.entity";
import Test from "../../entities/test.entity";
import * as data from "./sampleData.json";

export const insertSampleData = async () => {

    const createUser = (userToSave) => {
        const user = new User();
        user.firstName = userToSave.firstName;
        user.lastName = userToSave.lastName;
        user.email = userToSave.email;
        user.password = userToSave.password;
        user.userRoleCode = userToSave.userRoleCode;
        // default config
        user.resetPasswordLink = '';
        user.resetPasswordLinkExpirationTimestamp = 0;
        user.pictureName = '';
        user.AverageAnswerTimeInSeconds = 0;
        return user.save();
    }

    const createUserRole = (userRoleToSave) => {
        const userRole = new UserRole();
        userRole.code = userRoleToSave.code;
        userRole.label = userRoleToSave.label;
        return userRole.save();
    }

    const createDeck = (deckToSave) => {
        const deck = new Deck();
        deck.id = deckToSave.id;
        deck.name = deckToSave.name;
        deck.user = deckToSave.user_id;
        return deck.save();
    }

    const createCard = (cardToSave) => {
        const card = new Card();
        card.id = cardToSave.id;
        card.name = cardToSave.name;
        card.answer = cardToSave.answer;
        card.deck = cardToSave.deck_id;
        return card.save();
    }

    const createAnswerCategory = (answerCategoryToSave) => {
        const answerCategory = new AnswerCategory();
        answerCategory.code = answerCategoryToSave.code;
        answerCategory.label = answerCategoryToSave.label;
        return answerCategory.save();
    }

    const createTestCategory = (testCategoryToSave) => {
        const testCategory = new TestCategory();
        testCategory.code = testCategoryToSave.code;
        testCategory.label = testCategoryToSave.label;
        return testCategory.save();
    }

    const createTest = (testToSave) => {
        const test = new Test();
        test.id = testToSave.id;
        test.testCategory = testToSave.test_category_code;
        return test.save();
    }

    const createAnswer = (answerToSave) => {
        const answer = new Answer();
        answer.card = answerToSave.card_id;
        answer.test = answerToSave.test_id;
        answer.answerCategory = answerToSave.answer_category_code;
        answer.date = answerToSave.date;
        return answer.save();
    }

    await Promise.all(data.userRoles.map(async (userRole) => {
        await createUserRole(userRole);
    }));

    await Promise.all(data.users.map(async (user) => {
        await createUser(user);
    }));

    await Promise.all(data.decks.map(async (deck) => {
        await createDeck(deck);
    }))

    await Promise.all(data.cards.map(async (card) => {
        await createCard(card);
    }));

    await Promise.all(data.answerCategories.map(async (answerCategory) => {
        await createAnswerCategory(answerCategory);
    }))

    await Promise.all(data.testCategories.map(async (testCategory) => {
        await createTestCategory(testCategory);
    }))

    await Promise.all(data.tests.map(async (test) => {
        await createTest(test);
    }));

    await Promise.all(data.answers.map(async (answer) => {
        await createAnswer(answer);
    }))

};