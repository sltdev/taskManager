const express = require('express');
const router = new express.Router();
const User = require('../models/users');


//Get all users
router.get('/users', async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).send(allUsers);
    } catch (error) {
        res.status(400).send();
    }
});


//Find user by ID
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    const user = await User.findById(_id);
    try {
        if (!user) {
            return res.status(404).send('User not Found');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send();
    }
});


//Delete User
router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;

    await User.findByIdAndDelete(_id);
    try {
        res.status(200).send('User deleted');
        console.log(_id);
    } catch (error) {
        res.status(400).send(error);
    }
});


//Create User
router.post('/users', async (req, res) => {
    const newUser = new User(req.body);

    try {
        if (!newUser) {
            return res.status(400).send()
        }
        await newUser.save()
        res.status(200).send('New users created and saved to db ' + newUser);
    } catch (error) {
        res.status(400).send();
    }
});


//Update User
router.patch('/users/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const properties = ['name', 'age', 'email', 'password'];
    const validateUpdate = updates.every((item) => {
        return properties.includes(item);
    });


    if (!validateUpdate) {
        console.log(`Property not eligible for update: ${validateUpdate}`);
        return res.status(400).send('Property not eligible for update');
    }

    try {

        const user = await User.findById(req.params.id);
        updates.forEach((prop)=>{
            return user[prop] = req.body[prop];
        })

        await user.save();

        res.status(200).send("update" + updates);
    } catch (error) {
        res.status(400).send(error + " Something went wrong")
        console.log(error)
    }

});

module.exports = router;