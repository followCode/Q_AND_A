import psycopg2


def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            port=25432,
                            database='postgres',
                            user='postgres',
                            password='postgres')

    return conn


def get_all_questions(conn):
    cur = conn.cursor()

    cur.execute("SELECT id, text FROM api_question;")
    questions = cur.fetchall()
    cur.close()

    return questions


