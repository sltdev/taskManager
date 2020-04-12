const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(name) {
            if (name.length <= 0) {
                throw new Error("Please fill in a name");
            }
        }

    },
    age: {
        type: Number,
        required: true,
        validate(age) {
            if (age < 18) {
                throw new Error('Participates must be 18 years of age or older');
            }
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate(address) {
            if (!validator.isEmail(address)) {
                throw new Error('Please enter a valid email address');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(secret) {
            if (secret.length <= 6 || secret.includes('password')) {
                throw new Error("Please select a password longer than 6 characters and that doesn't include the term password");
            }
        }
    }
});


userSchema.pre('save', async function () {

    const user = this;

    if (user.isModified('password')) {
        const userPassword = user.password;
        const salt = await bcrypt.genSaltSync(8);
        const hash = await bcrypt.hashSync(userPassword, salt);

        user.password = hash;
    }
    
});



const NewUser = mongoose.model('user', userSchema);


module.exports = NewUser;