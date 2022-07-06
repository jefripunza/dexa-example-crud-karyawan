// Setup Environment
require("dotenv").config();

exports.endpoint = process.env.ENDPOINT;
exports.db_config = {
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "karyawan",
};
exports.synchronize = process.env.DB_SYNC === "true";
exports.logging = process.env.DB_LOG === "true";
