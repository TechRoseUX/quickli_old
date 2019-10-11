const {ensureAuthenticated} = require('../helpers/auth');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Nexmo = require('nexmo');

const Service = mongoose.model('services');
const Vehicle = mongoose.model('vehicles');
const ToMessage = mongoose.model('tomessages');

const nexmo = new Nexmo({
  apiKey: 'af28ed02',
  apiSecret: 'oBk3EUcKwrSzi3CN'
}, {debug: true})

module.exports = (app) => {
    app.post('/customers/service/:customerid/:serviceid', (req, res) => {
        console.log(`CONSOLE.LOG${req.body}`);
        var uniqid = Date.now();
      
        const newService = new Service ({
            user: req.body.props.selectedVehicle.user,
            date: uniqid,
            serviceid: uniqid,
            customerid: req.body.props.selectedVehicle.ownerid,
            vehicleid: req.body.props.selectedVehicle.vehicleid,
            customerName: req.body.values.name,
            phoneNumber: req.body.values.pnumber,
            mileage: req.body.values.mileage,
            reason: req.body.values.reason,
            tagNumber: req.body.values.tnumber,
            details: req.body.detailsText,
            status: true
        });
        newService.save()
        
      });

      //Update service info to end the process
      app.post('/end-service', async (req, res) => { 
        const myjson = JSON.stringify(req.body.props.selectedServiceMessage)
        console.log(`MYJSONNNNNNNNNNNNNNNNNNN${myjson}`);

        const newDetails = req.body.detailsText
        const serviceNum = req.body.props.selectedServiceMessage.serviceid
        var myquery = { serviceid: serviceNum };
        var newvalues = { $set: { details: newDetails, status: false } };

        Service.updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err
          console.log("1 document updated");
        })
        .then(() => {
          var vid = req.body.props.selectedServiceMessage.vehicleid
          var vmiles = req.body.values.mileage
          var vquery = { vehicleid: vid }
          var newMiles = { $set: {vehicleMileage: vmiles } };
  
          Vehicle.updateOne(vquery, newMiles, function(err, res) {
            if (err) throw err
            console.log('mileage has been updated')
          })
        })
      })
      
      //Chat Messenger
      app.get('/customers/chat/service', async (req, res) => {
        const as = await Service.find({user: req.user.id, status: true});
        const activeServices = Array.from(as);
        res.json(activeServices);
      })
      
      app.get('/customers/chat/service/messages', async (req, res) => {
        const ams = await ToMessage.find({active: true});
        const activeToMessages = Array.from(ams);
        res.json(activeToMessages);
      })
      
      app.post('/customers/chat/service', (req, res) => {
        console.log(`MESSAGES${req.body}`)
        var uniqid = Date.now();
        console.log(req.body.textMessage)
      
        const textMessage = req.body.textMessage
        const phoneNumber = `1${req.body.phoneNumber}`
      
        nexmo.message.sendSms(
          '17344123962', phoneNumber, textMessage, { type: 'unicode'},
          (err, responseData) => {
            if(err) {
              console.log(err);
            } else {
              console.dir(responseData);
            }
          }
        )
      
        const newMessage= new ToMessage ({
            messageid: uniqid,
            date: uniqid,
            textMessage: textMessage,
            phoneNumber: phoneNumber,
            serviceid: req.body.serviceid,
            vehicleid: req.body.vehicleid,
            customerid: req.body.customerid,
            user: req.body.user,
            active: true
        });
        newMessage.save();
      })
}