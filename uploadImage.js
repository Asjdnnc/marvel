const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const dotenv = require("dotev");
dotenv.config();
cloudinary.config({
  cloud_name: process.dotenv.cloud_name,  
  api_key: process.dotenv.api_key,  
  api_secret:process.dotenv.api_secret,
});
const uploadImages = async (directoryPath) => {
    fs.readdir(directoryPath, async (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }
      for (const file of files) {
        const filePath = path.join(directoryPath, file);
        try {
          const result = await cloudinary.uploader.upload(filePath, {
            folder: 'marvel-movies', // Optional: Set a folder in Cloudinary
            tags: 'marvel'
          });
  
          console.log('Image uploaded:', result.secure_url);
  
          // Store the image URL in your database
          // Example: Assuming you have a Movie model
          const Movie = require('./models/movie');
          const movieData = {
            title: path.parse(file).name, // Use file name as title or customize
            imageUrl: result.secure_url
          };
  
          const newMovie = new Movie(movieData);
          await newMovie.save();
          console.log('Movie saved with image URL:', newMovie);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    });
  };
  
  // Call the function with your images folder path
  const imagesFolder = path.join(__dirname, 'image'); // Replace 'images' with your folder name
  uploadImages(imagesFolder);
  