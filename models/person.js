const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');

//Define person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String
    },
    mobile: {
        type: String,
        required: true
    },
    emails: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

personSchema.pre('save', async function(next){
    const person = this;

    // hash the password olny if it is modified (or its new)
    if(!person.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        // hash password generate
        const hashedPassword = await bcrypt.hash(person.password, salt);

        person.password = hashedPassword;

        next();
    }catch(err){
        console.log(err);
        next();
    }
})

personSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        // use bcrypt to compare provided password and hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
};


// create person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;