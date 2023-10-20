import pytest
from app_controller import app  # Import your Flask app
from connection import create_connection  # Import your database functions

@pytest.fixture
def client():
    app.config['TESTING'] = True
    client = app.test_client()
    yield client

def test_successful_login(client):
    # Replace with a valid username and password
    data = {'username': 'dinuka', 'password': '123456'}
    response = client.post('/user_login', json=data)

    assert response.status_code == 200
    assert 'Login successful' in response.get_json()['message']
    assert 'user_id' in response.get_json()
    assert 'username' in response.get_json()

def test_invalid_password(client):
    # Replace with a valid username and an invalid password
    data = {'username': 'dinuka', 'password': 'invalid_password'}
    response = client.post('/user_login', json=data)

    assert response.status_code == 200
    assert 'Invalid password' in response.get_json()['message']

def test_username_not_found(client):
    # Replace with a non-existent username
    data = {'username': 'non_existent_username', 'password': '123456'}
    response = client.post('/user_login', json=data)

    assert response.status_code == 200
    assert 'Username not found' in response.get_json()['message']
    

if __name__ == '__main__':
    pytest.main()


