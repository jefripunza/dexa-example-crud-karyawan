const KaryawanRepo = require("../models/repositories/KaryawanRepo");
const { isUndefined, isEmail } = require("../helpers/validation");
const { genders, maritals } = require("../consts");
const encryption = require("../utils/encryption");

exports.insert = async ({
  name,
  gender,
  dob,
  phone_number,
  email,
  password,
  religion,
  marital_status,
  address,
}) => {
  try {
    // check apakah variabel berikut ada (wajib)
    if (
      isUndefined(name) ||
      isUndefined(gender) ||
      isUndefined(dob) ||
      isUndefined(phone_number) ||
      isUndefined(email) ||
      isUndefined(password) ||
      isUndefined(religion) ||
      isUndefined(marital_status) ||
      isUndefined(address)
    ) {
      return {
        code: 405,
        message:
          "wajib mengisi body (name, gender, dob, phone_number, email, password, religion, marital_status, address)",
      };
    }
    console.log({
      name,
      gender,
      dob,
      phone_number,
      email,
      password,
      religion,
      marital_status,
      address,
    });

    // check apakah format dob adalah Date
    const train_dob = String(dob).split("-");
    const isDob =
      train_dob.length === 3 &&
      train_dob[0].length === 4 &&
      train_dob[1].length === 2 &&
      train_dob[2].length === 2 &&
      train_dob.map((n) => parseInt(n)).filter((n) => n).length === 3;
    if (!isDob) {
      console.log(`dob "${dob}" bukan format date (YYYY-MM-DD)`);
      return {
        code: 400,
        message: `dob "${dob}" bukan format date (YYYY-MM-DD)`,
      };
    }
    console.log({ isDob });

    // check apakah email adalah benar format email
    if (!isEmail(email)) {
      console.log(`email "${email}" bukan format email`);
      return {
        code: 400,
        message: `email "${email}" bukan format email`,
      };
    }

    // check apakah gender tersedia
    if (!genders.includes(gender)) {
      console.log(`gender "${gender}" tidak tersedia (${genders.join(", ")})`);
      return {
        code: 400,
        message: `gender "${gender}" tidak tersedia (${genders.join(", ")})`,
      };
    }
    // check apakah gender tersedia
    if (!maritals.includes(marital_status)) {
      console.log(
        `marital_status "${marital_status}" tidak tersedia (${maritals.join(
          ", "
        )})`
      );
      return {
        code: 400,
        message: `marital_status "${marital_status}" tidak tersedia (${maritals.join(
          ", "
        )})`,
      };
    }

    // check apakah phone_number sudah ada di database
    let isExist = await KaryawanRepo.isPhoneNumberExist(phone_number);
    if (isExist) {
      console.log(`phone_number "${phone_number}" sudah ada`);
      return {
        code: 400,
        message: `phone_number "${phone_number}" sudah ada`,
      };
    }

    // check apakah email sudah ada di database
    isExist = await KaryawanRepo.isEmailExist(email);
    if (isExist) {
      console.log(`email "${email}" sudah ada`);
      return {
        code: 400,
        message: `email "${email}" sudah ada`,
      };
    }

    // input data karyawan baru
    await KaryawanRepo.insertNew({
      name,
      gender,
      dob,
      phone_number,
      email,
      password: encryption.encode(password),
      religion,
      marital_status,
      address,
    });

    // render
    console.log("berhasil menambahkan karyawan baru");
    return {
      code: 200,
      message: "berhasil menambahkan karyawan baru",
    };
  } catch (error) {
    console.log({ di: "insert", error });
    return {
      code: 500,
      message: error.message,
    };
  }
};

exports.pagination = async ({ show, page, orderby, keyword }) => {
  try {
    // pemetaan pagination
    const result = await KaryawanRepo.showPagination(
      show,
      page,
      ["'", '"'].includes(keyword)
        ? undefined
        : {
            name: keyword,
            gender: keyword,
            religion: keyword,
            marital_status: keyword,
            address: keyword,
          },
      String(orderby).toLowerCase() === "desc"
    );
    console.log({ result });

    // render
    return {
      code: 200,
      render: result,
    };
  } catch (error) {
    console.log({ di: "pagination", error });
    return {
      code: 500,
      message: error.message,
    };
  }
};

