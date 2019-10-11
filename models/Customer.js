const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CustomerSchema = new Schema ({
    customerid:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    phoneNumber1:{
        type: String,
        required: true
    },
    phoneNumber2:{
        type: String,
    },
    email:{
        type: String,
        required: true
    }
});

mongoose.model('customers', CustomerSchema)