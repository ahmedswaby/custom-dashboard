# Dashboard

This repository contains the project that show a table (that is generic) for orders & users Pages using the most moderen technologies & best practices with ability to be scalable. Below are the steps taken during the development process, as well as instructions for running the project.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Steps Taken During Development](#steps-taken-during-development)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Running the Project](#running-the-project)
6. [Testing](#testing)

---

## Project Overview

[Provide an overview of what the project is about, its purpose, and any key features.]

---

## Steps Taken During Development

1. **Requirement Gathering**  
   - [List the steps taken during the requirement gathering phase, such as meetings, analysis, etc.]

2. **Setup and Initialization**  
   - Initialized the project using Vite.  
   - Set up the project structure with the following directories:
     - `/src`: Source files
     - `/public`: Static assets

3. **Backend/API Development**  
   - Created the following endpoints:
     - `/orders`: For orders API's
     - `/users`: For users API's

4. **Frontend Development**  
   - Built components using [React, AG Grid].  
   - Styled the UI using [CSS].  
   - Implemented state management using [Redux-RTK].

5. **Testing**  
   - Unit Testing using [Vitest] it's compitable with vitest and much faster than Jest.  

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Package Manager] (npm)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahmedswaby/custom-dashboard.git
   cd your-repo
   npm install
   npm start
    ```

2. For the database:
    ```bash
    npx json-server db.json --watch
    ```

  
## Testing 
    Run the next line to run test cases
    npm test

