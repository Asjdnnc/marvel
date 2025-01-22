const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const app = express();
let port = 8080;
dotenv.config()

//middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({extended:true}));
//for connecting fronted and backend url
app.use(cors({
    origin: "https://marvel-phi-three.vercel.app/",
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

app.listen(port,()=>{
    console.log("app started at port 8080")
});
