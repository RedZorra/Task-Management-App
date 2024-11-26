import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function registerUser(req, res) {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email});
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}