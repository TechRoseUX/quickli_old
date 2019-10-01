const {ensureAuthenticated} = require('../helpers/auth');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Nexmo = require('nexmo');

const Service = mongoose.model('services');
const ToMessage = mongoose.model('tomessages');

const nexmo = new Nexmo({
  apiKey: 'af28ed02',
  apiSecret: 'oBk3EUcKwrSzi3CN'
}, {debug: true})

module.exports = (app) => {
    app.post('/customers/service/:customerid', (req, res) => {
        console.log(`CONSOLE.LOG${req.body}`);
        var uniqid = Date.now();
      
        const newService = new Service ({
            user: req.body.props.selectedVehicle.user,
            serviceid: uniqid,
            customerid: req.body.props.selectedVehicle.ownerid,
            vehicleid: req.body.props.selectedVehicle.vehicleid,
            customerName: req.body.values.name,
            phoneNumber: req.body.values.pnumber,
            mileage: req.body.values.mileage,
            reason: req.body.values.reason,
            tagNumber: req.body.values.tnumber,
            details: 'yo',
            status: true
        });
        newService.save();
      });
      
      //Chat Messenger
      app.get('/customers/chat/service', async (req, res) => {
        const as = await Service.find({user: req.user.id, status: 'open'});
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
            textMessage: textMessage,
            phoneNumber: phoneNumber,
            serviceid: req.body.serviceid,
            vehicleid: req.body.vehicleid,
            user: req.body.user,
            active: true
        });
        newMessage.save();
      })
}