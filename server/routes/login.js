const app = require("express");
const router = app.Router();
const LoginController = require("../controllers/login");

router.post("/signin/:email/:password", async (req, res) => {
  const login = await LoginController.signIn(
    req.params.email,
    req.params.password
  );

  if (login == true) {
    return res.status(201).send("Sign in successfully");
  } else {
    return res.status(400).send("Error when signing in");
  }
});

router.post("/register/:email/:password", async (req, res) => {
  const email = req.params.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validMail = emailRegex.test(email);
  if (!validMail) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (LoginController.emailExists()) {
    return res.status(400).json({ error: "User with this email exists" });
  }

  const register = await LoginController.register();

  if (register == true) {
    return res.status(201).send("Registered successfully");
  } else {
    return res.status(400).send("Error when registering");
  }
});
