from flask import Flask, render_template, request, redirect
from flask_scss import Scss
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# App setup
app = Flask(__name__)
Scss(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Task Table
class Tasks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(100), nullable=False)
    complete = db.Column(db.Integer)
    created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self) -> str:
        return f"Task {self.id}"
    
with app.app_context():
    db.create_all()
    
@app.route("/", methods=["POST", "GET"])
def index():
    # Adding Tasks
    if request.method == "POST":
        current_task = request.form["task-input"]
        newTask = Tasks(content=current_task)
        try:
            db.session.add(newTask)
            db.session.commit()
            return redirect("/")
        except Exception as e:
            print(f"ERROR:{e}")
            return f"ERROR:{e}"
        
    # Load Tasks
    else:
        tasks = Tasks.query.order_by(Tasks.created).all()
        return render_template("index.html", tasks=tasks)

if __name__ == "__main__":
    app.run(port=5000, debug=True)