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