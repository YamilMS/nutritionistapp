"""empty message

Revision ID: 2cb1cde24da5
Revises: 86d20c7bda3b
Create Date: 2022-10-18 13:10:06.317534

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2cb1cde24da5'
down_revision = '86d20c7bda3b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('nutritionist', sa.Column('professional', sa.String(length=80), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('nutritionist', 'professional')
    # ### end Alembic commands ###