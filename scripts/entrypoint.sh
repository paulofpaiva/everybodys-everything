#!/bin/bash
set -e

echo "Running database migrations..."
bun run db:migrate

echo "Starting Next.js server..."
exec bun run start