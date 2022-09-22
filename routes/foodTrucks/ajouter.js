var express = require('express');
var router = express.Router();
const foodTruckModel = require('./../../models/foodTrucks/foodTruckModel')

const connection = require('../../config/mysql')




/* GET home page. */
router.get('/ajouter', function(req, res, next) {
  console.log("eeee", res.locals.flash)
  res.render('foodTrucks/ajouter', { title: 'Ajouter ' });
});


/* POST Message. */
router.post('/ajouter', function(req, res, next) {
  let foodTruckModelObj = new foodTruckModel()
  foodTruckModelObj.createFoodTruck(req, (data) => {
    req.flash('succes', "tout est OK")
    res.redirect('/foodTrucks/ajouter');
  })
});

module.exports = router;