exports.update = async ({
  id, // selector
  name,
  gender,
  dob,
  phone_number,
  email,
  password,
  religion,
  marital_status,
  address,
}) => {
  try {
    // id (selector) wajib
    if (!id) {
      console.log("id dibutuhkan di body");
      return {
        code: 405,
        message: "id dibutuhkan di body",
      };
    }

    // check apakah ada yang ingin dirubah
    if (
      !(
        name ||
        gender ||
        dob ||
        phone_number ||
        email ||
        password ||
        religion ||
        marital_status ||
        address
      )
    ) {
      console.log(
        "wajib mengisi salah satu body (name, gender, dob, phone_number, email, password, religion, marital_status, address)"
      );
      return {
        code: 405,
        message:
          "wajib mengisi salah satu body (name, gender, dob, phone_number, email, password, religion, marital_status, address)",
      };
    }

    // check apakah format dob adalah Date
    if (dob) {
      const train_dob = String(dob).split("-");
      const isDob =
        train_dob.length === 3 &&
        train_dob[0].length === 4 &&
        train_dob[1].length === 2 &&
        train_dob[2].length === 2 &&
        train_dob.map((n) => parseInt(n)).filter((n) => n).length === 3;
      if (!isDob) {
        console.log(`dob "${dob}" bukan format date (YYYY-MM-DD)`);
        return {
          code: 400,
          message: `dob "${dob}" bukan format date (YYYY-MM-DD)`,
        };
      }
    }

    // check apakah email adalah benar format email
    if (email) {
      if (!isEmail(email)) {
        console.log(`email "${email}" bukan format email`);
        return {
          code: 400,
          message: `email "${email}" bukan format email`,
        };
      }
    }

    // check apakah gender tersedia
    if (gender) {
      if (!genders.includes(gender)) {
        console.log(
          `gender "${gender}" tidak tersedia (${genders.join(", ")})`
        );
        return {
          code: 400,
          message: `gender "${gender}" tidak tersedia (${genders.join(", ")})`,
        };
      }
    }
    // check apakah gender tersedia
    if (marital_status) {
      if (!maritals.includes(marital_status)) {
        console.log(
          `marital_status "${marital_status}" tidak tersedia (${maritals.join(
            ", "
          )})`
        );
        return {
          code: 400,
          message: `marital_status "${marital_status}" tidak tersedia (${maritals.join(
            ", "
          )})`,
        };
      }
    }

    // check apakah data yang ingin di update sekarang ini ada di database
    const isExist = await KaryawanRepo.isIdExist(id);
    if (!isExist) {
      console.log(`karyawan "${id}" tidak ada`);
      return {
        code: 400,
        message: `karyawan "${id}" tidak ada`,
      };
    }

    // update data
    const { affected } = await KaryawanRepo.updateWhereId(id, {
      name,
      gender,
      dob,
      phone_number,
      email,
      password: encryption.encode(password),
      religion,
      marital_status,
      address,
    });

    // apakah benar2 mengupdate data
    if (affected === 0) {
      console.log("karyawan tidak terupdate");
      return {
        code: 500,
        message: "karyawan tidak terupdate",
      };
    }

    // render
    console.log("berhasil merubah data karyawan");
    return {
      code: 200,
      message: "berhasil merubah data karyawan",
    };
  } catch (error) {
    console.log({ di: "update", error });
    return {
      code: 500,
      message: error.message,
    };
  }
};

exports.delete = async ({ id }) => {
  try {
    // id (selector) wajib
    if (!id) {
      console.log("id dibutuhkan di body");
      return {
        code: 405,
        message: "id dibutuhkan di body",
      };
    }

    // check apakah data yang ingin di delete sekarang ini ada di database
    const isExist = await KaryawanRepo.isIdExist(id);
    if (!isExist) {
      console.log(`karyawan "${id}" tidak ada`);
      return {
        code: 400,
        message: `karyawan "${id}" tidak ada`,
      };
    }

    // delete data
    await KaryawanRepo.deleteWhereId(id);

    // render
    console.log("berhasil menghapus data karyawan");
    return {
      code: 200,
      message: "berhasil menghapus data karyawan",
    };
  } catch (error) {
    console.log({ di: "delete", error });
    return {
      code: 500,
      message: error.message,
    };
  }
};
