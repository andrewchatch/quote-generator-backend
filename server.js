const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const quotesRouter = require('./quotes');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8001;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.send({"message": 'Connection successful'});
});

app.use('/quotes', quotesRouter);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = app;