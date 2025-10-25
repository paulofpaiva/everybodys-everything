![Everybody's Everything Logo](./assets/ee_logo.png)

# Everybody's Everything

An anonymous posting application where anyone can share anything - texts, drawings, or a combination of both.

## Features

- **Text Posts**: Share messages anonymously
- **Drawing**: Create drawings using an integrated drawing tool
- **Mixed Posts**: Combine text and drawing in a single post
- **Dark Mode**: Support for light and dark themes
- **Fully Anonymous**: No authentication or registration required

## Tech Stack

**Frontend:**
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI (components)
- React Sketch Canvas (drawing tool)
- React Hook Form + Zod (form validation)

**Backend:**
- Next.js API Routes
- Drizzle ORM
- PostgreSQL

**DevOps:**
- Docker & Docker Compose
- Bun (runtime)
- Railway (deployment)

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Bun (for local development)

### Configuration

1. Configure environment variables in `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

### Running the Application

**With Docker (recommended):**
```bash
docker-compose up --build
```

**Local development:**
```bash
bun install
bun run db:migrate
bun run dev
```

The application will be available at http://localhost:3000

**Note:** This app uses in-memory rate limiting (no external dependencies required).
