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
        if response.status_code == 200:
            st.success("Registration successful")
        else:
            st.error("Registration failed")


def main():
    st.title("User Registration and Login App")
    register()
    #login()
    #logout()

if __name__ == '__main__':
    main()