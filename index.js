require('dotenv').config()
const express = require('express');
const PORT = process.env.PORT || 4000;

// mongoose is used to create Schemas and Database for the application, it is a ODM, Object Data Modelling
// Like you can Create a schema that for every blog post saved in DB there must be a title, author, date, content
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

const app = express();

// middleware code is executes getting responsce from server and sending a response
// global middleware

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 })
 
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();

})

// routes 
app.get('/', (req, res) => {
    res.json({msg:"Welcome to the app"})
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connection to DB
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log('connected to data server started at !!!', PORT);
    })
})
.catch((err) => { console.log(err)})

export default app;

