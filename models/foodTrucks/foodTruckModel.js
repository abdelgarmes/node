

const connection = require('../../config/mysql')

class foodTruckModel {

    constructor() {
        
    }

    createFoodTruck(req, cb) { 

        connection.query('INSERT INTO food_trucks SET name = ?', [req.body.name], function (error, results, fields) {
            if (error) throw error
            cb(results)        
          });
    }
}

module.exports = foodTruckModel