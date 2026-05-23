const authService = require('../services/authService');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const { user, token } = await authService.login(email, password);
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const { user, token } = await authService.register(name, email, password);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { loginUser, registerUser };