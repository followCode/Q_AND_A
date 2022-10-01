"""

- Collect user credentials
- Login with provided credentials
- Use access token from previous step in all further requests via authorization header
- Make API call to add question

"""

import sys
import csv
import requests
from datetime import datetime

HOST = 'http://localhost:8000/'


def load_seed_questions():
    data = []
    with open('similar_questions.csv') as f:
        csv_reader = csv.reader(f)
        for row in csv_reader:
            data.append(row[0])
            data.append(row[1])

    return data[2:]


def login_with_credentials(username, password):
    credentials = {
        "username": username,
        "password": password,
    }

    login_response = requests.post(HOST + 'api/token/', data=credentials)

    if login_response.status_code != 200:
        raise Exception("Unable to login with credentials", login_response.json())

    return login_response.json()['access']


def add_question(question, token):
    now = datetime.now()

    question_data = {
        "text": question,
        "pub_date": now.strftime("%Y-%m-%dT%H:%M")
    }

    headers = {
        "Authorization": "Bearer "+token
    }

    result = requests.post(HOST + 'api/questions/', data=question_data, headers=headers)

    if result.status_code != 201:
        raise Exception("Unable to add question to system")

    return result.json()


def orchestrate_seed_data_insertion(username, password):
    access_token = login_with_credentials(username, password)

    question_data = load_seed_questions()

    for question in question_data:
        print(add_question(question, access_token))


def main():
    username = sys.argv[1]
    password = sys.argv[2]

    orchestrate_seed_data_insertion(username, password)


if __name__ == "__main__":
    main()
