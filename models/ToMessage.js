const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const MessageSchema = new Schema ({
    user:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
    textMessage:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    serviceid:{
        type: String,
        required: true
    },
    vehicleid:{
        type: String,
        required: true
    },
    active:{
        type: Boolean,
        required: true
    }
});

mongoose.model('tomessages', MessageSchema)