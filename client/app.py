import streamlit as st
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


def main():
    st.title("User Registration and Login App")
    navigate()

if __name__ == '__main__':
    main()