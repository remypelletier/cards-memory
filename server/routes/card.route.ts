import express = require('express');
import CardController from "../controllers/card.controller";

const router = express.Router();

router.route('/')
    .get(CardController.findAll)
    .post(CardController.add)

    router.route('/:id')
    .get(CardController.findOne)
    .patch(CardController.update)
    .delete(CardController.delete)

export default router;
