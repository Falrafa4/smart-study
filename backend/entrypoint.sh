#!/bin/sh

# Ensure SQLite data directory exists
mkdir -p /app/data

# If database doesn't exist in the persistent volume, create a blank one
if [ ! -f /app/data/smartstudy.db ]; then
    echo "Creating blank database..."
    touch /app/data/smartstudy.db
fi

# Create symlink so that local sqlite:///./smartstudy.db points to volume
ln -sf /app/data/smartstudy.db /app/smartstudy.db

# Run alembic migrations
echo "Running alembic migrations..."
alembic upgrade head

# Start FastAPI application
echo "Starting FastAPI application..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
