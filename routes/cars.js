const express = require('express');
const routes = require('express').Router();
const carController = require('../controllers/cars');


routes.get('/', carController.getAll);
routes.get('/:id', carController.getSingle);

routes.post('/', carController.createCar);
routes.put('/:id', carController.updateCar);
routes.delete('/:id', carController.deleteCar);


module.exports = routes;
