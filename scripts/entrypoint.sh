echo "Running database migrations..."
bun run db:push

echo "Starting Next.js server..."
exec bun run start
