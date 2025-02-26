const userService = require('../services/userService');

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, phone, address } = req.body;
        const role = "user";
        const result = await userService.registerUser(fullName, email, password, phone, address, role);


        if (!fullName || !email || !password || !phone || !address) {
            return res.status(400).json({ message: "fill in all fields" });
        }

        return res.status(201).json(result);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser(email, password);

        if (!email || !password) {
            return res.status(400).json({ message: "fill in all fields" });
        }

        return res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userService.getUser(id);

        return res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email, password, phone, address } = req.body;
        const result = await userService.update(id, fullName, email, password, phone, address);

        return res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

const deletedUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteUser(id);

        return res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    updateUser,
    deletedUser
}