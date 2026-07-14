from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite database file will be created at: backend/smartstudy.db
DATABASE_URL = "sqlite:///./smartstudy.db"

# For SQLite, check_same_thread=False is required for FastAPI's
# multi-threaded request handling
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """FastAPI dependency that provides a database session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
