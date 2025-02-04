const express = require("express");
const app = express();
const cors = require("cors");
require ("dotenv").config();
const PORT = process.env.PORT || 8082;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET','POST','PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json()); // Allows parsing of JSON requests

// Example API route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});