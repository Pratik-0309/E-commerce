import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

// Middleware to hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return null;
  this.password = await bcrypt.hash(this.password, 10);
});

// Middleware to compare password
userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id: this._id,
    email: this.email
  },process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  })
}

userSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id: this._id
  }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d'
  })
}

const User = mongoose.model("User", userSchema);

export default User;
