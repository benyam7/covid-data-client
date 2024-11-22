# COVID-19 Data Visualization Platform

This project provides an interactive platform for visualizing COVID-19-related data, focusing on age demographics, mortality rates, vaccination coverage, and pandemic trends across regions and countries. It combines advanced data fetching, caching strategies, and dynamic visualizations to deliver a seamless user experience.

---

## Features

### Age Proportions and Mortality Analysis

-   **Component**: `AgeGroupProportionsVsCasesAndDeathsChart`
    -   Visualizes age demographics (65+ vs. 70+) and highlights total deaths in a region or country.
    -   Allows dynamic region selection via a dropdown menu.
    -   Caching and memoization ensure smooth data handling.

---

### Pandemic Trends Across Regions

-   **Component**: `TotalCasesVsTotalDeathsAcrossRegions`
    -   Compares total cases, total deaths, and average smoking rates (male and female) across regions.
    -   Utilizes bar charts for clear comparative analysis.

---

### Total Deaths Over Time

-   **Component**: `TotalDeathsOverTimeForSelectedRegions`
    -   Tracks total deaths over time for selected regions, enabling users to compare mortality trends.
    -   Dynamic date range and region selection with real-time updates.

---

### Global Vaccination Coverage

-   **Component**: `VaccinationCoverageChoropleth`
    -   Choropleth map visualizing the percentage of vaccinated people worldwide.
    -   Provides a global overview of vaccination progress and disparities.

---

## Technology Stack

### Frontend

-   **Framework**: React with TypeScript
-   **Charting Libraries**: Recharts, Nivo
-   **Styling**: Tailwind CSS, ShadCN components
-   **State Management**: React Hooks, Memoization

### Backend

-   **Framework**: Node.js
-   **Database**: MongoDB
-   **Caching**: Redis

---

## Caching Strategies

Efficient data handling is critical for performance and scalability. The platform employs the following caching strategies:

### Client-Side Caching with SWR

-   **Usage**: Fetches data using hooks like `useSWR` for real-time updates.
-   **Benefits**:
    -   Automatically handles revalidation.
    -   Caches API responses to avoid redundant network requests.
    -   Gracefully handles loading and error states.

---

### Backend Caching with Redis

-   **Usage**: Stores aggregated data from MongoDB to reduce computation overhead.
-   **Implementation**:
    -   Each query generates a unique cache key based on parameters like region, date, etc.
    -   Data is cached for a defined TTL (time-to-live), ensuring freshness while reducing database hits.

---

### Memoization

-   **Usage**: Components like `AgeGroupProportionsVsCasesAndDeathsChart` and `TotalDeathsOverTimeForSelectedRegions` use `React.useMemo` for expensive computations (e.g., filtering or aggregating data).
-   **Benefits**:
    -   Optimizes rendering performance.
    -   Prevents unnecessary recalculations.

---

## How to Run the Project

### Prerequisites

-   **Node.js**: v16+
-   **MongoDB**: A running instance of MongoDB.
-   **Redis**: A running Redis server for backend caching.

---

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/covid-data-benyam.git
    cd covid-data-benyam

    2.	Install dependencies:
    ```

npm install

    3.	Run the development server:

npm run dev

    4.	Open the app in your browser:

http://localhost:3000

Use Cases

1. Public Health Analysis

    • Identify age demographics most affected by COVID-19.
    • Compare mortality trends and vaccination rates across regions.

2. Policy Decision Support

    • Visualize global vaccination coverage to guide resource allocation.
    • Analyze the impact of health behaviors like smoking on pandemic outcomes.

3. Research and Reporting

    • Use charts to support academic studies and media reports.
