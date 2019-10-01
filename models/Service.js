const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ToMessageSchema = require('./ToMessage');

//Create Schema
const ServiceSchema = new Schema ({
    user:{
        type: String,
        required: true
    },
    serviceid:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
    customerid:{
        type: String,
        required: true
    },
    customerName:{
        type: String,
        required: true
    },
    vehicleid:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    mileage:{
        type: String,
        required: true
    },
    reason:{
        type: String,
        required: true
    },
    tagNumber:{
        type: String,
        required: true
    },
    details:{
        type: String
    },
    status:{
        type: Boolean,
        required: true
    }
});

mongoose.model('services', ServiceSchema)