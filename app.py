from flask import Flask, render_template, request, redirect, jsonify
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
    taskDate = db.Column(db.String(), nullable=False)
    created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self) -> str:
        return f"Task {self.id}"
    
    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'taskDate': self.taskDate,
            'created': self.created.isoformat()
        }
    
with app.app_context():
    db.create_all()
    
@app.route("/", methods=["POST", "GET"])
def index():
    # Adding Tasks
    if request.method == "POST":
        current_task = request.form["task-input"]
        date = request.form["date-input"]
        newTask = Tasks(content=current_task, taskDate=date)
        try:
            db.session.add(newTask)
            db.session.commit()
            return redirect("/")
        except Exception as e:
            print(f"ERROR:{e}")
            return f"ERROR:{e}"
    # Load Tasks
    else:
        tasks = Tasks.query.order_by(Tasks.created.desc()).all()
        return render_template("index.html", tasks=tasks)

@app.route("/delete/<int:id>")
def delete(id: int):
    print("TEst")
    delete_task = Tasks.query.get_or_404(id)
    try:
        db.session.delete(delete_task)
        db.session.commit()
        return redirect("/")
    except Exception as e:
        return f"ERROR:{e}"

@app.route("/tasks")
def getTasks():
    tasks = Tasks.query.order_by(Tasks.created.desc()).all()
    return jsonify([task.to_dict() for task in tasks])

if __name__ == "__main__":
    app.run(port=5000, debug=True)