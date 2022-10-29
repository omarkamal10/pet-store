import jwt from 'jsonwebtoken';

export default (
	data = {},
	secret = process.env.JwtSecret,
	expiresIn = process.env.JwtLifeTime
) => jwt.sign(data, secret as string, { expiresIn });
