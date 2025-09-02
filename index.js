const express = require("express")
const mongoose = require("mongoose")
const path = require("path");
const dotenv = require("dotenv")
const cors = require("cors")
const app = express();
let port = 80;
dotenv.config()

//middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({extended:true}));
//for connecting fronted and backend url
app.use(express.static(path.join(__dirname, "frontend","dist")));
app.use(cors({
     origin:"*", //["https://marvel-phi-three.vercel.app","https://marvel-fpk3jsai0-aditya-kumars-projects-1254d14b.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));


//connect to mongoDB
mongoose.connect(process.env.dburl)
.then(() => console.log('database Connected'))
.catch((err) => console.log(err));

// Routes
const movieRoutes = require("./routes/movieRoutes.js");
app.use("/api/movies", movieRoutes);

app.get("/",(req,res)=>{
    res.send("Hello from backend");
})
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, "frontend","dist","index.html"));
})
// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  });

app.listen(port,()=>{
    console.log("app started at port 8080")
});
