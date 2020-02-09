const joi = require('joi');  
const mongo = require('mongodb');
const express = require('express');
const app = express();

const RestaurantsRouter = require('./routes/restaurants');
const ItemsRouter = require('./routes/items');
const OrdersRouter = require('./routes/orders');

/////////////////////////
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/restaurants', RestaurantsRouter);
app.use('/items', ItemsRouter);
app.use('/orders', OrdersRouter);

var userRouter = require('./routes/users');
app.use('/users', userRouter);
var votesRouter = require('./routes/votes');
app.use('/votes', votesRouter);

app.get('/', (req, res) => {
    res.send('Hello World')
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));