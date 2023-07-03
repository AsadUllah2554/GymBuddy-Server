
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema is a blueprint for the data that will be saved in the database
const workoutSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},{timestamps:true})

// Model is a wrapper for the schema, it is used to perform CRUD operations on the database
// Workout is name of sinlge Collection, It will create a collections named workouts to store workout
module.exports = mongoose.model('Workout', workoutSchema);
