const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./connection");
const cookieParser = require('cookie-parser');
require ("dotenv").config();
const PORT = process.env.PORT || 8082;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000','https://cirt-project.vercel.app'],
    methods: ['GET','POST','PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json()); // Allows parsing of JSON requests
connectDB();

app.use(cookieParser());


// Example API route
app.get("/", (req, res) => {
  res.send("Backend is running yayy!");
});

//Routes
app.use("/user", require("./routes/user"));
app.use("/submission", require("./routes/submission"));
app.use("/comment", require("./routes/comment"));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});