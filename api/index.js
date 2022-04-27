const express= require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const moedaRoute = require('./routes/moedas');
const cors = require('cors');


dotenv.config();
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
     useUnifiedTopology: true,
}).then(console.log("connect to mongo")).catch(err =>console.log(err));

app.use("/api/moedas",moedaRoute);

app.listen("5000", () => {
    console.log("Backend is running");
})