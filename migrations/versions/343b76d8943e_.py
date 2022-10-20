"""empty message

Revision ID: 343b76d8943e
Revises: 47775e3af8ad
Create Date: 2022-10-18 22:16:39.737517

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '343b76d8943e'
down_revision = '47775e3af8ad'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('client', sa.Column('days', sa.String(length=120), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('client', 'days')
    # ### end Alembic commands ###