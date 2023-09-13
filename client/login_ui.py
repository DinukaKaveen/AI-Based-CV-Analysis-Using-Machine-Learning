import streamlit as st
import requests

# API base URL
API_URL = 'http://localhost:5000'

# User login
def login():
    st.header("User Login")
    username = st.text_input("Username")
    password = st.text_input("Password", type="password")
    if st.button("Login"):
        data = {"username": username, "password": password}
        response = requests.post(f"{API_URL}/login", json=data)
        response_json = response.json()
        message = response_json["message"]
        if message == "Login successful":
            st.success(message)
        else:
            st.error(message)

