require('dotenv').config();
const connectDB = require('./db/Database')
const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
const port = process.env.PORT || 8000;
const cors = require("cors");

// connect to database
connectDB();
app.use(express.json());
app.use(cookieParser());

// app.use(
//     cors({
//       origin: "http://localhost:3000",
//       credentials: true,
//     })
//   );

const corsOptions = {
  origin: 'https://communities-snowy.vercel.app', // Replace with your Vercel domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credential:true,
};
app.use(cors(corsOptions));

app.use("/", express.static("uploads"));
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

// call api 
const admin = require('./Controller/AdminController')
const user = require('./Controller/UserController')
const report = require('./Controller/ReportController')
const community = require('./Controller/CommunityController')
const ErrorHandler = require('./Utils/ErrorHandler');


app.use("/api/v2/admin", admin)
app.use("/api/v2/user", user)
app.use("/api/v2/community", community)
app.use("/api/v2/report", report)

// it's for ErrorHandling
app.use(ErrorHandler);