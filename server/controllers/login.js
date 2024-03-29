const bcrypt = require("bcrypt");
const User = require("../models/user");
const signIn = async (username, inputPassword) => {
  try {
    const user = await User.findOne({ username });
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

const register = (username, password) => {
  const newUser = new User({
    username,
    password,
  });

  newUser.save((err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};
