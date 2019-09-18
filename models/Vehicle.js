const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const VehicleSchema = new Schema ({
    date:{
        type: Date,
        default: Date.now,
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
        required: true
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
    vehicleTagNumber:{
        type: String,
        required: true
    }
});

mongoose.model('vehicles', VehicleSchema)