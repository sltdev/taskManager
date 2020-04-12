const express = require('express');
const router = new express.Router()
const Task = require('../models/tasks');



//Find all tasks
router.get('/tasks', async (req, res) => {
    const allTasks = await Task.find();
    try {
        res.status(200).send(allTasks)
    } catch (error) {
        res.status(400).send();
    }
});


//Find task by ID
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const task = await Task.findById(_id);
    try {
        if (!task) {
            return res.status(400).send("Sorry this task does not exist");
        }
        res.status(200).send("Task deleted");
    } catch (error) {
        res.status(400).send();
    }
});


//Delete a task
router.delete('/tasks/:del', async (req, res) => {
    const deleteQuery = (req.params.del)
    await Task.findByIdAndDelete(deleteQuery);
    try {
        res.status(200).send("Task deleted");
    } catch (error) {
        res.status(400).send();
    }
});


//Create a task
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        if(!task){
            res.status(400).send();
        }
        await task.save();
        res.status(200).send('Task created and saved to db');
    } catch (error) {
        res.status(400).send();
    }
});


//Update a task
router.patch('/tasks/:id', async (req, res)=>{
    
    
    const update = Object.keys(req.body);
    const properties = ['title', 'description', 'completed']

    const updateValadation = update.every((item)=>{
        return properties.includes(item);
    });


    if(!updateValadation){
        return res.status(400).send("Incorrect property")
    }

    try {
        const updateTask = await Task.findById(req.params.id);
      
        update.forEach((item)=> updateTask[item] = req.body[item]);

        await updateTask.save();
        
        res.status(200).send(updateTask);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;