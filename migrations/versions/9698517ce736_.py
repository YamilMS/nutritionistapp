"""empty message

Revision ID: 9698517ce736
Revises: 2f45939e31d6
Create Date: 2022-11-03 18:26:51.612511

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9698517ce736'
down_revision = '2f45939e31d6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('client', sa.Column('photo', sa.String(length=500), nullable=False))
    op.add_column('nutritionist', sa.Column('photo', sa.String(length=500), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('nutritionist', 'photo')
    op.drop_column('client', 'photo')
    # ### end Alembic commands ###