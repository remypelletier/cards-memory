import express = require('express');
import DeckController from "../controllers/deck.controller";

const router = express.Router();

router.route('/')
    .get(DeckController.findAll)
    .post(DeckController.add)

    router.route('/:id')
    .get(DeckController.findOne)
    .patch(DeckController.update)
    .delete(DeckController.delete)

export default router;
