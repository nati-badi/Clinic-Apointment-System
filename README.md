# Clinic Mini System

A clean, minimalistic, and scalable clinic appointment management system built for the Dallol Technology review.

## Tech Stack

* **Backend**: Node.js, Express, TypeScript, JWT Authentication.
* **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, TypeScript.
* **Database**: In-memory data structures (as per requirements for maximum simplicity).

## Design Decisions

1. **Clean Architecture**: I used a strict Controller-Route-Middleware pattern for the backend architecture.
2. **Security**: I used JWTs for authentication. The `authMiddleware.ts` file intercepts incoming requests and ensures the token is valid before granting access to protected routes.
3. **Validation**: I implemented basic server-side and client-side validation (e.g. rejecting past dates for appointments).
4. **Minimalistic UI**: I used Tailwind CSS to build a modern, clean, and responsive user interface without relying on heavy UI component libraries.

## Setup Instructions

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` directory:

   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server (runs on port 5000 by default):

   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the Next.js development server (runs on port 3000 by default):

   ```bash
   npm run dev
   ```
