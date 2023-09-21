from flask import Flask, request, jsonify, session, make_response
from flask_cors import CORS, cross_origin
import secrets
import user_controller

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

@app.route('/register', methods=['POST'])
def register():
    return user_controller.register()
    

@app.route('/login', methods=['POST'])
def login():
    return user_controller.login()


if __name__ == '__main__':
    app.run(host='localhost', port=5000) 