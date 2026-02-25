import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log("Mongoose connected successfully!");
    } catch (error) {
        console.log("Mongoose connection error", error);
        process.exit(1);
    }
};

export default connectDB;