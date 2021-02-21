import sqlite3

# SQLite DB Name
DB_Name = "IoT.db"

# SQLite DB Table Schema
TableSchema = """
drop table if exists Air_Quality_Data ;
create table Air_Quality_Data (
  id integer primary key autoincrement,
  Date_n_Time text,
  air text
);
"""

# Connect or Create DB File
conn = sqlite3.connect(DB_Name)
curs = conn.cursor()

# Create Tables
sqlite3.complete_statement(TableSchema)
curs.executescript(TableSchema)

# Close DB
curs.close()
conn.close()
