# AI-Powered Chatbot

This is a full-stack chatbot application built with Vue.js and Node.js. It features a clean, modern interface and a powerful backend that integrates with an AI service to provide intelligent responses. This project was built to showcase my skills in full-stack development, API design, and building interactive user experiences.

## Portfolio

This project is a key part of my portfolio. It demonstrates my ability to:

*   **Build a complete full-stack application from scratch.**
*   **Design and implement a RESTful API.**
*   **Work with modern frontend frameworks like Vue.js.**
*   **Integrate with external AI services.**
*   **Manage a database and handle user authentication.**
*   **Create a responsive and user-friendly interface.**

I am proud of the work I have done on this project and I am confident that it showcases my skills and experience as a software engineer.

## Features

*   **User Authentication:** Secure user registration and login.
*   **Chat Sessions:** Create, view, and manage multiple chat sessions.
*   **Real-time Chat:** Instant messaging with an AI assistant.
*   **Responsive Design:** The application is fully responsive and works on all screen sizes.
*   **AI Integration:** The chatbot is powered by an AI service to provide intelligent and human-like responses.

## Technologies Used

### Frontend

*   **Vue.js:** A progressive JavaScript framework for building user interfaces.
*   **Vite.js:** A fast build tool for modern web projects.
*   **Vue Router:** The official router for Vue.js.
*   **Vuex:** A state management pattern and library for Vue.js applications.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Axios:** A promise-based HTTP client for the browser and Node.js.

### Backend

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
*   **PostgreSQL:** A powerful, open-source object-relational database system.
*   **JSON Web Tokens (JWT):** A compact, URL-safe means of representing claims to be transferred between two parties.
*   **bcrypt:** A library for hashing passwords.
*   **pg:** A Node.js module for interfacing with the PostgreSQL database.

## Setup and Installation

To get the project up and running on your local machine, follow these steps:

### Prerequisites

*   [Node.js](https://nodejs.org/) (v14 or later)
*   [PostgreSQL](https://www.postgresql.org/)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

**Frontend:**

```bash
npm install
```

**Backend:**

```bash
cd backend
npm install
```

### 3. Set up the database

1.  Create a new PostgreSQL database.
2.  Copy the `.env.example` file to `.env` in the `backend` directory and update the database connection details.
3.  Run the `schema.sql` file to create the necessary tables.

### 4. Configure environment variables

Copy the `.env.example` file to `.env` in the root directory and update the necessary environment variables.

### 5. Run the application

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
npm run dev
```

The application should now be running at `http://localhost:8080`.