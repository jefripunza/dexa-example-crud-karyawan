// -----------------------------------------------------
// -> Logger

const path = require("path");
const fs = require("fs");
const util = require("util");

const { io } = require("../app/websocket");

const { project_root } = require("../consts");
const log_path = path.join(project_root, "debug.log");
const stdout = [];

// delete first before start
fs.rmSync(log_path, {
  force: true,
  recursive: true,
});
const log_file = fs.createWriteStream(log_path, { flags: "w" });
// modification console.log
console.log = (...arg) => {
  const prepare = [];
  for (let i = 0; i < arg.length; i++) {
    prepare.push(util.format(arg[i]));
  }
  // render (break)
  const out = prepare.join(" ") + "\n";
  io.emit("SERVER:LOG", out);
  log_file.write(out);
  process.stdout.write(out);
  stdout.push(out);
};
