import psycopg2
try:
    conn = psycopg2.connect(
        host="localhost",
        user="react_fastapi",
        password="react_fastapi",
        database="image_stored",
        # table: "images"
    )
    print(bool(conn))
except: 
    pass

finally:
    conn.close()