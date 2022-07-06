const router = require("express").Router();

// ==================================================================================

const controller = require("../controllers/HelpController");

// ==================================================================================

router.get("/log", controller.log);

router.post("/auth/login", controller.login);
router.get("/auth/refresh-token", controller.refreshToken);

// ==================================================================================

module.exports = router;
