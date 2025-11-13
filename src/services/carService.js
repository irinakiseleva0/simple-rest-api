import Car from "../models/Car.js";

export const getAllCars = () => {
    return Car.findAll();
};

export const getCarById = (id) => {
    return Car.findById(id);
};

export const createCar = (carData) => {
    const { make, model, year } = carData;

    if (!make || !model || !year) {
        const error = new Error("make, model and year are required");
        error.status = 400;
        throw error;
    }

    const numericYear = Number(year);
    if (Number.isNaN(numericYear) || numericYear < 1900 || numericYear > 2100) {
        const error = new Error("year must be a valid number between 1900 and 2100");
        error.status = 400;
        throw error;
    }

    return Car.create({
        ...carData,
        year: numericYear
    });
};

export const updateCar = (id, carData) => {
    const numericYear =
        carData.year !== undefined ? Number(carData.year) : undefined;

    if (carData.year !== undefined) {
        if (
            Number.isNaN(numericYear) ||
            numericYear < 1900 ||
            numericYear > 2100
        ) {
            const error = new Error(
                "year must be a valid number between 1900 and 2100"
            );
            error.status = 400;
            throw error;
        }
    }

    const updatedCar = Car.update(id, {
        ...carData,
        ...(numericYear !== undefined ? { year: numericYear } : {})
    });

    return updatedCar;
};

export const deleteCar = (id) => {
    return Car.delete(id);
};
