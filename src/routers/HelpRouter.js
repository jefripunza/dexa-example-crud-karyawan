const router = require("express").Router();
const { endpoint } = require("../config.js");

// ==================================================================================

const controller = require("../controllers/HelpController");

// ==================================================================================

router.get("/log", controller.log);

router.post(endpoint + "/login", controller.login);
router.get(endpoint + "/refresh-token", controller.refreshToken);

// ==================================================================================

module.exports = router;
