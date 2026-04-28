# Marvel Project

A full-stack application built with the MERN stack (MongoDB, Express, React, Node.js) for exploring the Marvel Cinematic Universe (MCU). The application allows users to discover Marvel movies, track their watched progress, and view upcoming releases.

## Features

- **Movie Discovery**: Browse through the collection of MCU movies.
- **Progress Tracking**: Keep track of the MCU movies you've watched right from the home page.
- **Countdown Timer**: Displays days remaining until upcoming major releases (e.g., Avengers: Doomsday).
- **RESTful API**: Custom backend API to serve movie data and manage state.

## Tech Stack

- **Frontend**: React (Vite), React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Image Hosting**: Cloudinary

## Prerequisites

- Node.js (v16 or higher recommended)
- MongoDB account/database URL
- Cloudinary account (for image uploads)

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/marvelProject.git
cd marvelProject
```

### 2. Backend Setup

Install backend dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and add your MongoDB URI and Cloudinary credentials:

```env
dburl=your_mongodb_connection_string
cloud_name=your_cloudinary_cloud_name
api_key=your_cloudinary_api_key
api_secret=your_cloudinary_api_secret
```

### 3. Frontend Setup

Open a new terminal, navigate to the `frontend` folder, and install dependencies:

```bash
cd frontend
npm install
```

### 4. Seed the Database

To populate your MongoDB database with the initial movie data, run:

```bash
node importData.js
```

*(Note: `uploadImage.js` can also be used to upload a directory of images to Cloudinary and save their URLs into the database).*

## Running the Application

### Development Mode

**Backend**:
In the root directory, run:
```bash
npm run dev
# or manually: node index.js
```
The server will start on port 80 (or as configured).

**Frontend**:
In the `frontend` directory, run:
```bash
npm run dev
```
The React app will be served via Vite.

### Production

The backend is configured to serve the built frontend from `frontend/dist`. 
To build the frontend for production:

```bash
cd frontend
npm run build
```

Then start the Node.js server from the root directory:

```bash
node index.js
```

## Folder Structure

- `/frontend`: Contains the React/Vite application.
- `/models`: Mongoose database schemas.
- `/routes`: Express API route definitions.
- `/controllers`: Logic for handling API requests.
- `index.js`: Main entry point for the backend server.
- `importData.js`: Script for seeding the database.
- `uploadImage.js`: Script for uploading local images to Cloudinary.
