#!/bin/bash
set -e

DB_FILE="smartstudy.db"
VENV_PYTHON=".venv/bin/python"

cd "$(dirname "$0")"

if [ ! -d ".venv" ]; then
    echo "ERROR: Virtual environment .venv/ tidak ditemukan."
    exit 1
fi

echo "1/3 Menghapus database lama..."
rm -f "$DB_FILE"
rm -f "data/$DB_FILE"
echo "    $DB_FILE dihapus."

echo "2/3 Menjalankan migrasi (alembic upgrade head)..."
.venv/bin/alembic upgrade head
echo "    Migrasi selesai."

echo "3/3 Menyuntikkan data seed..."
"$VENV_PYTHON" seed.py
echo "    Seeding selesai."

echo ""
echo "Database fresh selesai. Siap dipakai."
