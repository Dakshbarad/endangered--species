const express = require("express");
const sqlite = require("sqlite3").verbose();
const http = require("http");
const { url } = require("inspector");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var server = http.createServer(app);
var db = new sqlite.Database("./public/database/species.db");

// Create the species_list table if it does not exist
db.run(
  "CREATE TABLE IF NOT EXISTS species_list(Name TEXT, Scientific_Name TEXT, About TEXT,Image TEXT,Conservation_Status TEXT)"
);

// Routes
//GET REQUESTS
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/animals", (req, res) => {
  res.render("animals");
});

app.get("/animals/:id", (req, res) => {
  res.send(`Get information of ${req.params.id}`);
  var id = req.params.id;
  //Get the row from database who has the rowid as id
  if (id) {
    //id is present in database
    res.render("showAnimal.ejs");
  } else {
    next();
  }
});

// POST REQUESTS
app.post("/animals", (req, res) => {
  // Create a new animal
});

app.put("/animals/:id", (req, res, next) => {
  // Update the details of a specific animal
});

app.delete("/animals/:id", (req, res) => {
  // Delete this animal from database.
});

// Default route
app.get("*", (req, res) => {
  res.send("Error Page");
});

// Port Listener
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
