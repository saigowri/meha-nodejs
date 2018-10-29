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
#	
#	DROP DATABASE mehaDB;
#
#	INSERT INTO user ( name, email, sessionid ) 
#    VALUES ( 'Name1', 'abc@xyz.com', 'Sample data' );
# 
#   
#	INSERT INTO history_user (name,email,sessionid,last_visited,otp,otp_sent_at,who_score,
#			screener_score,verified,feeling)
#	SELECT name,email,sessionid,last_visited,otp,otp_sent_at,who_score,
#			screener_score,verified,feeling FROM user
#	WHERE sessionid = '15405358294681413562583' and last_visited = '2018-10-26 13:23:58';
#   
#		UPDATE history_user hu, user u
#	SET
#		hu.name = u.name,
#		hu.email = u.email,
#		hu.otp = u.otp,
#		hu.otp_sent_at = u.otp_sent_at,
#		hu.who_score = u.who_score,
#		hu.screener_score = u.screener_score,
#		hu.verified = u.verified,
#		hu.feeling = u.feeling
#	WHERE
#		hu.sessionid = '15405358294681413562583' and hu.last_visited = '2018-10-26 13:23:58'
#       and  hu.sessionid = u.sessionid and hu.last_visited = u.last_visited;
#    
#	alter table user
#	add feeling enum('Very Happy', 'Happy', 'Not So Bad', 'Neutral', 'Not So Good', 'Sad','Very Sad');
#
#	alter table history_user
#	add CONSTRAINT UNIQUE_SESSION_HISTORY UNIQUE(sessionid, last_visited);
#
#	Alter table history_user 
#	add otp int;
#############################################################################################################################



#############################################################################################################################
#	Select Statements
#############################################################################################################################
USE mehaDB;
select * from user;
select * from history_user;
select * from user,history_user where user.sessionid=history_user.sessionid;
SELECT * FROM user
UNION ALL
SELECT * FROM history_user;

select column_name from information_schema.columns
where table_schema = 'mehadb' and table_name = 'user';