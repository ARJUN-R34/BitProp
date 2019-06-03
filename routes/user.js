var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/userdashboard', function (req, res, next) {
  res.render('userdashboard', { title: 'BitProp' });
});

router.get('/searchproperties', function(req, res) {
  res.render('user_search_properties');
});

router.get('/regproperty', function (req, res) {
  res.render('user_reg_property', { title: 'BitProp' });
});

router.get('/transfer', function (req, res) {
  res.render('user_prop_transfer', { title: 'BitProp' });
});

router.post('/transfer', function (req, res) {
  propertyid = req.body.propertyid;
  newaddress = req.body.newaddress;
  currentaddress = req.body.currentaddress;

  console.log("The ID of property to be transferred is : " , propertyid);
  console.log("The address of current owner is : ", currentaddress);
  console.log("The address of new owner is : ", newaddress);
  console.log("");
  
  Contract.methods.propertyTransfer(propertyid, currentaddress, newaddress).send({from:currentaddress, gas: 6000000}).then((val) => {
    console.log("The transaction details are : " , val);
    console.log("");
    console.log("Land transfer request is sent to the Validator. Validator must accept inorder to complete the transfer");
  }).catch((error) => {
    console.log(error);
  });
  
});

router.post('/register', function(req,res) {

  var region = req.body.region;
  var value = req.body.value;
  var currowner = req.body.currowner;
  var id = req.body.id;

  console.log("The region provided is : ", region);
  console.log("The value provided is : ", value);
  console.log("The current owner account is : ", currowner);
  console.log("");

  Contract.methods.createProperty(region,value,currowner,id).send({from:currowner, gas:6000000}).then((val) => {
    console.log("The transaction details are : " , val);
    console.log("");
    console.log("Property Added Successfully But Unverified By The Registrar");
    console.log("");
    res.render('userdashboard', {
      title: 'BitProp' 
    });
  });
});

router.get('/getproperties', function(req, res, next) {

  //code to retrieve properties using property ID
  var propid = req.query.propid;
  var userid = req.query.userid;
  console.log("The entered property ID is : " , propid);

  Contract.methods.getPropertyDetails(propid).call({from: userid}).then((val) => {
    console.log("The transaction details are : " , val);
    val._status = web3.utils.toBN(val._status).toString();
    val._value = web3.utils.toBN(val._value).toString();

    console.log("The Status is : " , val._status);
    console.log("The region is : " , val._region);
    console.log("The value of the property in Ethers is : " , val._value);
    console.log("The address of current owner is : " , val._currowner);
    console.log("The user who queried this request is : " , userid);

    res.render('user_properties', {data:val});

  }).catch((error) => {
    console.log(error);
  });
});

module.exports = router;
