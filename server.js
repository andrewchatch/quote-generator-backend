const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const quotesRouter = require('./quotes');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8001;

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.send({"message": 'Connection successful'});
});

app.use('/quotes', quotesRouter);


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = app;