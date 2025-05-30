-- ici on garde la formation de sql 




CREATE TABLE volunteers (
id BIGSERIAL primary key, 
firstname TEXT NOT NULL,
lastname TEXT NOT NULL, 
email TEXT UNIQUE, 
password TEXT, 
location text not null, 
created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
)

