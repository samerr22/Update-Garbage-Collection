import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/error.js";


export const test = (req, res) => {
  res.json({ message: "api is worker" });
};



export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};



export const updateUser = async (req, res, next) => {
  
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandle(400, "Password must be t least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandle(400, "Username must be between 7 or 20 characters")
      );
    }

    if (req.body.username.includes(" ")) {
      return next(errorHandle(400, "username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandle(400, "Usernme must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandle(400, "username can only contain letters and numbers")
      );
    }
}
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
            phone: req.body.phone,
          },
        },
        { new: true }
      );

      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  
};


export const deleteUser = async (req, res, next) => {
  
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};


export const getAlluser= async (req, res, next) => {
  try {
   

   

      const infoo = await User.find();

      if (infoo.length > 0) {
        res.json({
          message: "information details retrieved successfully",
          infoo,
        });
      } else {
        return next(errorHandle(404, " Information not fonud "));
      }
  
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};




export const currentuser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};






