const path = require("path");

exports.isCompiled = String(__filename).endsWith("index.js");

//                     hosting                 // local
exports.project_root = process.env.LSNODE_ROOT || path.join(__dirname, "..");

// -----------------------------------------------------
exports.genders = ["pria", "wanita"];
exports.maritals = ["nikah", "belum nikah"];

exports.skip_token = false;

exports.expired_token = 3; // minute
