from flask import Flask, request, jsonify, send_from_directory, session, make_response
from flask_cors import CORS, cross_origin
from connection import create_connection
from werkzeug.utils import secure_filename
from docx import Document
import os
import secrets
import admin_controller
import user_controller
import job_post_controller
import resume_controller

app = Flask(__name__)

app.config['UPLOAD_FOLDER_JD']='E:/Projects/AI Based CV Analysis Using ML/AI-Based-CV-Analysis-Using-Machine-Learning/files/Job_Descriptions'
app.config['UPLOAD_FOLDER_RESUME']='E:/Projects/AI Based CV Analysis Using ML/AI-Based-CV-Analysis-Using-Machine-Learning/files/Resume_Uploads'

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
def admin_login():
    return admin_controller.admin_login()


@app.route('/admin_register', methods=['POST'])
def admin_register():
    return admin_controller.admin_register()


@app.route('/user_login', methods=['POST'])
def user_login():
    return user_controller.user_login()


@app.route('/upload_jd', methods=['POST'])
def upload_jd():
    
    if 'file' not in request.files:
        return jsonify({"message": "No file part"})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"message": "No selected file"})

    if file:
        file_name = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER_JD'], file_name))

        data = request.form
        job_title = data['job_title']
        salary = data['salary']
        open_date = data['open_date']
        end_date = data['end_date']

        # Store the file path in the database
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO job_posts (job_title, salary, open_date, end_date, file_name) VALUES (%s, %s, %s, %s, %s)", (job_title, salary, open_date, end_date, file_name))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "File uploaded successfully"})

@app.route('/upload_resume', methods=['POST'])
def upload_resume():
    
    if 'file' not in request.files:
        return jsonify({"message": "No file part"})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"message": "No selected file"})

    if file:
        file_name = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER_RESUME'], file_name))

        data = request.form
        job_id = data['job_id']
        user_id = data['user_id']

        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO job_resumes (job_id, user_id, file_name) VALUES (%s, %s, %s)", (job_id, user_id, file_name))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "File uploaded successfully"})
  

@app.route('/get_job_posts', methods=['GET'])
def get_all_job_posts():
    return job_post_controller.get_all_job_posts()


@app.route('/get_job_post/<job_id>', methods=['GET'])
def get_job_post(job_id):
    return job_post_controller.get_job_post(job_id)


@app.route('/filecontent/<filename>', methods=['GET'])
def get_file_content(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER_JD'], filename)
    # Open the .docx file
    doc = Document(file_path)

    # Read the content of the document
    content = [para.text for para in doc.paragraphs]
    return jsonify({"content": content})



if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)  
