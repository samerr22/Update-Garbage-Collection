import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    
    const { username , email, password,phone } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        
        next(errorHandle(400, 'all fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);



    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phone
    });

   

    try {
        await newUser.save();
        res.json(  'Signup succes');
        
    } catch (error) {

       next(error);



        
    }
}


export const signgin = async (req, res, next) => {

    const { username , email, password } = req.body;

    if( !email || !password  || email === '' || password === ''){
        
       return next(errorHandle(400, 'all fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if(!validUser) {
            next(errorHandle(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
           return next(errorHandle(404, 'Invalid password'));
        }

        const token = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, {
            httponly: true
        }).json(rest);
    } catch (error) {
        next(error);
    }


}



//user points api route 

export const addPoints = async (req, res, next) => {
    try {
      const { currentuserId, garbageType } = req.body;
  
      // Check if garbageType is provided
      if (!garbageType) {
        return res.status(400).json({ success: false, message: 'Garbage type is required' });
      }
  
      // Logic to calculate points based on garbage type
      let pointEarned = 0;
      switch (garbageType) {
        case 'plastic':
          pointEarned = 5;
          break;
        case 'paper':
          pointEarned = 3;
          break;
        // Add more cases for other garbage types
        default:
          return res.status(400).json({ success: false, message: 'Invalid garbage type' });
      }
  
      // Fetch current user's points
      const currentUser = await User.findById(currentuserId);
      if (!currentUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Calculate updated points by adding current points and pointsEarned
      const updatedPoints = currentUser.points + pointEarned;
  
      // Update user's points
      const updatedUser = await User.findByIdAndUpdate(currentuserId, { points: updatedPoints }, { new: true });
  
      res.json({ success: true, user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };




