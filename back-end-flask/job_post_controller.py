from flask import Flask, request, jsonify, send_from_directory, session, make_response
from connection import create_connection

def get_all_job_posts():
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM job_posts")
    job_posts = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(job_posts)

def get_job_post(job_id):
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM job_posts WHERE job_id = %s", (job_id,))
    job_post = cursor.fetchone()
    cursor.close()
    conn.close()

    if job_post:
        post_data = {
            'job_id': job_post[0],
            'job_title': job_post[1],
            'salary': job_post[2],
            'open_date': job_post[3],
            'end_date': job_post[4],
        }
        return jsonify(post_data)
    else:
        return jsonify({'message': 'Job post not found'}), 404