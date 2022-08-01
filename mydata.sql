CREATE Table greet (
  id INTEGER PRIMARY KEY,
  name TEXT,
  greeting TEXT,
  count INTEGER
);
Insert into users (id,name, greeting, count) values (1, 'John', 'Hello', 1);
Insert into users (id,name, greeting, count) values (2, 'Jane', 'Hi', 2);
Insert into users (id,name, greeting, count) values (3, 'Bob', 'Hey', 3);


SELECT * FROM users;
WHERE id = 1;
WHERE id = 2;
WHERE id = 3;

-- Language: sql
-- Path: mydata.sql
