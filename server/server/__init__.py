from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
# from server.models import models
# from server.controllers import controllers
from server.api import api 


app = Flask(__name__, static_folder="../../static")
app.register_blueprint(api)


#if __name__ == "__main__":
#app.run(debug=True)


# db = SQLAlchemy(app)
app.config.from_object('config')

print("INIT")

# Build the database
#db.create_all()
from server.database import init_db