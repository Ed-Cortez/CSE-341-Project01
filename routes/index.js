const routes = require('express').Router();
const carController = require('../controllers/cars.js');

routes.use('/', require('./swagger'));

routes.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});
routes.use('/cars', require('./cars'));
// routes.get('/', cars);



module.exports = routes;