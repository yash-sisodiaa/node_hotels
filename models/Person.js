const mongoose = require('mongoose');

//define person schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age:{
        type: Number  
    },
    work:{
        type: String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type: Number,
        required:true
    },
    email:{
        type: String,
        unique:true,
        required:true
    },
    mobile:{
        type: Number,
        required:true
    }
}) 

//create person model
const Person = mongoose.model('Person',personSchema);
module.exports=Person;