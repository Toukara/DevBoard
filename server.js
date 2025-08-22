const taskRoutes = require("./backend/routes/task.js");
// Import & enable dotenv in the file:
console.log("Loading environment variables...");

require("dotenv").config();

// Express app:
const express = require("express");
const app = express();

// Import Mongoose:
const mongoose = require("mongoose");

// Import & apply cors package:
const cors = require("cors");
app.use(cors());

// more on .use() method below...

/* Assign routes (which we will later define in respective files), 
  to variables (in my app so far, : */

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Connect to Mongoose:
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // Listen for requests only after connecting to DB:
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        `Connected to DB & listening on port ${process.env.PORT || 4000}!`
      );
    });
  })
  .catch((error) => console.log(error));

// --------- ROUTES
// Attach defined routes to their corresponding endpoints:

app.use((req, res, next) => {
  console.log(`Request received at ${req.path} with method ${req.method}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Task API!" });
});

app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});
