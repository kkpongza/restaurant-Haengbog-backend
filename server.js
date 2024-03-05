const express = require('express');

const dotenv = require('dotenv');
dotenv.config({
    path: './config/config.env'
})

const connectDB = require('./config/db');
connectDB();

const orders = require('./routes/order');

const app = express();

app.use(express.json());

app.use(express());
app.use('/haengbog/order', orders);

const PORT = 5000 || process.env.PORT;

const server = app.listen(PORT, console.log(`listening to port ${5000}`));

process.on('unhandledRejection',(err,promise) =>{
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1));
});