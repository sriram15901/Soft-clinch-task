from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Sriram@1592001",  # YOUR PASSWORD
    database="whatsapp_crud"
)
cursor = mydb.cursor()

@app.route("/add-user", methods=["POST"])
def add_user():
    data = request.json
    username = data["username"]
    cursor.execute("INSERT INTO users (username) VALUES (%s)", (username,))
    mydb.commit()
    return jsonify({"message": "User added"})

@app.route("/users", methods=["GET"])
def get_users():
    cursor.execute("SELECT id, username FROM users")
    users = cursor.fetchall()
    return jsonify([{"id": u[0], "username": u[1]} for u in users])

@app.route("/delete-user/<int:id>", methods=["DELETE"])
def delete_user(id):
    cursor.execute("DELETE FROM users WHERE id = %s", (id,))
    cursor.execute("DELETE FROM messages WHERE user_id = %s", (id,))
    mydb.commit()
    return jsonify({"message": "User deleted"})

@app.route("/send_message", methods=["POST"])
def send_message():
    data = request.json
    cursor.execute(
        "INSERT INTO messages (user_id, message) VALUES (%s, %s)",
        (data["user_id"], data["message"]),
    )
    mydb.commit()
    return jsonify({"message": "Message sent"})

@app.route("/messages", methods=["GET"])
def get_messages():
    cursor.execute("SELECT m.id, m.user_id, m.message FROM messages m")
    messages = cursor.fetchall()
    return jsonify([{"id": m[0], "user_id": m[1], "message": m[2]} for m in messages])

if __name__ == "__main__":
    app.run(debug=True)
