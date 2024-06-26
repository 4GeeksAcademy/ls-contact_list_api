"""empty message

Revision ID: 837574314314
Revises: 
Create Date: 2024-03-23 00:42:19.866151

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '837574314314'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('agendas',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('agenda_name', sa.String(length=80), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('agenda_name')
    )
    op.create_table('contacts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('address', sa.String(length=240), nullable=False),
    sa.Column('phone', sa.String(length=15), nullable=False),
    sa.Column('agendas_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['agendas_id'], ['agendas.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('phone')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('contacts')
    op.drop_table('agendas')
    op.drop_table('user')
    # ### end Alembic commands ###
