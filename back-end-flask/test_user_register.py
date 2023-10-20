import pytest
from app_controller import app # Import your Flask app instance
from connection import create_connection  # Import the create_connection function

@pytest.fixture
def client():
    app.config['TESTING'] = True
    client = app.test_client()
    yield client

def test_user_registration_successful(client):
    # Define a test user's data
    user_data = {
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'john.doe@example.com',
        'phone_no': '1234567890',
        'username': 'testuser',
        'password': 'testpassword'
    }

    # Send a POST request to register the user
    response = client.post('/user_register', json=user_data)

    assert response.status_code == 200
    assert b'Registered Successfully' in response.data

def test_user_registration_duplicate_username(client):
    # Define a test user's data
    user_data = {
        'first_name': 'Jane',
        'last_name': 'Smith',
        'email': 'jane.smith@example.com',
        'phone_no': '9876543210',
        'username': 'testuser',
        'password': 'testpassword'
    }

    # Send a POST request to register the user (with the same username as in the previous test)
    response = client.post('/user_register', json=user_data)

    assert response.status_code == 200
    assert b'Please enter different username' in response.data

if __name__ == '__main__':
    pytest.main()
