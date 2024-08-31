
import jsonwebtoken from "jsonwebtoken";

const validateJWT = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json(
            {message: "Unauthorized"}
        );
    }
    try {
        const { uid } = jsonwebtoken.verify(token.split(" ")[1], process.env.SECRET);
        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export { validateJWT };
