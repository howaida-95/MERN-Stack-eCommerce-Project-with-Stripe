import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    /*
    jwt secret key that will be generated manually 
        => { id } is the payload – the data you want to include in the token. In this case, it's just the user ID.
        => process.env.JWT_SECRET is the secret key used to sign the token.
     */
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User doesn't exist",
        });
      }
  
      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }
  
      // Generate and return token
      const token = createToken(user._id);
      return res.status(200).json({
        success: true,
        token,
      });
  
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again later.",
      });
    }
  };

  
  const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Step 1: Check if user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
  
      // Step 2: Validate email format
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email",
        });
      }
  
      // Step 3: Validate password strength
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters long",
        });
      }
  
      // Step 4: Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Step 5: Create new user
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
      });
  
      const savedUser = await newUser.save();
  
      // Step 6: Generate token
      const token = createToken(savedUser._id);
  
      // Step 7: Respond with token
      return res.status(201).json({
        success: true,
        token,
      });
  
    } catch (error) {
      console.error("Registration Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again later.",
      });
    }
  };
  
// route for admin login 
const adminLogin = async(req, res) => {

}

export {loginUser, registerUser, adminLogin}