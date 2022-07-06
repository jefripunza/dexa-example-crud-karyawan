const KaryawanRepo = require("../models/repositories/KaryawanRepo");

const jwt = require("jsonwebtoken");
const jsonwebtoken = require("../utils/jsonwebtoken");
const encryption = require("../utils/encryption");

const { expired_token } = require("../consts");
const { addMinutes } = require("../helpers/date");
const { validateBearer } = require("../helpers/validation");

exports.login = async ({ email, password }) => {
  try {
    if (!(email && password)) {
      console.log("email / password dibutuhkan!");
      return {
        code: 400,
        message: "email / password dibutuhkan!",
      };
    }
    // validasi apakah email dan password benar
    const isExist = await KaryawanRepo.isLogin(
      email,
      encryption.encode(password)
    );
    if (!isExist) {
      console.log(`email "${email}" / password "${password}" salah!`);
      return {
        code: 401,
        message: "email / password salah!",
      };
    }

    // buatkan token
    const expired = addMinutes(expired_token);
    const token = jsonwebtoken.createToken(isExist, 60 * expired_token);
    console.log({ expired, token });

    // render
    return {
      code: 200,
      render: {
        token,
        expired,
      },
    };
  } catch (error) {
    console.log({ di: "login", error });
    return {
      code: 500,
      message: error.message,
    };
  }
};

exports.refreshToken = async ({ authorization }) => {
  try {
    if (authorization) {
      console.log({ authorization });
      const token = validateBearer(authorization);
      return jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decode) => {
        if (err) {
          console.log("Not Authorized");
          return {
            code: 401,
            message: "Not Authorized",
          };
        } else {
          // buatkan token
          const expired = addMinutes(expired_token);
          const token = jsonwebtoken.createToken(
            { id: decode.id },
            60 * expired_token
          );
          console.log({ expired, token });

          // render
          return {
            code: 200,
            render: {
              token,
              expired,
            },
          };
        }
      });
    } else {
      console.log("Authorization Bearer is required!");
      return {
        code: 403,
        message: "Authorization Bearer is required!",
      };
    }
  } catch (error) {
    console.log({ di: "refreshToken", error });
    return {
      code: 500,
      message: error.message,
    };
  }
};
