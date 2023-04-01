import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";

export const register = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) return next(new ErrorHandler("User Already Exist", 404));
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    sendToken(user, res, "Registered Successfully", 201);
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email }).select("+password");
    if (!userExist) return next(new ErrorHandler("Invalid Email or Password", 404));

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) next(new ErrorHandler("Invalid Email or Password", 404));

    sendToken(userExist, res, `Welcome back ${userExist.name}`, 201);
  } catch (error) {
    console.log(error);
  }
};

export const userProfile = (req, res) => {
  try {
    res.status(201).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    res
      .status(201)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUser = async (req, res) => {
  //destructure request query
  const { name, email } = req.query;
  const queryObject = {};

  if (email) {
    queryObject.email = email;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  const users = await User.find(queryObject).select("-password").select("-__v");
  res.status(201).json({
    users,
  });
};

export const getUserDetails = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  res.status(201).json({
    user,
  });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  res.status(200).json({
    message: "updated User successfully",
    updatedUser,
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(201).json({
    success: true,
    message: "User deleted Successfully",
  });
};
