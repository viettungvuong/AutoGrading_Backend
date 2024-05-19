const app = require("express");
const router = app.Router();
const LoginController = require("../controllers/login");
const jwt = require("jsonwebtoken");

router.post("/signin", async (req, res) => {
  // Login
  const login = await LoginController.signIn(req.body.email, req.body.password);

  if (login != null) {
    // tạo jwt token
    const token = jwt.sign(
      { email: req.body.email.toLowerCase() },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    // trả token để xác thực sau này
    return res.status(200).json({ token: token, isStudent: login.isStudent });
  } else {
    return res.status(400).json({
      error: "Error when signing in: Check your username and password",
    });
  }
});

router.post("/signup", async (req, res) => {
  function validMail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //regex check email
    return emailRegex.test(email);
  }
  // dang ky
  const email = req.body.email;
  const inputPassword = req.body.password;
  const name = req.body.name;
  const isStudent = req.body.isStudent;
  const studentId = req.body.studentId;

  const valid = validMail(email);
  if (!valid) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }
  const emailExists = await LoginController.emailExists(email);
  if (emailExists) {
    res.status(400).json({ error: "User with this email exists" });
    return;
  }

  const register = await LoginController.register(
    name,
    email,
    inputPassword,
    isStudent,
    studentId
  );
  console.log(register);

  if (register == true) {
    const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // trả token
    res.status(200).json({ token: token });
  } else {
    res.status(400).json({ error: "Error when registering" });
  }
});

router.put("/change", async (req, res) => {
  // dang ky
  const email = req.body.email;
  const confirmPassword = req.body.confirmPassword;
  const newPassword = req.body.newPassword;

  await LoginController.changePassword(
    email,
    confirmPassword,
    newPassword,
    res
  );
});

module.exports = router;
