const puppeteer = require("puppeteer");

// Function to get the current operating system
function getOS() {
    const platform = process.platform;
    if (platform === "win32") {
        return "windows";
    } else if (platform === "darwin") {
        return "mac";
    } else if (platform === "linux") {
        return "linux";
    }
    return "unknown";
}

const getNews = async (url) => {
    const os = getOS();
    let launchOptions = {
        headless: "new", // Set headless to "new" for all cases
    };

    if (os === "windows") {
        // No need to specify executablePath on Windows
    } else if (os === "mac") {
        // Set the correct path for Chromium on Mac
        launchOptions.executablePath =
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    } else if (os === "linux") {
        // Set the correct path for Chromium on Linux
        launchOptions.executablePath = "/usr/bin/chromium-browser";
    }

    const browser = await puppeteer.launch({ launchOptions });

    const page = await browser.newPage();
    let result;
    // Navigate to the webpage
    await page.goto(url);

    // Use page.$$eval to select and extract elements in one go
    if (url.includes("cenital")) {
        result = await page.$$eval(
            "section.posts-from-newsletter article",
            (articles) => {
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
            }
        );
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
