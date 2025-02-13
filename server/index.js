const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./connection");
require ("dotenv").config();
const PORT = process.env.PORT || 8082;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET','POST','PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json()); // Allows parsing of JSON requests
connectDB();


// Example API route
app.get("/", (req, res) => {
  res.send("Backend is running yayy!");
});

//Routes
app.use("/user", require("./routes/user"));
app.use("/doc", require("./routes/submission"));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});