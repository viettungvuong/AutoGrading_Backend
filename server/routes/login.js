const app = require("express");
const router = app.Router();
const LoginController = require("../controllers/login");

router.post("/signin", async (req, res) => {
  //dang nhap
  const login = await LoginController.signIn(req.body.email, req.body.password);

  if (login == true) {
    return res.status(200).send("Sign in successfully");
  } else {
    return res.status(400).json({ error: "Error when signing in" });
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

  const register = await LoginController.register(email, inputPassword);
  console.log(register);

  if (register == true) {
    res.status(200).send("Registered successfully");
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
