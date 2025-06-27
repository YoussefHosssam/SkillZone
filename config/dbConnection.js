const mongoose = require("mongoose");
exports.connect = async function () {
  const DBUrl = process.env.DB_URL.replace(
    "<USERANAME>:<PASSWORD>",
    `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}`
  );
  await mongoose.connect(DBUrl).then(() => {
    console.log("DB Connected successfully");
  });
};
