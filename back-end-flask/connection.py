import mysql.connector

# Function to create a database connection
def create_connection():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="cv_analysis"
    )
    return conn