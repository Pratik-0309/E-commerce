import User from "../models/user.js";



const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(401)
        .json({ message: "Please Provide required field." });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(401).json({ message: "user already exist." });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    console.log("User Register Successfully : ", user.name)

    return res.status(200).json({
      user,
      message: "User Register Successfully",
    });
  } catch (error) {
    console.log("error:", error.message);
    return res.status(404).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "Please enter required fields.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email",
      });
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const loggedInUser = await User.findById(user._id).select(
      "-password"
    )

    return res
    .status(200)
    .json({
      user: loggedInUser
    })

  } catch (error) {
    console.log("error: ", error.message);
    return res.status(500).json({
      message: error.message
    })
  }
};

const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
