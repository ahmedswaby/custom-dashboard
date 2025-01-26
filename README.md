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

   # Table Component & Supporting Features

    ## Overview
    The Table Component provides a customizable, interactive data table with features like sorting, filtering, pagination, and custom cell rendering. It uses ag-Grid for powerful performance and flexibility, making it ideal for large datasets.

    ---

    ## **Table Component**

    ### **Key Features**
    - **Dynamic Data Rendering**: Displays data via props with customizable columns.
    - **Custom Cell Renderers**: Easily create tailored cells (e.g., action buttons).
    - **Performance**: Optimized for large datasets.

    ### **Why Use It?**
    Scalability, flexibility, and robust performance through ag-Grid.

    ---

    ## **ActionsCellRenderer**

    ### **Purpose**
    Adds action buttons like View, Edit, Delete, and Toggle Status to table rows.

    ### **Key Features**
    - **Dynamic Buttons**: Enable or disable buttons based on props.
    - **Modal Integration**: Opens modals to show detailed info.
    - **Callbacks**: Easily link actions like edit or delete.

    ### **Why Use It?**
    Centralizes row-specific actions, improving interactivity and reusability.

    ---

    ## **CustomDropdownEditor**

    ### **Purpose**
    Allows inline dropdown editing for table cells.

    ### **Why Use It?**
    Simplifies editing and provides tailored dropdown interactions.

    ---

    ## **Modal Component**

    ### **Purpose**
    A reusable modal for displaying detailed info or inputs.

    ### **Why Use It?**
    Supports dynamic content and enhances modularity.

    ---

    ## Design Choices
    - **Modularity**: Separate features into reusable components.
    - **Flexibility**: Custom props and renderers for diverse use cases.
    - **Performance**: Optimized for large-scale data handling.

    ---

    ## Conclusion
    The Table Component and its subcomponents prioritize flexibility, performance, and usability, ensuring they handle complex requirements while remaining easy to extend and maintain.

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

