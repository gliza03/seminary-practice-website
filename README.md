# Seminary Memory Game
A modern web application built with Node.js, Express.js, and PostgreSQL, featuring secure authentication and dynamic EJS-rendered views.

## Features
- **Express.js Backend** - Lightweight, efficient, and scalable server.
- **EJS Templating** - Dynamic HTML rendering with reusable components.
- **PostgreSQL Integration** - Using `knex.js` for structured queries.
- **Secure Authentication** - `bcrypt` for password hashing.
- **Environment Configuration** - `dotenv` for managing sensitive credentials.
- **Static Assets Handling** - Serving CSS and JS from `public/`.

## Installation
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Setup
1. Clone this repository:
   ```sh
   git clone <repo-url>
   cd <repo-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   ```sh
   cp .env.example .env
   ```
   Edit `.env` with your database credentials.

4. Run the application:
   ```sh
   npm start
   ```

## Project Structure
```
website/
│── public/          # Static assets (CSS, JS, images)
│── views/           # EJS templates
│── index.js         # Main server file
│── package.json     # Dependencies and scripts
│── .gitignore       # Ignored files
```

## Usage
- Navigate to `http://localhost:5500` (or configured port) to access the site.
- Modify `views/` for UI changes and `index.js` for backend logic.


