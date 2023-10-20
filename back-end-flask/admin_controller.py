from flask import Flask, request, jsonify
from passlib.hash import sha256_crypt
from connection import create_connection


# Register a new user
def admin_register():
    conn = create_connection()
    data = request.get_json()
    first_name = data['first_name']
    last_name = data['last_name']
    email = data['email']
    phone_no = data['phone_no']
    job_role = data['job_role']
    username = data['username']
    password = sha256_crypt.hash(data['password'])
    cursor = conn.cursor()
    cursor.execute("INSERT INTO admin (first_name, last_name, email, phone_no, job_role, username, password) VALUES (%s, %s, %s, %s, %s, %s, %s)", (first_name, last_name, email, phone_no, job_role, username, password))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Registered Successfully"})

# Login
def admin_login():
    conn = create_connection()
    cursor = conn.cursor()
    data = request.get_json()
    username = data['username']
    password_candidate = data['password']
    cursor.execute("SELECT * FROM admin WHERE username=%s", (username,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if user:
        user = user_to_dict(user)
        if sha256_crypt.verify(password_candidate, user['password']): 
            return jsonify({"message": "Login successful", "admin_id": user['id'], "username": user['username']}) 
        else:
            return jsonify({"message": "Invalid password"})
    else:
        return jsonify({"message": "Username not found"})
    

def user_to_dict(user):
    return {'id': user[0], 'first_name': user[1], 'username': user[6], 'password': user[7]}