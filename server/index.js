require('dotenv').config();
const connectDB=require('./db/Database')
const express=require('express')
const cookieParser = require('cookie-parser');
const app= express()
const port = process.env.PORT || 8000;
const cors = require("cors");

// connect to database
connectDB();
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use("/", express.static("uploads"));
app.listen(port , ()=>{
    console.log(`listening on port ${port}`)
})

// call api 
const admin= require('./Controller/AdminController')
const user= require('./Controller/UserController')
const vendor= require('./Controller/VendorController')
const ErrorHandler = require('./Utils/ErrorHandler');


app.use("/api/v2/admin" , admin)
app.use("/api/v2/user" , user)
app.use("/api/v2/vendor" , vendor)

// it's for ErrorHandling
app.use(ErrorHandler);