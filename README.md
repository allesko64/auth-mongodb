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

## Environment Variables

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://127.0.0.1:27017/authdb

JWT_ACCESS_TOKEN=your_access_secret
JWT_REFRESH_TOKEN=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
SMTP_FROM_NAME=Auth API
SMTP_FROM_EMAIL=no-reply@example.com

CLIENT_URL=http://localhost:3000
```

## API Base URL

`/api/auth`

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
