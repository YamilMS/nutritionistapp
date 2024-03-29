"""empty message

Revision ID: 97c8f778c334
Revises: e52f9853e5c8
Create Date: 2022-10-27 20:17:44.050899

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '97c8f778c334'
down_revision = 'e52f9853e5c8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('client', sa.Column('test', sa.String(length=120), nullable=True))
    op.add_column('session', sa.Column('name_client', sa.String(length=100), nullable=True))
    op.add_column('session', sa.Column('name_nutritionist', sa.String(length=100), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('session', 'name_nutritionist')
    op.drop_column('session', 'name_client')
    op.drop_column('client', 'test')
    # ### end Alembic commands ###
