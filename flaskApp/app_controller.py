from flask import Flask, request, jsonify, session
import secrets
import user_controller

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

@app.route('/register', methods=['POST'])
def register():
    return user_controller.register()
    

@app.route('/login', methods=['POST'])
def login():
    return user_controller.login()

@app.route('/new_page')
def new_page():
    return "This is the new page."

if __name__ == '__main__':
    app.run(debug=True)