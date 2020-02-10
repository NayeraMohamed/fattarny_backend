const express = require('express');
const app = express();

const RestaurantsRouter = require('./routes/restaurants');
const ItemsRouter       = require('./routes/items');
const OrdersRouter      = require('./routes/orders');
const UserRouter        = require('./routes/users');
const VotesRouter       = require('./routes/votes');
const WinnerRouter      = require('./routes/winnerRestaurants');

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/restaurants', RestaurantsRouter);
app.use('/items', ItemsRouter);
app.use('/orders', OrdersRouter);
app.use('/users', UserRouter);
app.use('/votes', VotesRouter);
app.use('/menuItems', WinnerRouter);

app.get('/', (req, res) => {
    res.send('Hello World')
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));