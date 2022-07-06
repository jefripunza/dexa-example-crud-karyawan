const jwt = require("jsonwebtoken");
const { isBearer } = require("../helpers/validation");
const { skip_token } = require("../consts");

module.exports = (req, res, next) => {
  if (skip_token) {
    console.log({ skip_token });
    return next();
  }
  const token = isBearer(req);
  if (token) {
    return jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN,
      (err, token_decoded) => {
        if (err) {
          console.log("Not Authorized");
          return res.status(401).json({
            message: "Not Authorized",
          });
        } else {
          req.user = token_decoded; // OK
          console.log({ token_decoded });
          return next();
        }
      }
    );
  } else {
    console.log(`${token} Authorization Bearer is required!`);
    return res.status(403).json({
      message: "Authorization Bearer is required!",
    });
  }
};
