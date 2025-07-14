import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import bycrypt from "bcryptjs";
import { generateToken } from "../lib/utlis.js";



export const signup = async (req, res) => {
   
  const { fullName, email, password } = req.body;
   console.log(fullName)
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required!!" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }
    const user = await User.findOne({ email });

    if (user)
      return res
        .status(400)
        .json({ message: " User already Exist Please Login In!" });

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in the SignUp controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  const {email,password} = req.body;
  try {
    const user = await User.findOne({email})
    if(!user) {
      return res.status(400).json({message : "Invalid Credentials"})
    }
    const isPasswordCorrect = await bycrypt.compare(password, user.password)

    if(!isPasswordCorrect){
       return res.status(400).json({message : "Invalid Credentials"})
    }

    generateToken(user._id, res)

    res.status(200).json({
      _id : user._id,
      fullName : user.fullName,
      email : user.email,
      profilePic : user.profilePic 
    })
  } catch (error) {
    console.log("Error in the Login controller:" , error.message)
    res.status(500).json({message: "Internal server error"})
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0
    })

    res.status(200).json({message :"LoggedOut Successfully"})
  } catch (error) {
    console.log("Error in the log out controller : ", error.message)
    res.status(500).json({message: " Internal Server Error"})
  }
};

export const checkAuth = (req,res)=>{
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log("Error in the CheckAuth controller :", error.message)
    res.status(500).json({message : "Internal Server Error"})
  }
}