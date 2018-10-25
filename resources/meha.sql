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
    otp_sent_at datetime,
    who_score int,
    screener_score int,
    verified int,
    feeling enum('Very Happy', 'Happy', 'Not So Bad', 'Neutral', 'Not So Good', 'Sad','Very Sad'),
    constraint pk_user primary key (id) );
INSERT INTO user ( name, email, sessionid ) VALUES ( 'Name1', 'abc@xyz.com', 'Sample data' );
select * from user;
Alter table user 
modify otp_sent_at datetime;