# Full-Stack-CRUD
# Task Manager

Full-Stack CRUD application built with:

* React (Vite)
* Spring Boot
* PostgreSQL

## Features

* Create tasks
* View tasks
* Edit tasks
* Delete tasks

## Technologies

### Frontend

* React
* Axios

### Backend

* Spring Boot
* Spring Data JPA

### Database

* PostgreSQL

## Run Backend

```bash
cd backend
.\mvnw spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Database Configuration

Create PostgreSQL database:

```text
taskmanager
```

Configure database settings in:

```text
backend/src/main/resources/application.properties
```
