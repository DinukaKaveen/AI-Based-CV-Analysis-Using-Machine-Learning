import streamlit as st
import requests
import register_ui
import login_ui

# Create a sidebar navigation menu
def navigate():
    st.sidebar.title("Navigation")
    selected_page = st.sidebar.radio("Go to:", ["Register", "Login"])

    # Display the selected page
    if selected_page == "Register":
        register_ui.register()
    elif selected_page == "Login":
        login_ui.login()

def get_session_user():
    response = requests.get('http://localhost:5000/get')
    json_response = response.json()
    session_value = json_response['message']
    st.write(session_value)


def main():
    st.title("User Registration and Login App")
    navigate()
    get_session_user()

if __name__ == '__main__':
    main()