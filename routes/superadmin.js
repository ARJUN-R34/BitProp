var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/superadmindashboard', function (req, res, next) {
    res.render('superadmindashboard', {
        title: 'BitProp'
    });
});

router.get('/newadmin', function (req, res, next) {
    res.render('superadmin_add_new_admin', {
        title: 'BitProp'
    });
});

router.post('/addnewadmin', function (req, res) {
    adminid = req.body.prop;
    region = req.body.region;
    console.log("The region provided is : " , region);
    console.log("The admin ID provided is : ", adminid);
    console.log("The coinbase account is : ", coinbase);
    console.log("");

    //code for adding admin using admin address
    Contract.methods.createAdmin(region, adminid).send({
            from: coinbase,
            gas: 6000000
        }).then((val) => {
        console.log("The transaction details are : " , val);
        console.log("");
        console.log("Admin Appointed Successfully");
        console.log("");
        res.render('superadmindashboard', {
            title: 'BitProp'
        });
    });
});


module.exports = router;
