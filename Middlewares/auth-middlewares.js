//this is where we will put our authentication middleware that will check if the user is authenticated to access the protected routes
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    //get the token from the request header
    //the token is sent in the format "Bearer <token>"
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. No token provided. Please login to continue",
        });
    }
    // Decode the token

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // attach user info from the auth-controller to request
        req.userInfo = decodedToken;
        next();
    } catch (error) {
        console.log(error, "Error decoding token");
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        });
    }

}

export default authMiddleware;
