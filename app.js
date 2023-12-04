const express = require("express");
const { getNews } = require("./scrappers/scrapper");

const app = express();
const port = 3000;

// Route for /eldiario API
app.get("/eldiario", async (req, res) => {
    const eldiarioUrl = "https://www.eldiarioar.com/";
    const eldiarioData = await getNews(eldiarioUrl);
    res.json(eldiarioData);
});

// Route for /cenital API
app.get("/cenital", async (req, res) => {
    const cenitalUrl = "https://www.cenital.com/";
    const cenitalData = await getNews(cenitalUrl);
    res.json(cenitalData);
});

module.exports = app;
