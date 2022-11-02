//=============================IMPORTS AND LIBRARIES==============================//
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require('mongoose');
const cors = require("cors")
require('dotenv/config')

const app = express();

//=================================MIDDLEWARES====================================//

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());

//================================ROUTES MIDDLEWARES===============================//

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')

//=====================================ROUTES======================================//

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/categories', categoryRouter)

//==============================DATABASE CONNECTION===============================//

mongoose.connect(process.env.DATABASE_URL, {
    dbName: 'alphabeq'
}).then(data => {
    console.log('successfully connected: ' + data);
}).catch(err => {
    console.log(err.message);
})

//=================================RUNNING SERVER==================================//

app.listen(3000, () => {
    console.log('server is running http://localhost:3000 ');
});