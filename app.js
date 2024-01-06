const express = require("express");
const fs = require('fs');
const app = express();
const fetchNews = require("./cronjob")


app.get("/", (req, res) => {
    res.send("News from Argentina")
})

// Route for /eldiario API
app.get("/eldiario", async (req, res) => {
    // Read the JSON file
  fs.readFile('assets/eldiario.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading eldiario.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      // Send the JSON data in the response
      res.json(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

// Route for /cenital API
app.get("/cenital", async (req, res) => {
    // Read the JSON file
  fs.readFile('assets/cenital.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading cenital.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      // Send the JSON data in the response
      res.json(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

//cron job to fetch news periodically
fetchNews().then(()=> {
    console.log("News fetched succesfully at start of app")
}).catch((e) => {
    console.error("Something went wrong while fetching news at start of app")
})

module.exports = app;
