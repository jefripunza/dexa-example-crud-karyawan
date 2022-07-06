const moment = require("moment-timezone");

exports.addMinutes = (minutes) => {
  const timestamp =
    new Date(new Date().getTime() + minutes * 60000).getTime() / 1000;
  return moment
    .unix(timestamp)
    .tz("Asia/Jakarta")
    .format("YYYY-MM-DD HH:mm:ss");
};
