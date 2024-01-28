const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Cars']
    const result = await mongodb.getDatabase().db().collection('w03-04Project').find();
    result.toArray().then((cars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Cars']
    const carId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('w03-04Project').find({ _id: carId });
    result.toArray().then((cars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars[0]);
    });
};


const createCar =  async (req, res) => {
    //#swagger.tags=['Cars']
    const { brand, model, year, color, price } = req.body;

    // makes all fields require fields.
    if (!brand || !model || !year || !color || !price) {
        return res.status(400).json({ error: 'All fields are require.' });
    }

    // Validates the year is a year between 1900 - Now
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        return res.status(400).json({ error: 'Year of fabrication no valid.' });
    }

    // Validates if the price is a positive number
    if (isNaN(price) || price <= 0) {
        return res.status(400).json({ error: 'Price no valid.' });
    }
    const car = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        price: req.body.price,
    };
    try {
        const response = await mongodb.getDatabase().db().collection('w03-04Project').insertOne(car);
        if (response.acknowledged) {
            return res.status(204).send();
        } else {
            return res.status(500).json(response.error || 'Some error occurred while updating the car.');
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateCar = async (req, res) => {
    //#swagger.tags=['Cars']
    const carId = new ObjectId(req.params.id);
    const { brand, model, year, color, price } = req.body;

    // makes all fields require fields.
    if (!brand || !model || !year || !color || !price) {
        return res.status(400).json({ error: 'All fields are require.' });
    }
     // Validates the year is a year between 1900 - Now
     if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        return res.status(400).json({ error: 'Year of fabrication no valid.' });
    }

    // Validates if the price is a positive number
    if (isNaN(price) || price <= 0) {
        return res.status(400).json({ error: 'Price no valid.' });
    }
    const car = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        price: req.body.price,
    };
    try {
        const response = await mongodb.getDatabase().db().collection('w03-04Project').replaceOne({ _id: carId }, car);
        if (response.modifiedCount > 0) {
            return res.status(204).send();
        } else {
            return res.status(500).json(response.error || 'Some error occurred while updating the car.');
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const deleteCar = async (req, res) => {
    //#swagger.tags=['Cars']
    const carId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('w03-04Project').deleteOne({_id: carId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the car.');
    }
};


module.exports = {
    getAll,
    getSingle,
    createCar,
    updateCar,
    deleteCar
};