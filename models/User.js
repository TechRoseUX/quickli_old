const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema ({
    date:{
        type: String,
        required: true
    },
    userid:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
});

mongoose.model('users', UserSchema)