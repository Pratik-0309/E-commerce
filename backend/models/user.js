import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

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
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return null;
  this.password = await bcrypt.hash(this.password, 10);
});

// Middleware to compare password
userSchema.method.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.method.generateAccessToken = function(){
  return jwt.sign({
    _id: this._id,
    email: this.email
  },process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  })
}

userSchema.method.generateRefreshToken = function(){
  return jwt.sign({
    _id: this._id
  }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d'
  })
}

const User = mongoose.model("User", userSchema);

export default User;
