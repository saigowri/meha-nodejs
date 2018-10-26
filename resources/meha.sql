GRANT ALL PRIVILEGES ON *.* TO 'meha'@'localhost' IDENTIFIED BY 'Password1';
CREATE DATABASE mehaDB;
USE mehaDB;

CREATE TABLE user ( 
	id int unsigned not null auto_increment, 
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
    CONSTRAINT pk_user PRIMARY KEY (id) );
    
CREATE TABLE history_user ( 
	id int unsigned not null auto_increment, 
    name varchar(100), 
    email varchar(100),
    sessionid varchar(30) not null,
    last_visited datetime,
    otp int,
    otp_sent_at datetime,
    who_score int,
    screener_score int,
    verified int,
    feeling enum('Very Happy', 'Happy', 'Not So Bad', 'Neutral', 'Not So Good', 'Sad','Very Sad'),
    CONSTRAINT pk_user PRIMARY KEY (id),
    FOREIGN KEY (sessionid) REFERENCES user(sessionid),
    CONSTRAINT UNIQUE_SESSION_HISTORY UNIQUE(sessionid, last_visited));


#############################################################################################################################
#	Only for modification purpose
#
#	INSERT INTO user ( name, email, sessionid ) 
#    VALUES ( 'Name1', 'abc@xyz.com', 'Sample data' );
# 
	SELECT * FROM user
	UNION ALL
	SELECT * FROM history_user;
    
	INSERT INTO history_user
	SELECT * FROM user
	WHERE sessionid = '15404936647439644413625' and last_visited = '2018-10-26 09:29:09';
    
    UPDATE
    Sales_Import SI,
    RetrieveAccountNumber RAN
SET
    SI.AccountNumber = RAN.AccountNumber
WHERE
    SI.LeadID = RAN.LeadID;
    
    
#	alter table user
#	add feeling enum('Very Happy', 'Happy', 'Not So Bad', 'Neutral', 'Not So Good', 'Sad','Very Sad');
#
#	alter table history_user
#	add CONSTRAINT UNIQUE_SESSION_HISTORY UNIQUE(sessionid, last_visited);
#
#	Alter table user 
#	modify id int;
#############################################################################################################################



#############################################################################################################################
#	Select Statements
#############################################################################################################################
USE mehaDB;
select * from user;
select * from history_user;
select * from user,history_user where user.sessionid=history_user.sessionid;