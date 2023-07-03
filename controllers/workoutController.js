const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//get all workouts

const getWorkouts = async (req, res) => { 
    const user_id = req.user.id;
    const workouts = await Workout.find({user_id }).sort({createdAt:-1});
    res.status(200).json(workouts)
}

//get a single workouts

const getWorkout = async (req, res) => { 
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg:"No such workout found"})
    }
    const workout = await Workout.findById(id);

    if(!workout){
        return res.status(404).json({msg:"No such workout found"})
    }
    res.status(200).json(workout)
}


const createWorkout = async (req, res) => {
const {title, reps, load} = req.body;

let emptyFields = [];
if(!title) emptyFields.push('title');
if(!reps) emptyFields.push('reps');
if(!load) emptyFields.push('load');

if(emptyFields.length > 0){
    return res.status(400).json({error: "Please fill in all the field", emptyFields})
}

try{
    const user_id = req.user.id;
    const workout = await Workout.create({ title,reps,load, user_id })
     res.status(200).json(workout)
   
}catch(err){
    res.status(400).json({error:err.message})
}

}

//delete a wrokout
const deleteWorkout = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg:"No such workout found"})
    }
    const workout =   await Workout.findOneAndDelete({_id:id});

    if(!workout){
        return res.status(404).json({msg:"No such workout found"})
    }

    res.status(200).json(workout)
}

// update a workout

 const updateWorkout = async (req, res) => {
    const {id} = req.params;
    // const {title, reps, load} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg:"No such workout found"})
    }
    const workout =   await Workout.findOneAndUpdate({_id:id},{...req.body});

    if(!workout){
        return res.status(404).json({msg:"No such workout found"})
    }

    res.status(200).json(workout)
 }

module.exports = {
    createWorkout,getWorkouts,getWorkout,deleteWorkout,updateWorkout
}