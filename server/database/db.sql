-- Crete table of roles
CREATE TABLE roles (
  id_role INTEGER UNIQUE PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) 
);

-- Create table of users
CREATE TABLE users (
  id_user INTEGER UNIQUE PRIMARY KEY AUTO_INCREMENT,
  cc VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  role INTEGER(50),
  FOREIGN KEY(role) REFERENCES roles(id_role),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create table of claims
CREATE TABLE claims (
  id_claim INTEGER UNIQUE PRIMARY KEY AUTO_INCREMENT,
  id_user INTEGER,
  title VARCHAR(200) NOT NULL,
  description VARCHAR(300),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(id_user) REFERENCES users(id_user)
);

drop table claims;
drop table users;
drop table roles;