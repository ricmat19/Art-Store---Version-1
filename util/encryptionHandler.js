const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

const signup = async (password) => {
  const salt = crypto.randomBytes(8).toString("hex");
  const hashed = await scrypt(password, salt, 64);
  const record = {
    password: hashed.toString("hex") + "." + salt,
  };

  return record;
};

const signin = async (storedPW, providedPW) => {
  // console.log("Provided PW:" + providedPW)

  const [hash, salt] = storedPW.split(".");
  // console.log("Stored Hash:" + hash)

  const providedPWHashed = await scrypt(providedPW, salt, 64);
  // console.log("Provided PW Hashed:" + providedPWHashed.toString('hex'))

  return hash === providedPWHashed.toString("hex");
};

module.exports = { signup, signin };
