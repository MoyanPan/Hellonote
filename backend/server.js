// Init express
const express = require("express");
const path = require("path");
// const cors = require("cors");
// Load .env file
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

const connectDB = require("./config/database");
// Connect to database
connectDB();

const app = express();
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:3000", "https://api.jdoodle.com"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  //Enabling CORS
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  req.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/noteRoutes"));
app.use("/", require("./routes/codeRoutes"));

// Listen on a port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
