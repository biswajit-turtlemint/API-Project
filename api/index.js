const express = require('express');

const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");

const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


dotenv.config();
app.use("/images", express.static(path.join(__dirname,"/images")))

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true
}).then(console.log("Connected")).catch(err =>console.log(err));

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"images")
    },filename:(req,file,cb) => {
        cb(null,req.body.name);
    },
});

const upload = multer({storage:storage});

app.post("/api/upload", upload.single("file"),(req,res)=> {
    res.status(200).json("File has been uploaded")
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("8000" , () => {
    console.log("server is running");
});