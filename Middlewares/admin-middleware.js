

const isAdmin = (req, res, next) => {
    const { role } = req.userInfo;
    if (role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Unauthorized. Admin access required",
        });
    }
    next();
}

export default isAdmin;
