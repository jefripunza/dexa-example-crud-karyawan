const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Karyawan",
  tableName: "karyawan",
  columns: {
    // Meta : Selector
    id: {
      type: "int",
      primary: true,
      generated: true,
    },

    // ---------------------------------------- //
    // Meta : Timeline
    create_date: {
      type: "timestamp",
      default: () => {
        return "now()";
      },
    },

    // ---------------------------------------- //
    // Main Content

    phone_number: {
      type: "varchar",
      length: 16,
      unique: true,
    },
    email: {
      type: "varchar",
      length: 30,
      unique: true,
    },
    password: {
      type: "varchar",
      length: 100,
    },

    name: {
      type: "varchar",
      length: 100,
    },
    dob: {
      type: "timestamp",
    },
    address: {
      type: "text",
    },
    religion: {
      type: "varchar",
      length: 15,
    },

    gender: {
      type: "enum",
      enum: ["pria", "wanita"],
    },
    marital_status: {
      type: "enum",
      enum: ["nikah", "belum nikah"],
    },
  },
});
