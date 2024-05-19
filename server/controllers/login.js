const bcrypt = require("bcryptjs");
const User = require("../models/user");
const StudentController = require("../controllers/student");
const jwt = require("jsonwebtoken");

const signIn = async (email, inputPassword) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw "User not found";
    }

    const isPasswordValid = await bcrypt.compare(inputPassword, user.password);
    if (isPasswordValid == true) {
      return user;
    } else {
      throw "Wrong password";
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const register = async (name, email, password, isStudent, studentId) => {
  const newUser = new User({
    name: name,
    email: email.toLowerCase(),
    password: password,
    isStudent: isStudent,
    studentId: studentId,
  });

  try {
    if (isStudent == true) {
      if (studentId == null) {
        return false;
      }
      await newUser.save();
      await StudentController.addStudent(name, studentId, newUser._id); // them ref cua user vao student
    } else {
      await newUser.save();
    }
    return true;
  } catch (err) {
    //console.log(err.message);
    return false;
  }
};

const emailExists = async (email) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    //console.log(user == null);
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
    const user = await User.findOne({ email: email.toLowerCase() });
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
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signIn,
  register,
  emailExists,
  changePassword,
};
