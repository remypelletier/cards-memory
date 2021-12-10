import Card from "../interfaces/card.interface";
import CardModel from "../models/card.model";
import Controller from "../interfaces/controller.interface";

class CardController implements Controller {

    public static findAll(req, res): void {
        if (req.query.hasOwnProperty('getAnswer')
            && req.query.getAnswer === 'true'
            && req.query.hasOwnProperty('deckId')) {
                CardModel.getAllAnswerByDeckId(req.query.deckId)
                .then(cards => {
                    res.send(cards);
                }).catch((e) => {
                    //error
                })
        } else {
            const filters = Object.entries(req.query);
            CardModel.getAll(buildWhereClause(filters))
            .then(cards => {
                res.send(cards);
            }).catch((e) => {
                //error
            })
        }
    }
    public static findOne(req, res): void {
        CardModel.getOne(req.params.id)
        .then(card => {
            res.send(card);
        }).catch((e => {
            //error
        }));
    }
    public static add(req, res): void {
        const card: Card = {
            name: req.body.name,
            answer: req.body.answer,
            deck: req.body.deckId
        }
        CardModel.post(card)
        .then(card => {
            res.send(card);
        }).catch(e => {
            //error
        })
    }
    public static update(req, res): void {
        const card: Card = {
            id: req.params.id,
            name: req.body.name,
            answer: req.body.answer
        }
        console.log(card);
        CardModel.patch(card)
        .then(card => {
            res.send(card);
        }).catch(e => {
            //error
        });
    }
    public static delete(req, res): void {
        CardModel.delete(req.params.id)
        .then(card => {
            res.send(card);
        }).catch(e => {
            //error
        });
    }

}

const buildWhereClause = (filters) => {
    const find = {
        where: {
            deck: ''
        }
    };
    const validFilters = filters.map((filter) => {
        if (filter[0] === 'deckId') {
            find.where.deck = filter[1];
            return true;
        }
    });
    return validFilters.length > 0 ? find : {};
}

export default CardController
