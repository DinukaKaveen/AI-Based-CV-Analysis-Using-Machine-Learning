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

if __name__ == '__main__':
    app.run(debug=True)