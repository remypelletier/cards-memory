import Deck from "../interfaces/deck.interface";
import DeckModel from "../models/deck.model";
import Controller from "../interfaces/controller.interface";

class DeckController implements Controller {

    public static findAll(req, res): void {
        if (req.query.hasOwnProperty('countAnswer')
            && req.query.countAnswer === 'true'
            && req.query.hasOwnProperty('userId')) {
                DeckModel.getAllAnswerCategoryNumberByUserId(req.query.userId)
                .then(decks => {
                    res.send(decks);
                }).catch((e) => {
                    //error
                })
        } else {
            const filters = Object.entries(req.query);
            DeckModel.getAll(buildWhereClause(filters))
            .then(decks => {
                res.send(decks);
            }).catch((e) => {
                //error
            })
        }
    }
    public static findOne(req, res): void {
        DeckModel.getOne(req.params.id)
        .then(deck => {
            res.send(deck);
        }).catch((e => {
            //error
        }));
    }
    public static add(req, res): void {
        const deck: Deck = {
            name: req.body.name,
            user: req.body.user.id
        }
        DeckModel.post(deck)
        .then(deck => {
            res.send(deck);
        }).catch(e => {
            //error
        })
    }
    public static update(req, res): void {
        const deck: Deck = {
            name: req.body.name,
            id: req.params.id
        }
        DeckModel.patch(deck)
        .then(deck => {
            res.send(deck);
        }).catch(e => {
            //error
        });
    }
    public static delete(req, res): void {
        DeckModel.delete(req.params.id)
        .then(deck => {
            res.send(deck);
        }).catch(e => {
            //error
        });
    }

}

const buildWhereClause = (filters) => {
    const find = {
        where: {
            user: ''
        }
    };
    const validFilters = filters.map((filter) => {
        if (filter[0] === 'userId') {
            find.where.user = filter[1];
            return true;
        }
    });
    return validFilters.length > 0 ? find : {};
}

export default DeckController
