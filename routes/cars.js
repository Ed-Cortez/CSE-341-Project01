const routes = require('express').Router();
const carController = require('../controllers/cars');
const { isAuthenticated } = require("../middleware/authenticate");


routes.get('/', carController.getAll);
routes.get('/:id', carController.getSingle);

routes.post('/', isAuthenticated, carController.createCar);
routes.put('/:id', isAuthenticated, carController.updateCar);
routes.delete('/:id', isAuthenticated, carController.deleteCar);


module.exports = routes;
