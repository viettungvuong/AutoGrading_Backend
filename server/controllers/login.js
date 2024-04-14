const bcrypt = require("bcryptjs");
const User = require("../models/user");
const signIn = async (email, inputPassword) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw "User not found";
    }

    const isPasswordValid = await bcrypt.compare(inputPassword, user.password);
    return isPasswordValid;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const register = async (email, password) => {
  const user = await User.findOne({ email });
  const newUser = new User({
    email: email,
    password: password,
  });

  try {
    await newUser.save();
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

const emailExists = async (email) => {
  try {
    const user = await User.findOne({ email });
    console.log(user == null);
    if (user == null) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const changePassword = async (email, confirmPassword, newPassword, res) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw "User not found";
    }

    const isPasswordValid = await bcrypt.compare(
      confirmPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw "Wrong password";
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).send("Successfully changed password");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: err.message });
  }
};
module.exports = {
  signIn,
  register,
  emailExists,
  changePassword,
};
