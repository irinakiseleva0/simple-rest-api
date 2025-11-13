import * as carService from "../services/carService.js";

export const getAllCars = (req, res) => {
    try {
        const cars = carService.getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

export const getCarById = (req, res) => {
    try {
        const { id } = req.params;
        const car = carService.getCarById(id);

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.status(200).json(car);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

export const createCar = (req, res) => {
    try {
        const newCar = carService.createCar(req.body);
        res.status(201).json(newCar);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

export const updateCar = (req, res) => {
    try {
        const { id } = req.params;
        const updatedCar = carService.updateCar(id, req.body);

        if (!updatedCar) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

export const deleteCar = (req, res) => {
    try {
        const { id } = req.params;
        const deleted = carService.deleteCar(id);

        if (!deleted) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};
