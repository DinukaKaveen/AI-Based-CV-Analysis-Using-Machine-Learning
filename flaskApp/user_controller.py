from flask import Flask, request, jsonify, session
from passlib.hash import sha256_crypt
from connection import create_connection


# Register a new user
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
        user = user_to_dict(user)
        if sha256_crypt.verify(password_candidate, user['password']):
            #session['logged_in'] = True
            #session['user_id'] = user['id']     
            return jsonify({"message": "Login successful", "user_id": user['id']}) 
        else:
            return jsonify({"message": "Invalid password"})
    else:
        return jsonify({"message": "Username not found"})
    

def user_to_dict(user):
    return {'id': user[0], 'first_name': user[1], 'username': user[2], 'password': user[3]}