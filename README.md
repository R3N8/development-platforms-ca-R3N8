# Development Platforms CA

## Installation & Configuration

Clone the repository

```bash
git clone https://github.com/your-username/development-platforms-ca.git
cd development-platforms-ca
```

Install dependencies

```bash
npm install
```

## Environment variables

```bash
VITE_SUPABASE_URL=""
VITE_SUPABASE_ANON_KEY=""
```

## Run the project

npm run dev

## Access the app

Netlify: (View Project)[]

## Motivation

I chose Option 2 (Supabase + React) because I wanted to explore building a full-stack web application without having to implement a custom backend. Using Supabase simplified authentication, database storage, and realtime functionality.

**What I liked:**

- How quickly I could integrate authentication and database operations.
- Using React + Tailwind for a responsive and modern frontend.

**What was challenging:**

- Understanding Supabase’s Row-Level Security (RLS) policies at first.
- Ensuring proper session handling for authentication-protected routes.

**Thoughts on custom API vs Supabase:**

- A custom API gives full control over server logic and security, but requires more setup and maintenance.
- Supabase allows faster development with built-in features like auth and database management, making it ideal for small projects or prototypes.
