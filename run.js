// importing packages
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

//create servers.csv if it doesn't exist
var fs = require("fs");
if (!fs.existsSync("servers.csv")) {
  fs.writeFile("servers.csv", "", function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
}
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "index.html"));
});

// middlewares
app.use(express.json(), cors());

// adding routes
app.use("/server", require("./routes/server"));
app.use("/servers", require("./routes/servers"));
app.use("/settings", require("./routes/settings"));
// port
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on Port: ${port}`));

app.use((err, req, res, next) => {
  switch (err.message) {
    case "NoCodeProvided":
      return res.status(400).send({
        status: "ERROR",
        error: err.message,
      });
    default:
      return res.status(500).send({
        status: "ERROR",
        error: err.message,
      });
  }
});
