# Products Service

You are developing a backend service for an e-commerce platform using NestJS as the framework and Sequelize as the ORM for MySQL. Your goal is to create a module that manages products in the database.

## Prerequisites

Before proceeding, ensure you have the following installed on your system:

- Docker
- DockerCompose
- NodeJS 18.x

## Run the app using docker

To run application using docker, follow these steps:

```bash
cp .dockerenv.example .dockerenv
```

```bash
docker-compose --env-file .dockerenv up -d
```

### Testing the Application

The project includes unit tests and end-to-end (e2e) tests. Here is how you can run these tests:

To execute the unit tests, run the following command:

```bash
docker exec api npm run test
```

#### End-to-End Tests

To execute the end-to-end tests, run this command:

```bash
docker exec api npm run test:e2e
```

### Seed data

To seed some mock products, run the following command:

```bash
docker exec api npm run seed
```

### Swagger UI

Th project is configured with Swagger to provide API documentation and a testing interface. To access the Swagger UI navigate to:

<http://localhost:30100/api>


### Stop the app

```bash
docker-compose --env-file .dockerenv down
```

## Run the app without docker

To run application locally, follow these steps:

Copy default env file 

```bash
cp .env.example .env
```

Create database and user in your mysql server instance using CLI or a GUI

```sql
CREATE DATABASE IF NOT EXISTS your_database;
GRANT ALL PRIVILEGES ON your_database.* TO 'your_user'@'%';
FLUSH PRIVILEGES;
```

Udpate required settings in env file to allow connection to your mysql server

```env
DB_HOSTNAME=your_hostname or ip
DB_PORT=your_port_number
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_pasword
```

Install the project dependencies:

```bash
npm install
```

Start the NestJS server:

```bash
npm run start
```

This script will launch the NestJS application, typically available at `http://localhost:3000`.

### Testing the Application

The project includes unit tests and end-to-end (e2e) tests. Here is how you can run these tests:

To execute the unit tests, run the following command:

```bash
npm run test
```

#### End-to-End Tests

It require a db in same server with same name suffixed with "_test" for example: "ecommerce_test", so it could run test without alter existing data.
To execute the end-to-end tests, run this command:

```bash
npm run test:e2e
```

### Seeding the Database

To seed the database with mock data, use the seed script provided in the project:

```bash
npm run seed
```

This script will populate the database with predefined data, which is useful for development and testing purposes.

### Checking the Swagger UI

The project is configured with Swagger to provide API documentation and a testing interface. To access the Swagger UI navigate to:

<http://localhost:3000/api>

For any further information, feel free to contact me.
