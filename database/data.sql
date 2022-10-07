CREATE TABLE bread(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    string VARCHAR(50),
    integer INTEGER,
    float REAL,
    date DATE,
    boolean BOOLEAN
);

INSERT INTO bread (string, integer, float, date, boolean) VALUES ('Testing Data Euy', 12, 1.45, '2017-12-12', true);