const puppeteer = require("puppeteer");
const getNews = async (url) => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser', //without it throws a weird error in .cache/...
        headless: "new"
    });
    const page = await browser.newPage();
    let result;
    // Navigate to the webpage
    await page.goto(url);

    // Use page.$$eval to select and extract elements in one go
    if (url.includes("cenital")) {
        result = await page.$$eval("section.posts-from-newsletter article", (articles) => {
            const anchors = [];
            articles.forEach((article) => {
                const anchorEl = article.querySelector("a");
                if (anchorEl.title) {
                    anchors.push({
                        text: anchorEl.title,
                        href: anchorEl.href,
                    });
                }
            });
            return anchors;
        });
    } else if (url.includes("eldiario")) {
        result = await page.$$eval("h2.ni-title a", (anchors) => {
            // Extract text and href from each "a" element
            return anchors.map((anchor) => ({
                text: anchor.textContent.trim(),
                href: anchor.href,
            }));
        });
    }
    await browser.close();
    return result;
};

module.exports = {
    getNews,
};
