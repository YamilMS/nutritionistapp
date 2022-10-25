"""empty message

Revision ID: e3e3c5b85d24
Revises: e52f9853e5c8
Create Date: 2022-10-25 17:41:36.532106

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e3e3c5b85d24'
down_revision = 'e52f9853e5c8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('client', 'days',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.Date(),
               existing_nullable=False)
    op.alter_column('client', 'times',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.DateTime(),
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('client', 'times',
               existing_type=sa.DateTime(),
               type_=sa.VARCHAR(length=120),
               existing_nullable=False)
    op.alter_column('client', 'days',
               existing_type=sa.Date(),
               type_=sa.VARCHAR(length=120),
               existing_nullable=False)
    # ### end Alembic commands ###
