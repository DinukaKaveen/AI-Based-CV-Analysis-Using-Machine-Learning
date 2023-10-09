from flask import Flask, request, jsonify, session, make_response
from flask_cors import CORS, cross_origin
import secrets
import admin_controller
import resume_controller

app = Flask(__name__)

# Block all other origins by setting a default CORS configuration
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure CORS for specific URLs
CORS(app, resources={
    r"/register": {"origins": ["http://localhost:3000"]},
    r"/login": {"origins": ["http://localhost:3000"]}
})

app.secret_key = secrets.token_hex(16)

# @app.route("/*")
# @cross_origin()
# def all_other_routes():
#     return "This route is blocked."

@app.route('/admin_login', methods=['POST'])
def login():
    return admin_controller.login()

@app.route('/admin_register', methods=['POST'])
def register():
    return admin_controller.register()

@app.route('/upload_resume', methods=['POST'])
def upload_resume():
    return resume_controller.upload_resume()

if __name__ == '__main__':
    app.run(host='localhost', port=5000) 