const { check } = require("express-validator");

module.exports = {
  checkEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email."),
  checkPassword: check("password").trim().isLength({ min: 6, max: 20 }),
  checkPasswordCopy: check("passwordCopy")
    .trim()
    .isLength({ min: 6, max: 20 })
    .custom((passwordCopy, { req }) => {
      if (req.body.password !== passwordCopy) {
        throw new Error("Passwords must match");
      }
    }),
};
