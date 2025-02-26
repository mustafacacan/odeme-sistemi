const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");


const register = async (fullName, email, password, phone, address, role) => {
    try {
        const exintingUser = await User.findOne({ where: { email } });
        if (exintingUser) {
            return { message: "User already exists" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ fullName, email, password: hashedPassword, phone, address, role });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return { user, token };
    }
    catch (err) {
        return { message: err.message };

    }
}


const login = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return { message: "User not found" };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { message: "Invalid password" };
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return { user, token };
    }
    catch (err) {
        return { message: err.message };
    }
}


const getUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return { message: "User not found" };
        }

        return user;
    }
    catch (err) {
        return { message: err.message };
    }
}


const update = async (id, fullName, email, password, phone, address) => {
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return { message: "User not found" };
        }

        if (name) user.fullName = fullName;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        if (phone) user.phone = phone;
        if (address) user.address = address;

        await user.save();

        return { message: "kullanıc bilgileri başarıyla güncellendi", user };
    }
    catch (err) {
        return { message: err.message };
    }
}

const deleteUser = async (id) => {
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return { message: "User not found" };
        }

        await user.destroy();

        return { message: "User deleted successfully" };
    }
    catch (err) {
        return { message: err.message };
    }
}

module.exports = {
    register,
    login,
    getUser,
    update,
    deleteUser
}