DROP TABLE IF EXISTS support_tickets, invoices, access_logs, reservations, user_memberships, desks, memberships, spaces, staff, users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    card_access_key VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT null,
    email VARCHAR(150)
);

CREATE TABLE spaces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    building VARCHAR(50) NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE memberships (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    duration_days INT DEFAULT 30
);

CREATE TABLE desks (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    space_id INT REFERENCES spaces(id) ON DELETE CASCADE
);

CREATE TABLE user_memberships (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    membership_id INT REFERENCES memberships(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    desk_id INT REFERENCES desks(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'CONFIRMED'
);

CREATE TABLE access_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    access_type VARCHAR(10) CHECK (access_type IN ('CARD', 'CODE')),
    access_code VARCHAR(10),
    granted BOOLEAN NOT NULL,
    entry_time TIMESTAMP DEFAULT NOW()
);

CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING'
);

CREATE TABLE support_tickets (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'OPEN'
);

INSERT INTO users (full_name, email, card_access_key) 
VALUES ('Angel Dev', 'angel@ejemplo.com', 'CARD-1001'),
       ('Laura Perez', 'laura@ejemplo.com', 'CARD-1002');

INSERT INTO memberships (name, price, duration_days) 
VALUES ('Plan Individual', 50.00, 30),
       ('Plan Equipo', 120.00, 30);

INSERT INTO spaces (name, building, capacity) 
VALUES ('Zona Silenciosa', 'Edificio A', 10);

INSERT INTO desks (code, space_id) 
VALUES ('DESK-A1', 1);

INSERT INTO user_memberships (user_id, membership_id, start_date, end_date) 
VALUES (1, 1, '2026-07-01', '2026-07-31');

INSERT INTO access_logs (user_id, access_type, access_code, granted) 
VALUES (1, 'CARD', 'CARD-1001', TRUE);