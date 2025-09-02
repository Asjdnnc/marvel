const mongoose = require("mongoose");
const dotenv = require("dotenv");
const movies = require("./data"); // Importing the data directly from your file
const Movie = require("./models/Movie");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.dburl)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Connection error:", err));

// Import data into MongoDB
const importData = async () => {
  try {
    await Movie.insertMany(movies); // Insert the data
    console.log("Data imported successfully!");
    process.exit(); // Exit after importing
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1); // Exit with failure
  }
};
const deleteData = async()=>{
  try{
    await Movie.deleteMany();
    console.log("delete done")
    process.exit();
  }
 catch (error) {
  console.error("Error importing data:", error);
  process.exit(1); // Exit with failure
}
}

importData();
//deleteData();
