const db = require('./db');
const express = require('express');

const quotesRouter = express.Router();

const getAllQuotes = (req, res) => {
    
    db.query('SELECT * FROM quotes ORDER BY id ASC', (err, data) => {
        if(err) {
            throw err;
        }

        res.status(200).json(data.rows);
    });
}

const getQuote = (req, res) => {
    const id = parseInt(req.params.id);

    db.query('SELECT * FROM quotes WHERE id=$1', [ id ], (err, data) => {
        if(err) {
            throw err;
        }

        res.status(200).json(data.rows);
    });
}

const addQuote = (req, res, next) => {
    const { quote, author } = req.body;

    db.query('INSERT INTO quotes (quote, author) VALUES ($1, $2) RETURNING *', [quote, author], (err, data) => {
        if(err) {
            throw err;
        }

        res.status(201).send(`Quote added with ID: ${data.rows[0].id}`);
    });
}

const editQuote = (req, res) => {
    const id = parseInt(req.params.id);
    const { quote, author } = req.body;

    db.query('UPDATE quotes SET quote = $1, author = $2 WHERE id = $3', [quote, author, id], (err, data) => {
        if(err) {
            throw err;
        }

        res.status(200).send(`Quote updated with ID: ${id}`);
    });
} 

const deleteQuote = (req, res) => {
    const id = parseInt(req.params.id);
    
    db.query('DELETE FROM quotes WHERE id = $1', [id], (err, data) => {
        if(err) {
            throw err;
        }

        res.status(200).send(`Quote deleted with id: ${id}`);
    });
}

const checkInput = (req, res, next) => {
    const { quote, author } = req.body;

    console.log(quote, author);

    if(quote === "" || author === "") {
        console.error('Quotes must have text and an author.');
    }

    next();
}

quotesRouter.get('/', getAllQuotes);
quotesRouter.get('/:id', getQuote);
quotesRouter.post('/', checkInput, addQuote);
quotesRouter.put('/:id', checkInput, editQuote);
quotesRouter.delete('/:id', deleteQuote);


module.exports = quotesRouter;