const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const VehicleSchema = new Schema ({
    user:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    ownerid:{
        type: String,
        required: true
    },
    vehicleid: {
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
    vehicleYear:{
        type: String,
        required: true
    },
    vehicleMake:{
        type: String,
        required: true
    },
    vehicleModel:{
        type: String,
        required: true
    },
    vehicleLicenseNumber:{
        type: String,
        required: true
    },
    vehicleVinNumber:{
        type: String,
        required: true
    },
    vehicleMileage:{
        type: String,
        required: true
    },
});

mongoose.model('vehicles', VehicleSchema)