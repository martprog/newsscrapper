# News Scraper API

This API compiles different news from Argentina, specifically from Cenital and eldiario.ar. The intention is to expand coverage to additional media outlets in the future. News is fetched at the beginning of the process, and a cronjob updates the news twice a day, storing them in .json files. This approach minimizes the time spent on each API call.

## Available Routes

-   **Cenital:**

    -   Endpoint: `/cenital`

-   **Eldiario.ar:**
    -   Endpoint: `/eldiario`

## Getting Started

Follow these steps to set up and run the News Scraper API:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/martprog/newsscraper.git
    cd newsscraper
    ```

2. **Installing Dependencies and Running the API:**

    ```bash
    npm install
    node server.js
    ```

## Usage

-   Use the provided routes to access the latest news from Argentina.
