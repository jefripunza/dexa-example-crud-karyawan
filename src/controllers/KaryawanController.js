const KaryawanService = require("../services/KaryawanService");

exports.createKaryawan = async (req, res) => {
  const { code, message, render } = await KaryawanService.insert(req.body);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.readKaryawanPagination = async (req, res) => {
  const { code, message, render } = await KaryawanService.pagination(
    req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.updateKaryawan = async (req, res) => {
  const { code, message, render } = await KaryawanService.update(req.body);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.deleteKaryawan = async (req, res) => {
  const { code, message, render } = await KaryawanService.delete(req.body);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};
