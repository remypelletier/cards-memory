import express = require('express');
import bodyParser = require('body-parser');
import deckRouter from './routes/deck.route';
import { auth } from "./middlewares/auth.middleware.";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// authentication
app.use(auth);

// routes
app.use('/api/decks', deckRouter);

export default app;
