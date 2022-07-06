const Model = require("../../utils/models.js");

const Karyawan = require("../entities/KaryawanEntity");

// =============================================================

exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(Karyawan, new_data);
};

exports.isPhoneNumberExist = async (phone_number) => {
  return await Model.isExist(Karyawan, {
    phone_number,
  });
};
exports.isEmailExist = async (email) => {
  return await Model.isExist(Karyawan, {
    email,
  });
};
exports.isIdExist = async (id) => {
  return await Model.isExist(Karyawan, {
    id,
  });
};

exports.isLogin = async (email, password) => {
  const result = await Model.isExist(Karyawan, { email, password });
  return result
    ? {
        id: result.id,
      }
    : false;
};

exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(Karyawan, keyword, show, page, desc);
};

exports.updateWhereId = async (id, new_data) => {
  return await Model.updateFrom(Karyawan, { id }, new_data);
};

exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(Karyawan, { id });
};
