from flask import Flask, request, jsonify, send_from_directory, session, make_response
from flask_cors import CORS, cross_origin
from connection import create_connection
from werkzeug.utils import secure_filename
#from docx import Document
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import docx2txt
import os
import re
import spacy
import fitz
import io
import secrets
import admin_controller
import user_controller
import job_post_controller
import job_resume_controller

app = Flask(__name__)

app.config['UPLOAD_FOLDER_JD'] = 'E:/Projects/AI Based CV Analysis Using ML/AI-Based-CV-Analysis-Using-Machine-Learning/files/Job_Descriptions'
app.config['UPLOAD_FOLDER_RESUME'] = 'E:/Projects/AI Based CV Analysis Using ML/AI-Based-CV-Analysis-Using-Machine-Learning/files/Resume_Uploads'

# Spacy model
print("Loading Resume Parser model...")

nlp = spacy.load("E:/Projects/AI Based CV Analysis Using ML/Assets/ResumeModel/model-output/model-best")
print("Resune Parser model loaded")

# Block all other origins by setting a default CORS configuration
#CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app)

# Configure CORS for specific URLs
# CORS(app, resources={
#     r"/register": {"origins": ["http://localhost:3000"]},
#     r"/login": {"origins": ["http://localhost:3000"]},
#     r"/get_job_post/<job_id>": {"origins": ["http://localhost:3000"]},
#     r"/filecontent/<filename>": {"origins": ["http://localhost:3000"]}
# })

app.secret_key = secrets.token_hex(16)


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
        cursor.execute("INSERT INTO job_posts (job_title, salary, open_date, end_date, file_name) VALUES (%s, %s, %s, %s, %s)",
                       (job_title, salary, open_date, end_date, file_name))
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
        resume_file_name = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER_RESUME'], resume_file_name))
        print("Resume Uploaded")

        data = request.form
        job_id = data['job_id']
        user_id = data['user_id']
        job_des_file_name = data['job_des_file_name']

        job_des_file = "E:/Projects/AI Based CV Analysis Using ML/AI-Based-CV-Analysis-Using-Machine-Learning/files/Job_Descriptions/"+job_des_file_name
        text_of_job_des = docx2txt.process(job_des_file)

        resume_file = "E:/Projects/AI Based CV Analysis Using ML/AI-Based-CV-Analysis-Using-Machine-Learning/files/Resume_Uploads/"+resume_file_name
        print(resume_file)
        doc = fitz.open(resume_file)
        print("Resume taken as input")

        text_of_resume = " "
        for page in doc:
            text_of_resume = text_of_resume + str(page.get_text())

        label_list = []
        text_list = []
        dic = {}

        doc = nlp(text_of_resume)
        for ent in doc.ents:
            label_list.append(ent.label_)
            text_list.append(ent.text)

        print("Model work done")

        for i in range(len(label_list)):
            if label_list[i] in dic:
                # if the key already exists, append the new value to the list of values
                dic[label_list[i]].append(text_list[i])
            else:
                # if the key does not exist, create a new key-value pair
                dic[label_list[i]] = [text_list[i]]

        print(dic)

        resume_data_annotated = ''
        for key, value in dic.items():
            for val in value:
                resume_data_annotated += val + " "

        resume_name = dic.get('NAME')
        if resume_name is not None:
            value_name = resume_name[0]
        else:
            value_name = None

        resume_linkedin = dic.get('LINKEDIN LINK')
        if resume_linkedin is not None:
            value_linkedin = resume_linkedin[0]
            value_linkedin = re.sub('\n', '', value_linkedin)
        else:
            value_linkedin = None

        resume_skills = dic.get('SKILLS')
        if resume_skills is not None:
            value_skills = resume_skills
            value_skills = ', '.join(value_skills)
        else:
            value_skills = None

        resume_language = dic.get('LANGUAGE')
        if resume_language is not None:
            value_language = resume_language
            value_language = ', '.join(value_language)
        else:
            value_language = None

        resume_degree = dic.get('DEGREE')
        if resume_degree is not None:
            value_degree = resume_degree
            value_degree = ', '.join(value_degree)
        else:
            value_degree = None

        resume_certificate = dic.get('CERTIFICATION')
        if resume_certificate is not None:
            value_certificate = resume_certificate
            value_certificate = ', '.join(value_certificate)
        else:
            value_certificate = None

        resume_workedAs = dic.get('WORKED AS')
        if resume_workedAs is not None:
            value_workedAs = resume_workedAs
            value_workedAs = ', '.join(value_workedAs)
        else:
            value_workedAs = None
        
        resume_companies = dic.get('COMPANIES WORKED AT')
        if resume_companies is not None:
            value_companies = resume_companies
            value_companies = ', '.join(value_companies)
        else:
            value_workedAs = None

        resume_experience = dic.get('YEARS OF EXPERIENCE')
        if resume_experience is not None:
            value_experience = resume_experience
            value_experience = ', '.join(value_experience)
        else:
            value_experience = None


        match_text = [text_of_resume, text_of_job_des]
        cv = CountVectorizer()
        count_matrix = cv.fit_transform(match_text)
        match_percentage = cosine_similarity(count_matrix)[0][1] * 100
        match_percentage = round(match_percentage, 2)
        match_percentage = str(match_percentage)

        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO job_resumes (job_id, user_id, name, linkedin, skills, language, degree, certification, worked_as, companies_worked, experience, file_name, resume_score) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (job_id, user_id, value_name, value_linkedin, value_skills, value_language, value_degree, value_certificate, value_workedAs, value_companies, value_experience, resume_file_name, match_percentage))
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

@app.route('/get_job_resume/<job_id>', methods=['GET'])
def get_job_resume(job_id):
    return job_resume_controller.get_job_resume(job_id)

@app.route('/get_resume/<resume_id>', methods=['GET'])
def get_resume(resume_id):
    return job_resume_controller.get_resume(resume_id)


@app.route('/filecontent/<filename>', methods=['GET'])
def get_file_content(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER_JD'], filename)

    #doc = Document(file_path)
    #content = [para.text for para in doc.paragraphs]

    content = docx2txt.process(file_path)
    return jsonify({"content": content})


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
