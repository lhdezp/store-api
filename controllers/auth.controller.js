
import { userModel as DB } from "../models/models.js";
import { generateJWT } from "../helpers/generateJWT.js";

const login = async (req,res) => {
    try {
        const { username, password } = req.body;
        const user = await DB.findOne({username});
        if (!user || user.password!==password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const jsonwebtoken = await generateJWT(user, password);
        res.status(200).json({ message: 'Login successful', jsonwebtoken  });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { login };
