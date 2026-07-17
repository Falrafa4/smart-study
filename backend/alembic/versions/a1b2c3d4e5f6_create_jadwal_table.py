"""create jadwal table

Revision ID: a1b2c3d4e5f6
Revises: 2813854a7b0e
Create Date: 2026-07-17 07:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, Sequence[str], None] = '2813854a7b0e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'jadwal',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('hari', sa.String(), nullable=False),
        sa.Column('jam', sa.String(), nullable=False),
        sa.Column('mapel', sa.String(), nullable=False),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now()),
    )


def downgrade() -> None:
    op.drop_table('jadwal')
