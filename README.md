# Everybody's Everything

A simple anonymous posting application where anyone can post anything. Built with Next.js, TypeScript, and PostgreSQL.

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Bun (for local development)

### Environment Setup

1. Copy the environment example file:
```bash
cp env.example .env
```

2. Configure your environment variables in `.env`:

**For local development:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
REDIS_URL="redis://localhost:6379"
```

**For Docker:**
```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/appdb"
REDIS_URL="redis://redis:6379"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="appdb"
```

### Running the Application

**With Docker (recommended):**
```bash
docker-compose up --build
```

**Local development:**
```bash
bun install
bun run db:push
bun run dev
```

The application will be available at http://localhost:3000