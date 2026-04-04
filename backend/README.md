# Campus Transport Management System

A production-grade Node.js backend using Express.js.

## Architecture

Follows a strict MVC pattern with layered architecture (Routes -> Controllers -> Services -> Models).

## Requirements

- Node.js
- MongoDB

## Setup

1. Copy `.env.example` to `.env` or just use the created `.env`. Make sure `MONGODB_URI` points to a valid MongoDB instance.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed the database with initial admin user (email: `admin@university.edu`, password: `password123`):
   ```bash
   npm run seed
   ```
4. Start the server (Dev Mode):
   ```bash
   npm run dev
   ```

## Postman / API Testing
All routes follow RESTful naming conventions under `/api/v1/`.
