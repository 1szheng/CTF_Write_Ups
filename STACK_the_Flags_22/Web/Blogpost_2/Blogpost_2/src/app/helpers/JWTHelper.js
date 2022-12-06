import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const SECRET = crypto.randomBytes(69).toString('hex');


export async function sign(data) {
    return jwt.sign(data, SECRET, {
        algorithm: 'HS256'
    });
}

export async function verify(token) {
    return jwt.verify(token, SECRET, {
        algorithm: 'HS256'
    });
}
