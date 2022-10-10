import psycopg2
conn = psycopg2.connect(
    host="localhost",
    user="react_fastapi",
    password="react_fastapi",
    # user="postgres",
    # password="31072001",
    database="db_test",
)
print(bool(conn))
conn.close()