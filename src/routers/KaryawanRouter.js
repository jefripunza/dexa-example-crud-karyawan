const router = require("express").Router();
const { endpoint } = require("../config.js");

// ==================================================================================

const controller = require("../controllers/KaryawanController.js");
const jwt_auth = require("../middlewares/jwt_validation");

// ==================================================================================

router.post(endpoint + "/karyawan", controller.createKaryawan);

router.get(
  endpoint + "/karyawan/:show/:page/:orderby/:keyword",
  jwt_auth,
  controller.readKaryawanPagination
);

router.patch(endpoint + "/karyawan", jwt_auth, controller.updateKaryawan);

router.delete(endpoint + "/karyawan", jwt_auth, controller.deleteKaryawan);

// ==================================================================================

module.exports = router;
