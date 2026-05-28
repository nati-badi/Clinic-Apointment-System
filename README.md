# Clinic Mini System

A clean, minimalistic, and scalable clinic appointment management system built for the Dallol Technology review.

## Tech Stack

* **Backend**: Node.js, Express, TypeScript, JWT Authentication.
* **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, TypeScript.
* **Database**: Supabase (PostgreSQL) for scalable and secure data storage.

## Design Decisions

1. **Clean Architecture**: I used a strict Controller-Route-Middleware pattern for the backend architecture to maintain separation of concerns.
2. **Security**: I implemented JWTs for authentication. The `authMiddleware.ts` file intercepts incoming requests and ensures the token is valid before granting access to protected routes.
3. **Validation**: I implemented basic server-side and client-side validation (e.g., rejecting past dates for appointments) to ensure data integrity.
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

3. Create a `.env` file in the root of the `backend` directory and add your environment variables (including Supabase credentials):

   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the development server (runs on port 5000 by default):

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
