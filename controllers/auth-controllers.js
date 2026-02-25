import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// register usser
const registerUser = async (req, res) => {
    try {
        //extract user data from request body
        const { username, email, password, role } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user and save in my database
        const newUser = await User.create({ username, email, password: hashedPassword, role: role || "user" });


        //send response
        if (newUser) {
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: newUser
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Failed to create user",
            });
        }

    } catch (error) {
        console.log(error, "Error registering user");
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        });
    }
}

// login user
const loginUser = async (req, res) => {
    try {
        //getting user login data
        const { username, password } = req.body;

        //check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        //check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }
        // create user or bearer token
        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        //send response

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: user,
            token: accessToken
        });



    } catch (error) {
        console.log(error, "Error logging in user");
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        });
    }
}

const authController = {
    registerUser,
    loginUser
};

export default authController;
