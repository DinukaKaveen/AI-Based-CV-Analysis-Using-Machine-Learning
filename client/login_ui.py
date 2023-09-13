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
        if response.status_code == 200:
            st.success("Login successful")
        else:
            st.error("Login failed")

