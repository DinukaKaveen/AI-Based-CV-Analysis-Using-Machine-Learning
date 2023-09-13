from flask import Flask, request, jsonify, session
import mysql.connector
from passlib.hash import sha256_crypt

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a secret key

# Function to create a database connection
def create_connection():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="cv_analysis"
    )
    return conn

# Register a new user
@app.route('/register', methods=['POST'])
def register():
    conn = create_connection()
    data = request.get_json()
    first_name = data['first_name']
    username = data['username']
    password = sha256_crypt.hash(data['password'])
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (first_name, username, password) VALUES (%s, %s, %s)", (first_name, username, password))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "User registered successfully"})

# Login
@app.route('/login', methods=['POST'])
def login():
    conn = create_connection()
    cursor = conn.cursor()
    data = request.get_json()
    username = data['username']
    password_candidate = data['password']
    cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if user:
        user_id, username, password = user
        if sha256_crypt.verify(password_candidate, password):
            session['logged_in'] = True
            session['user_id'] = user_id
            return jsonify({"message": "Login successful"})
        else:
            return jsonify({"error": "Invalid password"})
    else:
        return jsonify({"error": "Username not found"})


if __name__ == '__main__':
    app.run(debug=True)