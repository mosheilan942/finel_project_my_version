import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import STATUS_CODES from "../utils/StatusCodes.js";
import RequestError from "../types/errors/RequestError.js";
import generateToken from "../utils/jwtUtils.js";
import authService from "../services/authService.js";
import userValidation from "../utils/validations/userValidation.js";
import User from "../types/User.js";
import jwt, { JwtPayload } from "jsonwebtoken";
// @desc    Auth user & get token
// @route   POST /api/users/auth/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { error } = userValidation(req.body);
    if (error) throw new RequestError(error.message, STATUS_CODES.BAD_REQUEST);
    if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET not defined");
            process.exit(1);
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // req.userId = (decoded as JwtPayload).userId;
            // throw new RequestError('User already logged in', STATUS_CODES.BAD_REQUEST);
        } catch (error) {
            console.error(error);
            throw new RequestError(
                "Not authorized, token failed",
                STATUS_CODES.UNAUTHORIZED
            );
        }
    }
    const { email, password } = req.body;
    console.log(email, password);
    const user = await authService.authUser(email, password);
    console.log("i am user:", user);
    if (!user.userid){
        throw new RequestError("User not found", STATUS_CODES.NOT_FOUND)
        ;} 
    const store_token = generateToken(res, user.userid)
   
    res.json({
        store_token,
        id: user.userid,
        email: user.email,
    });
});
// @desc    Logout user / clear cookie
// @route   POST /api/users/auth/logout
// @access  Public
const logoutUser = (_req: Request, res: Response) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(STATUS_CODES.OK).json({ message: "Logged out successfully" });
};
export default { loginUser, logoutUser };
