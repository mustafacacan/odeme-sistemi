const { Address } = require("../models");

const getAddress = async () => {
    try {
        const address = await Address.findAll();
        return address;
    }
    catch (err) {
        return { message: err.message };
    }
}

const addAddress = async (userId, fullName, phone, city, district, street, buildingNo, doorNo, zipCode, addressType) => {
    try {
        const newAddress = await Address.create({ userId, fullName, phone, city, district, street, buildingNo, doorNo, zipCode, addressType });
        return newAddress;
    }
    catch (err) {
        return { message: err.message };
    }
}

const updateAddress = async (userId, fullName, phone, city, district, street, buildingNo, doorNo, zipCode, addressType) => {
    try {
        const address = await Address.findByPk(id);
        if (!address) {
            return { message: "Address not found" };
        }

        const updatedAddress = await address.update({ userId, fullName, phone, city, district, street, buildingNo, doorNo, zipCode, addressType });
        return updatedAddress;
    }
    catch (err) {
        return { message: err.message };
    }
}

const deleteAddress = async (id) => {
    try {
        const address = await Address.findByPk(id);
        if (!address) {
            return { message: "Address not found" };
        }

        await address.destroy();
        return { message: "Address deleted successfully" };
    }
    catch (err) {
        return { message: err.message };
    }
}

const getAddressById = async (id) => {
    try {
        const address = await Address.findByPk(id);
        if (!address) {
            return { message: "Address not found" };
        }

        return address;
    }
    catch (err) {
        return { message: err.message };
    }
}

module.exports = { getAddress, addAddress, updateAddress, deleteAddress, getAddressById };