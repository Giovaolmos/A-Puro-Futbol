import { Request, Response, NextFunction } from 'express';

export const registerUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email, name, birthdate, nDni } = req.body;

    if (!username || !password || !email || !name || !birthdate || !nDni) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (username.length > 15) {
        return res.status(400).json({ message: 'Username cannot be more than 15 characters' });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must contain letters and numbers, and be between 8 and 15 characters' });
    }

    if (username === password) {
        return res.status(400).json({ message: 'Username and password cannot be the same' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const birthDateObj = new Date(birthdate);
    const ageInMilliseconds = Date.now() - birthDateObj.getTime();
    const ageDate = new Date(ageInMilliseconds);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age > 120) {
        return res.status(400).json({ message: 'Birthdate cannot indicate an age of more than 120 years' });
    }

    next();
};
