import sqlite3
from contextlib import closing

DB_NAME = 'olympic_medals.db'

def create_connection():
    return sqlite3.connect(DB_NAME)

def initialize_database():
    with create_connection() as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS medals (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    country TEXT NOT NULL,
                    gold INTEGER DEFAULT 0,
                    silver INTEGER DEFAULT 0,
                    bronze INTEGER DEFAULT 0,
                    total INTEGER DEFAULT 0,
                    flag_url TEXT,
                    athlete_name TEXT,
                    athlete_id INTEGER,
                    sport TEXT,
                    event TEXT
                );
            """)
            conn.commit()

def update_medals(medals):
    with create_connection() as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("DELETE FROM medals")  # Clear old data
            for medal in medals:
                cursor.execute("""
                    INSERT INTO medals (country, gold, silver, bronze, total, flag_url, athlete_name, athlete_id, sport, event)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    medal['country'],
                    medal['gold'],
                    medal['silver'],
                    medal['bronze'],
                    medal['total'],
                    medal['flag_url'],
                    medal['athlete_name'],
                    medal['athlete_id'],
                    medal['sport'],
                    medal['event']
                ))
            conn.commit()

def fetch_all_medals():
    with create_connection() as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("SELECT * FROM medals ORDER BY total DESC")
            return cursor.fetchall()

def fetch_athlete_details(athlete_id):
    with create_connection() as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("SELECT * FROM medals WHERE athlete_id = ?", (athlete_id,))
            return cursor.fetchone()
