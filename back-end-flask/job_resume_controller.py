from flask import Flask, request, jsonify, send_from_directory, session, make_response
from connection import create_connection


def get_job_resume(job_id):
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM job_resumes WHERE job_id = %s", (job_id,))
    job_resumes = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(job_resumes)


def get_resume(resume_id):
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM job_resumes WHERE resume_id = %s", (resume_id,))
    resumes = cursor.fetchone()
    cursor.close()
    conn.close()

    if resumes:
        post_data = {
            'name': resumes[3],
            'linkedin': resumes[4],
            'skills': resumes[5],
            'language': resumes[6],
            'degree': resumes[7],
            'certification': resumes[8],
            'worked_as': resumes[9],
            'companies_worked': resumes[10],
            'resume_score': resumes[13],
        }
        return jsonify(post_data)
    else:
        return jsonify({'message': 'Job post not found'}), 404
