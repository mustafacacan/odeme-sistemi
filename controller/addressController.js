const { where } = require('sequelize');
const addressService = require('../services/addressService');

const get = async (req, res) => {
    try {
        const address = await addressService.getAddress();
        return res.status(200).json(address);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await addressService.getAddressById(id);
        return res.status(200).json(address);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const create = async (req, res) => {
    try {
        const { userId, fullName, phone, city, district, street, buildingNo, doorNo, zipCode, addressType } = req.body;

        const newAddress = await addressService.addAddress(userId, fullName, phone, city, district, street, buildingNo, doorNo, zipCode, addressType);

        if (!userId || !fullName || !phone || !city || !district || !street || !buildingNo || !doorNo || !zipCode || !addressType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        return res.status(201).json(newAddress);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAddress = await addressService.updateAddress(req.body, { where: { id } });

        return res.status(200).json(updatedAddress);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await addressService.deleteAddress({ where: { id } });
        return res.status(200).json(address);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    get,
    getById,
    create,
    update,
    remove
}