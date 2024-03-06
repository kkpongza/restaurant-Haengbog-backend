const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config({
    path: './config/config.env'
})

const connectDB = require('./config/db');
connectDB();

const auth = require('./routes/auth');
const orders = require('./routes/order');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(express());
app.use('/haengbog/order', orders);
app.use('/haengbog/auth', auth);

const PORT = 5000 || process.env.PORT;

const server = app.listen(PORT, console.log(`listening to port ${PORT}`));

process.on('unhandledRejection',(err,promise) =>{
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1));
});
