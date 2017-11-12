import os
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

BASE_DIR = os.path.abspath(os.path.dirname(__file__))  

# SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'scraper.db')
SQLALCHEMY_DATABASE_URI = "sqlite:////Users/casper.coertze/Documents/results_server/scraper/scraper.db"
# db = SQLAlchemy(app)
engine = create_engine(SQLALCHEMY_DATABASE_URI)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))


 

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    # import all modules here that might define models so that
    # they will be registered properly on the metadata.  Otherwise
    # you will have to import them first before calling init_db()
    import yourapplication.models
    # Base.metadata.create_all(bind=engine)