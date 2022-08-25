const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet  = require('helmet');
require('dotenv').config()
const middlewares = require('./middlewares');
const bodyParser = require('body-parser');

const app = express();
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(bodyParser.json({type : 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/v1', (req, res) => {
    res.json({
        message: 'Entry point'
    })
});

app.use(middlewares.errorHandler);
app.use(middlewares.notFound);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})