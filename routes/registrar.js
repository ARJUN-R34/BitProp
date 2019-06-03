var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/registrardashboard', function (req, res, next) {
    res.render('registrardashboard', {
        title: 'BitProp'
    });
});

router.get('/searchuserproperties', function (req, res) {
    res.render('registrar_search_properties');
});

router.get('/propertyrequests', function (req, res) {
    res.render('registrar_property_requests');
});

router.get('/ownershiprequests', function (req, res) {
    res.render('registrar_ownership_requests');
});

router.get('/addnewuser', function (req, res) {
    res.render('reg_add_user', {
        title: 'BitProp'
    });
});

// router.get('/transfer', function (req, res) {
//     res.render('user_prop_transfer', {
//         title: 'BitProp'
//     });
// });

router.post('/adduser', function (req, res) {
    useraddress = req.body.useraddress;
    regaddress = req.body.regaddress;
    console.log("The Registrar's address is : " , regaddress);
    console.log("The given User's address is : " , useraddress);
    console.log("");
    Contract.methods.createUser(useraddress).send({
        from: regaddress,
        gas: 6000000
    }).then((val) => {
        console.log("The transaction details are : " , val);
        console.log("");
        console.log("User Added Successfully");
        console.log("");
        res.render('registrardashboard' , { title: 'BitProp' });
    });
});

// router.post('/register', function (req, res) {

// });

router.post('/approveproperty', function (req, res) {
    
    //code to accept properties
    var propid = req.body.propid;
    var regid = req.body.regid;
    console.log("The Entered Property ID is : ", propid);
    console.log("The Entered Registrar ID is : " , regid);

    Contract.methods.approveProperty(propid).send({
            from: regid,
            gas: 6000000
        }).then((val) => {
        console.log("The transaction details are : ", val);
        // val.status = web3.utils.toBN(val.status).toString();
        // val.region = web3.utils.toBN(val.region).toString();
        // val.value = web3.utils.toBN(val.value).toString();
        // val.currowner = web3.utils.toBN(val.currowner).toString();
        console.log("Approved Successfully");

        res.render("registrardashboard", {title: 'BitProp'});
    });
});


router.post('/rejectproperty', function (req, res) {

    //code to reject properties
    var propid1 = req.body.propid1;
    var regid1 = req.body.regid1;
    console.log("The entered property ID is : ", propid1);
    console.log("The entered Registrar ID is : ", regid1);

    Contract.methods.rejectProperty(propid1).send({
        from: regid1,
        gas: 6000000
    }).then((val) => {
        console.log("The transaction details are : ", val);
        // val.status = web3.utils.toBN(val.status).toString();
        // val.region = web3.utils.toBN(val.region).toString();
        // val.value = web3.utils.toBN(val.value).toString();
        // val.currowner = web3.utils.toBN(val.currowner).toString();
        console.log("Rejected Successfully");

        res.render("registrardashboard", {
            title: 'BitProp'
        });
    });
});

router.get('/getproperties', function (req, res, next) {

    //code to retrieve properties using property ID
    var propid = req.query.propid;
    var regid = req.query.regid;
    console.log("The entered property ID is : ", propid);

    Contract.methods.getPropertyDetails(propid).call({
        from: regid
    }).then((val) => {
        console.log("The transaction details are : ", val);
        val._status = web3.utils.toBN(val._status).toString();
        val._value = web3.utils.toBN(val._value).toString();

        console.log("The Status is : ", val._status);
        console.log("The region is : ", val._region);
        console.log("The value of the property in Ethers is : ", val._value);
        console.log("The address of current owner is : ", val._currowner);
        console.log("The user who queried this request is : ", regid);

        res.render('reg_properties', {
            data: val
        });

    }).catch((error) => {
        console.log(error);
    });
});

router.post('/transfer', function(req, res) {


    //Code to accept Property Transfer Requests
    var propid = req.body.propid;
    var newowner = req.body.newowner;
    var regid = req.body.regid;

    console.log("The property ID of the property to be transferred is : " , propid);
    
    Contract.methods.acceptOwnershipTransfer(propid, newowner).send({from:regid, gas:6000000}).then((val) => {
        console.log("The transaction details are : " , val);
        console.log("");
        console.log("The property transfer is done successfully");
    });

});


module.exports = router;
