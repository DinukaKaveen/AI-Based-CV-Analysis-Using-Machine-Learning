from flask import Flask, request, jsonify, session
import user_controller

app = Flask(__name__)

@app.route('/register', methods=['POST'])
def register():
    return user_controller.register()
    

@app.route('/login', methods=['POST'])
def login():
    return user_controller.login()


if __name__ == '__main__':
    app.run(debug=True)