# Project Name

This is a simple Express.js server that uses a PostgreSQL database to manage users and sectors. It provides several endpoints for fetching and inserting data.

## Installation

1. Clone the repository: `git clone https://github.com/yourusername/yourrepository.git`
2. Install the dependencies: `npm install`
3. Copy the `.env.sample` file to a new file named `.env` and fill in your database credentials.
4. Run the migrations: `npx knex migrate:latest`
5. Seed the database: `npx knex seed:run`
6. Start the server: `npm start`

## Endpoints

- `GET /`: Fetches all sectors from the database.
- `GET /users`: Fetches all users from the database.
- `POST /addUser`: Adds a new user associated with a sector. The request body should be a JSON object with `name`, `sectors`, and `agreed` properties. `name` is the name of the user, `sectors` is an array of sector IDs, and `agreed` is a boolean indicating whether the user has agreed to the terms.

## Database Schema

The database consists of three tables:

- `Users`: Stores user data. Each user has an `id` and a `name`.
- `Sectors`: Stores sector data. Each sector has an `id`, a `name`, and a `parent_id` that references the `id` of another sector.
- `User_Sectors`: Associates users with sectors. Each row has a `user_id` that references a user's `id`, and a `sector_ids` array that contains the IDs of the associated sectors.