GRANT ALL PRIVILEGES ON *.* TO 'meha'@'localhost' IDENTIFIED BY 'Password1';
CREATE DATABASE mehaDB;
USE mehaDB;
CREATE TABLE user ( 
	id smallint unsigned not null auto_increment, 
    name varchar(100), 
    email varchar(100),
    sessionid varchar(30) unique not null,
    last_visited datetime,
    otp int,
    otp_expires_at datetime,
    who_score int,
    screener_score int,
    constraint pk_user primary key (id) );
INSERT INTO user ( name, email, sessionid ) VALUES ( 'Name1', 'abc@xyz.com', 'Sample data' );
select * from user;