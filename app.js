const express = require("express");
const sqlite = require("sqlite3").verbose();
const http = require("http");
const { url } = require("inspector");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var server = http.createServer(app);
var db = new sqlite.Database("./public/database/species.db");

// Create the species_list table if it does not exist
db.run(
  "CREATE TABLE IF NOT EXISTS species_list(Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, Name TEXT NOT NULL, Scientific_Name TEXT NOT NULL, Number_Remaining TEXT NOT NULL, About TEXT NOT NULL,Image TEXT,Conservation_Status TEXT NOT NULL)"
);

// Routes
//GET REQUESTS For api
app.get("/api/animals", (req, res, next) => {
  db.all("SELECT * from species_list", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

app.get("/api/animals/:id", (req, res) => {
  var id = req.params.id;
  //Get the row from database who has the rowid as id
  db.get("Select * from species_list where Id = ?", [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log(row);
    if (row) {
      res.status(200).json(row);
    } else {
      res.send("No row found");
    }
  });
});

// Change Data Requests
app.post("/api/animals", (req, res) => {
  //Create a new animal row using the req data
  var animal = req.body;
  // insert one row into the langs table
  db.run(
    `INSERT INTO species_list(Name, Scientific_Name, Number_Remaining, About, Image, Conservation_Status) VALUES(?,?,?,?,?,?)`,
    [
      animal.name,
      animal.scientific_name,
      animal.number_remaining,
      animal.about,
      animal.image,
      animal.conservation_status,
    ],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      res.status(200);
    }
  );
  res.json(req.body);
});

app.put("/api/animals/:id", (req, res, next) => {
  // Update the details of a specific animal using req data
  var animal = req.body;
  db.run(
    `Update species_list set Name = ?, Scientific_Name = ?, Number_Remaining = ?, About = ?, Image = ?, Conservation_Status = ? where Id = ?`,
    [
      animal.name,
      animal.scientific_name,
      animal.number_remaining,
      animal.about,
      animal.image,
      animal.conservation_status,
      req.params.id,
    ],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been updated with rowid ${this.changes}`);
    }
  );
  console.log(req.params.id);
  res.json(req.body);
});

app.delete("/api/animals/:id", (req, res) => {
  // Delete the animal from database.
  db.run(`DELETE FROM species_list WHERE Id=?`, req.params.id, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) deleted ${this.changes}`);
  });
  res.json(req.body);
});

// GET REQUESTS For frontend
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/animals", (req, res) => {
  // Call the api for animals list and send that data to animals.ejs
  res.render("animals");
});

app.get("/animals/:id", (req, res) => {
  // Call the api for specific animal and send that data toshowAnimals.ejs
  res.render("showAnimal", { id: req.params.id });
});

app.get("/animals/edit/:id", (req, res) => {
  res.render("editAnimal", { id: req.params.id });
});

// Default route
app.get("*", (req, res) => {
  res.send("Error Page");
});

// Port Listener
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
