const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const UserController = {
    registerUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ username, password: hashedPassword });
            res.status(201).json(newUser);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({ error: "Invalid username or password" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid username or password" });
            }
            const token = jwt.sign({ userId: user._id }, "secret_key"); 
            res.json({ token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    
    }
};

module.exports = UserController;
