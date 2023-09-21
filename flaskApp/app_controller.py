from flask import Flask, request, jsonify, session, make_response
from flask_cors import CORS
import secrets
import user_controller

app = Flask(__name__)
CORS(app)

app.secret_key = secrets.token_hex(16)

@app.route('/register', methods=['POST'])
def register():
    return user_controller.register()
    

@app.route('/login', methods=['POST'])
def login():
    return user_controller.login()


@app.route('/set_user', methods=['POST'])
def set_session_user():
    user = request.get_json()
    session['user_id'] = user['user_id']
    # Set the session cookie in the browser
    response = make_response(jsonify({'message': 'User ID set in session'}))
    response.set_cookie('session', session.sid)
    return response

@app.route('/get', methods=['GET'])
def get_session():
    if 'user_id' in session:
        return jsonify({'message': session['user_id']}) 
    
    return jsonify({'message': "no session"} ) 

    #return jsonify({"value": session.get("user_id")}) 

if __name__ == '__main__':
    app.run(host='localhost', port=5000) 