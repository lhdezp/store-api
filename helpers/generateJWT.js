
import jsonwebtoken from "jsonwebtoken";
/**
 * 
 * @param {String} username - username to generate the JWT
 * @param {String} password - password to generate the JWT
 * @returns {String}
 */

const generateJWT = (username, password) => {
    return new Promise((resolve, reject) => {
        const payload = { username, password };
        jsonwebtoken.sign(payload, process.env.SECRET, {
            expiresIn: '24h',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Don\'t can generate JWT');
            } else {
                resolve(token);
            }
        })
    });
};

export { generateJWT };
