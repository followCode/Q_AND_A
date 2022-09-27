# Q & A Site With ML

An attempt to clone Quora and the ML capabilities that it provides.
A question-answer platform where users can ask questions and get answers from other users.

## Developer Setup

### Requirements
- Python 3.7.9
- Docker & docker-compose
- vocab file. Download 
[here](https://drive.google.com/file/d/122qj6k7x_F56_znlhgeveZsXFnlnb2yv/view?usp=sharing). Then place it within 
`Backend/model_api/model/`

### Backend
- Move to `Backend` directory
- Add virtual environment using
`python -m venv env`
- Activate virtual environment [how-to-activate](https://docs.python.org/3/tutorial/venv.html)
- Install project dependencies
`pip install -r requirements.txt`
- Run migrations
`python manage.py migrate`
- Start the app
`python manage.py runserver`

### Frontend
To Be Added

## Running together (not developing)
- Navigate to the root of the project
- `docker-compose -up -d --build` Note: `--build` is required in-case any changes are made.
- To take it down
`docker-compose down`


