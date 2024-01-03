const fs = require("fs").promises
const CronJob = require("cron").CronJob
const { getNews } = require("./scrappers/scrapper");

async function writeNewsJSON(news, url) {
    try {
        console.log("news_ " + news)
        if (url.includes("cenital")) {
            await fs.writeFile("assets/cenital.json", JSON.stringify(news, null, 2));
        } else {
            await fs.writeFile("assets/eldiario.json", JSON.stringify(news, null, 2));
        }
        console.log("News updated/fetched succesfully");
    }catch(e) {
        console.error("Error writing news JSON file: ", e.message)
    }
}

//Fetch news and writes JSON from different sources
async function fetchNews() {
    const eldiarioUrl = "https://www.eldiarioar.com/";
    const cenitalUrl = "https://www.cenital.com/";
    try {
        const eldiarioData = await getNews(eldiarioUrl);
        const cenitalData = await getNews(cenitalUrl);

        try {
            await writeNewsJSON(eldiarioData, eldiarioUrl)
            await writeNewsJSON(cenitalData, cenitalUrl)
        }catch(e) {
            console.error("Something went wrong while writing JSON files")
        }
    } catch(e) {
        console.error("Something went wrong while fetching news from websites")
    }
    //action for cenital -> NOTE: in the future, cenital would need way less fetch, so maybe do a different job for it

}

const cronTask= async ()=> {
    //first fetch while starting app
    await fetchNews()
    new CronJob(
        "0 10,22 * * *",
        async () => {
        try {
            await fetchNews()
        }catch(e){
            console.error("Error while doing cron job: ", e)
        }
    },
    null,
    true
    )
}

module.exports = cronTask