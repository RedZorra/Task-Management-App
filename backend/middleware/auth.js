import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default function auth(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Auth Error' });

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Token is not valid' });
    }
};