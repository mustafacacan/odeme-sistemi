const userService = require('../services/userService');

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, phone, address } = req.body;
        const role = "user";
        const result = await userService.register(fullName, email, password, phone, address, role);


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
        console.log(email, password)

        if (!email || !password) {
            console.log("email veya şifre eksik")
            return res.status(400).json({ message: "fill in all fields" });
        }


        const result = await userService.login(email, password);

        if (result.error) {
            console.log(email, password)
            return res.status(401).json({ message: result.error });
        }

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

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