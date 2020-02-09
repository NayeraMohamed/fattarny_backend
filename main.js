<<<<<<< HEAD
const joi = require('joi');  
const mongo = require('mongodb');
const express = require('express');
const app = express();

/////////////////////////
app.use(express.json())
app.use(express.urlencoded({extended: true}))

var userRouter = require('./routes/users');
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World')
});

const port = process.env.PORT || 3000;
=======
const joi = require('joi');  
const mongo = require('mongodb');
const express = require('express');
const app = express();

/////////////////////////
app.use(express.json())
app.use(express.urlencoded({extended: true}))

var userRouter = require('./routes/users');
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World')
});

const port = process.env.PORT || 3000;
>>>>>>> 6105d16353e9e92754704cafcdcbc4e8244bed8b
app.listen(port, () => console.log(`Listening on port ${port}`));