# Seminary Memory Game

A web app that helps seminary students memorize scriptures. Students log in, get a random set of scriptures to practice, and the app saves each attempt so they can see their progress over time.

## Features

- **Login** with bcrypt-hashed passwords
- **Memory game** that pulls random scriptures from the database (`/api/random-scriptures`)
- **Progress tracking:** saves each student's results and attempt number (`/api/save-results`, `/api/next-attempt-number/:studentId`)
- **Server-rendered pages** with EJS

## Tech stack

| Layer | Tools |
|---|---|
| Server | Node.js, Express, EJS |
| Database | PostgreSQL with Knex.js |
| Auth & config | bcrypt, dotenv |

## Run it locally

```bash
git clone https://github.com/gliza03/seminary-practice-website.git
cd seminary-practice-website
npm install
```

Create a `.env` file with your PostgreSQL connection details, then:

```bash
npm start
```

## Author

Gabriel Liza · [gabriellizam.com](https://gabriellizam.com) · [LinkedIn](https://www.linkedin.com/in/gabriellizam)
