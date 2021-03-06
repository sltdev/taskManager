const mongoose = require('mongoose');


// const Schema = new mongoose.Schema({
//     title:{
//         type: String,
//         required: true,
//         trim: true
//     },
//     description:{
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed:{
//         type: Boolean,
//         default: false
//     }
// });



const Task = mongoose.model('task', {
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    }
});




module.exports = Task;