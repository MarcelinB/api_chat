
# ChatAPI

This Api will allow you to create fictional universes and characters, and discuss them with DaVinci.

## Prerequisites

- Node.js (version X.X.X)
- NPM (version X.X.X)
- Docker (version X.X.X)

## Installation

1. Clone the repository:

```shell
git clone https://github.com/MarcelinB/api_chat.git
```

2. Install dependencies:

```shell
cd project-folder
npm install
```

3. Configure environment variables:

Create a `.env` file in the root directory and configure the following variables:

```shell
# Database connection
DATABASE_HOST=db
DATABASE_PORT=3306
DATABASE_NAME=api_chat_DB
DATABASE_USER=db_user
DATABASE_PASSWORD=db_password

# OpenAI API key
OPENAI_API_KEY=your-openai-api-key
```

4. Start the application:

```shell
npm start
```

The API will be available at `http://localhost:3000`.

## Database Configuration (Docker Compose)

This project uses MySQL as the database. To set up the database using Docker Compose, follow these steps:

1. Create a file named `docker-compose.yml` in the project's root directory.

2. Add the following content to the `docker-compose.yml` file:

```yaml
version: '3.1'

services:
  db:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: api_chat_DB
      MYSQL_USER: db_user
      MYSQL_PASSWORD: db_password
    volumes:
      - ./mysql_data:/var/lib/mysql
```

3. Run the following command to start the database container:

```shell
docker-compose up -d
```

The database will be accessible at `localhost:3306`.

## API Endpoints

### Characters

- `GET /characters`: Get all characters.
- `GET /characters/:id`: Get a specific character by ID.
- `POST /characters`: Create a new character.
- `PUT /characters/:id`: Update a character.
- `DELETE /characters/:id`: Delete a character.

### Messages

- `GET /messages`: Get all messages.
- `GET /messages/:id`: Get a specific message by ID.
- `POST /messages`: Create a new message.
- `PUT /messages/:id`: Update a message.
- `DELETE /messages/:id`: Delete a message.

### Universes

- `GET /univers`: Get all universes.
- `GET /univers/:id`: Get a specific universe by ID.
- `POST /univers`: Create a new universe.
- `PUT /univers/:id`: Update a universe.
- `DELETE /univers/:id`: Delete a universe.

### Authentication

- `POST /auth/login`: Authenticate a user and retrieve a JWT token.

For detailed information about each endpoint, including request/response examples, authentication requirements, and more, please refer to the Swagger documentation. The Swagger interface is available at `http://localhost:3000/api`.

## Authentication

This API uses JWT (JSON Web Token) for authentication. To access protected endpoints, include the JWT token in the `Authorization` header of your requests:

```
Authorization: Bearer <token>
```

To obtain a token, make a POST request to `/auth/login` with valid credentials.

## Contributions

Contributions are welcome! If you