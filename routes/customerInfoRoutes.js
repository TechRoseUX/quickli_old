const {ensureAuthenticated} = require('../helpers/auth');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const Customer = mongoose.model('customers');
const User = mongoose.model('users');
const Vehicle = mongoose.model('vehicles');
const Service = mongoose.model('services');

module.exports = (app) => {
    app.get('/api/customers', (req, res) => {
        const customers = [
          {id: 1, firstName: 'John', lastName: 'Doe'},
          {id: 2, firstName: 'Brad', lastName: 'Traversy'},
          {id: 3, firstName: 'Mary', lastName: 'Swanson'},
        ];
        res.json(customers);
      });
      
      //All Customers Page
      app.get('/all-customers', async (req, res) => {
        const rcs = await Customer.find({user: req.user.userid});
        const realCustomers = Array.from(rcs);
        res.json(realCustomers);
      });

      app.get('/all-customers', async (req, res) => {
        const rcs = await Customer.find({user: req.user.userid});
        const realCustomers = Array.from(rcs);
        res.json(realCustomers);
      });

      app.get('/customers/:customerid', async (req, res) => {
        console.log('loading customer info')
      })

      //Edit Customer Info Page
      app.get('/customer/edit/:customerid', async (req, res) => { 
      })
      
      //Customer Vehicles Page 
      app.get('/customer-vehicles', async (req, res) => {
        console.log(req.body);
        const vs = await Vehicle.find({});
        console.log(`yooooo ${vs}`);
        const customerVehicles = Array.from(vs);
        res.json(customerVehicles);
      });
      
      //Customer Services Page 
      app.get('/customer/vehicles-services', async (req, res) => {
        const myJSON = JSON.stringify(req.user);
        console.log(`first boooo ${myJSON}`);
        const vs = await Service.find({user: req.user.userid});
        console.log(`boooooooo ${vs}`);
        const customerServices = Array.from(vs);
        res.json(customerServices);
      });
      
      app.post('/customers', (req, res) => {
        console.log(req.body);
      });
      
      app.post('/new-customer', (req, res) => {
        console.log(req.body);
        var uniqid = Date.now();
        var user = req.user.userid
      
        Customer.findOne({email: req.body.email})
          .then(customer => {
            if(customer) {
              res.redirect('/');
            } else {
              var uniqid = Date.now();
              const newCustomer = new Customer ({
                  customerid: uniqid,
                  date: uniqid,
                  user: user,
                  name: req.body.cname,
                  email: req.body.email,
                  phoneNumber1: req.body.pnumber,
                  phoneNumber2: req.body.pnumber2,
                });
              newCustomer.save();
            }
          })
      });

      
      app.post('/new-vehicle/:customerid', (req, res) => {
        console.log(`HEREEE PROPS ${req.body.values}`)
        var uniqid = Date.now();
        var num2;
        
        if (!req.body.values.pnumber) {
          num1 = 'No phone number added'
        } else {
          num1 = req.body.values.pnumber
        }
      
        const newVehicle = new Vehicle ({
            user: req.body.props.selectedCustomer.user,
            date: uniqid,
            vehicleid: uniqid,
            ownerid: req.body.props.selectedCustomer.customerid,
            phoneNumber1: num1,
            phoneNumber2: req.body.values.pnumber2,
            vehicleYear: req.body.values.vyear,
            vehicleMake: req.body.values.vmake,
            vehicleModel: req.body.values.vmodel,
            vehicleLicenseNumber: req.body.values.lpnumber,
            vehicleVinNumber: req.body.values.vnumber,
            vehicleMileage: req.body.values.mileage,
        });
        newVehicle.save();
      });
}