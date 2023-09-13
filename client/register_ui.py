import streamlit as st
import requests

# API base URL
API_URL = 'http://localhost:5000'

# User registration
def register():
    st.header("User Registration")
    first_name = st.text_input("First Name")
    username = st.text_input("Username")
    password = st.text_input("Password", type="password")
    if st.button("Register"):
        data = {"first_name": first_name, "username": username, "password": password}
        response = requests.post(f"{API_URL}/register", json=data)
        response_json = response.json()
        message = response_json["message"]
        if message == "User registered successfully":
            st.success(message)
        #else:
            #st.error(message)


