// Express Initialization
const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const { PORT, API_VERSION } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS allow all
app.use(cors());

// use public file
app.use("/", express.static(__dirname + "/public"));

// API routes
app.use("/api/" + API_VERSION, [
  require("./routes/shortenURL1_route"),
  require("./routes/shortenURL2_route"),
  require("./routes/shortenURL3_route"),
]);

// Error handling
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send("Internal Server Error");
});

//set port to 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
