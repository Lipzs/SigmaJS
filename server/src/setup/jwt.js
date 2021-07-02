import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET;

export const sign = async(payload) => jwt.sign(payload, secret, { expiresIn: 86400 });
export const verify = async(token) => jwt.verify(token, secret);