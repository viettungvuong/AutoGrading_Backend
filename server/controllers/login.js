const bcrypt = require("bcryptjs");
const User = require("../models/user");
const signIn = async (email, inputPassword) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return false; // User not found
    }

    const isPasswordValid = await bcrypt.compare(inputPassword, user.password);
    return isPasswordValid;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const register = async (email, password) => {
  const newUser = new User({
    email,
    password,
  });

  try {
    await newUser.save();
    return true;
  } catch (err) {
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
module.exports = {
  signIn,
  register,
  emailExists,
};
