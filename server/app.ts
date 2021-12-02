import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import deckRouter from './routes/deck.route';
import { auth } from "./middlewares/auth.middleware.";

const app = express();

// cors (change on production)
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// authentication
app.use(auth);

// routes
app.use('/api/decks', deckRouter);

export default app;
