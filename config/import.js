// import.js
require("dotenv").config();
const { connect } = require("./dbConnection");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require(`${__dirname}/../models/user/userModel.js`);
const Center = require(`${__dirname}/../models/center/centerModel.js`);
const Branch = require(`${__dirname}/../models/branch/branchModel.js`);
const Course = require(`${__dirname}/../models/course/courseModel.js`);

const run = async () => {
  const filePath = process.argv[2]; // The first arg: file path

  if (!filePath) {
    console.error(
      "❌ Please provide a JSON file path.\nUsage: node import.js data.json"
    );
    process.exit(1);
  }

  try {
    await connect(); // Await the DB connection

    // Read and parse JSON file
    const fullPath = path.resolve(filePath);
    const rawData = fs.readFileSync(fullPath, "utf-8");
    const data = JSON.parse(rawData);

    if (!Array.isArray(data)) {
      console.error("❌ The JSON file must contain an array of documents.");
      process.exit(1);
    }

    // Insert using create() to trigger pre-save hooks
    let successCount = 0;
    for (const userObj of data) {
      try {
        await Course.create(userObj); // Triggers pre('save')
        successCount++;
      } catch (err) {
        console.error(
          `⚠️ Failed to insert: ${JSON.stringify(userObj)}\nError: ${
            err.message
          }`
        );
      }
    }

    console.log(
      `✅ Successfully inserted ${successCount} / ${data.length} documents.`
    );
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

run();
