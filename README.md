# Auth MongoDB API

A small Node.js + Express + MongoDB authentication API.

## Features

- User registration and login
- Email verification
- Access token + refresh token flow
- Forgot/reset password flow
- Protected user profile endpoint (`aboutMe`)

## Tech Stack

- Node.js (ES Modules)
- Express
- MongoDB + Mongoose
- JWT
- Nodemailer
- Joi validation

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root.

3. Start in development mode:

```bash
npm run dev
```

For production/local start:

```bash
npm start
```


## Routes

- `POST /register`
- `POST /login`
- `POST /logout` (protected)
- `POST /refersh`
- `GET /verify-email/:token`
- `POST /forgetPassword`
- `PUT /reset-password/:token`
- `GET /aboutMe` (protected)

## Project Structure

- `server.js`: app bootstrap + DB connection
- `src/app.js`: Express app + global error handling
- `src/module/auth`: auth module (controller, service, model, routes, DTOs)
- `src/common`: shared config, middleware, and utilities
