-- MySQL dump 10.13  Distrib 5.6.41, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: mehadb
-- ------------------------------------------------------
-- Server version	5.6.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `history_user`
--

DROP TABLE IF EXISTS `history_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `browserid` varchar(30) DEFAULT NULL,
  `chat_start` datetime DEFAULT NULL,
  `otp` int(11) DEFAULT NULL,
  `otp_sent_at` datetime DEFAULT NULL,
  `verified` int(11) DEFAULT NULL,
  `feeling` enum('Very Happy','Happy','Not So Bad','Neutral','Not So Good','Sad','Very Sad') DEFAULT NULL,
  `chat_end` datetime DEFAULT NULL,
  `reported` decimal(1,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_SESSION_HISTORY` (`browserid`,`chat_start`),
  CONSTRAINT `history_user_ibfk_1` FOREIGN KEY (`browserid`) REFERENCES `user` (`browserid`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_user`
--

LOCK TABLES `history_user` WRITE;
/*!40000 ALTER TABLE `history_user` DISABLE KEYS */;
INSERT INTO `history_user` VALUES (6,NULL,NULL,'15422159571897988677032','2018-11-15 03:40:28',NULL,NULL,NULL,NULL,'2018-11-15 03:41:48',NULL),(7,NULL,NULL,'15422159571897988677032','2018-11-15 03:41:50',NULL,NULL,NULL,'Happy','2018-11-15 03:42:05',NULL),(8,NULL,NULL,'15422159571897988677032','2018-11-15 03:42:07',NULL,NULL,NULL,'Happy','2018-11-15 03:42:07',NULL),(9,NULL,NULL,'15422159571897988677032','2018-11-15 03:44:53',NULL,NULL,NULL,'Neutral','2018-11-15 03:45:07',NULL),(10,NULL,NULL,'15422159571897988677032','2018-11-15 03:45:09',NULL,NULL,NULL,'Sad','2018-11-15 03:45:09',NULL),(11,NULL,NULL,'15422159571897988677032','2018-11-15 11:44:54',NULL,NULL,NULL,'Neutral','2018-11-15 11:45:10',NULL),(12,NULL,NULL,'15422159571897988677032','2018-11-15 11:57:45',NULL,NULL,NULL,'Neutral','2018-11-15 11:59:29',NULL),(13,NULL,NULL,'15422159571897988677032','2018-11-15 12:00:46',NULL,NULL,NULL,'Neutral','2018-11-15 12:08:04',NULL),(14,NULL,NULL,'15422159571897988677032','2018-11-15 12:10:16',NULL,NULL,NULL,'Neutral','2018-11-15 12:10:28',NULL),(15,NULL,NULL,'15422159571897988677032','2018-11-15 12:13:27',NULL,NULL,NULL,'Neutral','2018-11-15 12:14:09',NULL),(16,NULL,NULL,'15422159571897988677032','2018-11-15 12:18:40',NULL,NULL,NULL,'Neutral','2018-11-15 12:18:40',NULL),(17,NULL,NULL,'15422159571897988677032','2018-11-21 15:03:59',NULL,NULL,NULL,'Neutral','2018-11-21 15:12:44',NULL),(18,NULL,NULL,'15422159571897988677032','2018-11-21 17:07:18',NULL,NULL,NULL,'Neutral','2018-11-21 17:07:50',NULL),(19,NULL,NULL,'15422159571897988677032','2018-11-21 17:07:55',NULL,NULL,NULL,'Happy','2018-11-21 17:10:58',NULL),(20,NULL,NULL,'15422159571897988677032','2018-11-21 17:13:39',NULL,NULL,NULL,'Not So Good','2018-11-21 17:13:41',NULL),(21,NULL,NULL,'15422159571897988677032','2018-11-21 17:14:12',NULL,NULL,NULL,'Happy','2018-11-21 17:17:25',NULL),(22,NULL,NULL,'15422159571897988677032','2018-11-21 17:23:52',NULL,NULL,NULL,'Happy','2018-11-21 17:24:07',NULL),(23,NULL,NULL,'15422159571897988677032','2018-11-21 17:24:12',NULL,NULL,NULL,'Happy','2018-11-21 17:24:46',NULL),(24,NULL,NULL,'15422159571897988677032','2018-11-21 17:24:51',NULL,NULL,NULL,'Happy','2018-11-21 17:25:06',NULL),(25,NULL,NULL,'15422159571897988677032','2018-11-21 17:25:21',NULL,NULL,NULL,'Happy','2018-11-21 17:25:46',NULL),(26,NULL,NULL,'15422159571897988677032','2018-11-21 17:26:07',NULL,NULL,NULL,'Happy','2018-11-21 17:26:11',NULL),(27,NULL,NULL,'15422159571897988677032','2018-11-21 17:26:16',NULL,NULL,NULL,'Happy','2018-11-21 17:26:38',NULL),(28,NULL,NULL,'15422159571897988677032','2018-11-21 17:26:47',NULL,NULL,NULL,'Happy','2018-11-21 17:28:10',NULL),(29,NULL,NULL,'15422159571897988677032','2018-11-21 17:29:18',NULL,NULL,NULL,'Not So Good','2018-11-21 17:29:23',NULL),(30,NULL,NULL,'15422159571897988677032','2018-11-21 17:45:49',NULL,NULL,NULL,'Neutral','2018-11-21 17:25:54',NULL),(31,NULL,NULL,'15422159571897988677032','2018-11-22 10:01:13',NULL,NULL,NULL,'Neutral','2018-11-22 10:15:57',NULL),(32,NULL,'kavyakpuranik8@gmail.com','15422159571897988677032','2018-11-22 10:16:29',NULL,NULL,NULL,'Neutral','2018-11-22 10:44:35',NULL);
/*!40000 ALTER TABLE `history_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospitals`
--

DROP TABLE IF EXISTS `hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hospitals` (
  `id` int(11) NOT NULL,
  `hospital` varchar(500) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `longi` float DEFAULT NULL,
  `facilities` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospitals`
--

LOCK TABLES `hospitals` WRITE;
/*!40000 ALTER TABLE `hospitals` DISABLE KEYS */;
INSERT INTO `hospitals` VALUES (1,'Govt.  Hospital for Mental Health Care, S.R. Nagar, Hyderabad, Andra Pradesh','Andra Pradesh','500038',17.436,78.4454,NULL),(2,'Govt. Hospital for Mental Care, Chinnawaltair, Visakapatnam, Andra Pradesh','Andra Pradesh','500023',17.445,78.3856,NULL),(3,'Lokopriya Gopinath Bordoloi Institute of Mental Health,P.O. Tezpur, Sonitpur, Assam','Assam	','784001',26.623,92.7998,NULL),(4,'Central Institute of Psychiatry, Kanke P.O. Ranchi, Jharkand','Jharkhand','834006',23.4084,85.3174,NULL),(5,'Ranchi Institute of Neuropsychiaty and Allied Science(RINPAS), Kanke, Ranchi ,Bihar, Jharkand','Jharkhand	','834006',23.4084,85.3174,NULL),(6,'Institute of Human Behavior & Allied Sciences, G.T. Road, P.O. Box 9520, Jhilmil, Delhi','Delhi	','110095',28.6585,77.281,NULL),(7,'Mental Health Centre, Oolampara, Thiruvanathapuram, Kerala','Kerala','695005',8.53399,76.9614,NULL),(8,'Institute of Psychiatry & Human Behavior,Altinho, Panaji, Goa','Goa','403001',15.51,73.8162,NULL),(9,'Hospital for Mental Health, Bhuj, Gujarat','Gujarat','370001',23.245,69.665,NULL),(10,'Hospital for Mental Health, Vikasgruh Road, Jamnagar, Gujarat','Gujarat','361008',22.479,70.0593,NULL),(11,'Hospital for Mental Health, Behind Kapadia High School, Outside Delhi Gate, Shahibaug Road, Ahamedabad, Gujarat','Gujarat','380004',23.0477,72.5888,NULL),(12,'Hospital for Mental Health, Karelibag, Baroda, Gujarat','Gujarat','390018',22.4123,79.1329,NULL),(13,'Govt. Hospital for Psychiatric Diseases, Rainawari, Khatidarwaze, Srinagar , Jammu & Kashmir','Jammu & Kashmir','190003',32.702,74.8719,NULL),(14,'Psychiatric Diseases hospital GMC, Jammu, Ambphalla B.C. Road,Jammu, Jammu & Kashmir','Jammu & Kashmir','180001',32.7186,74.8581,NULL),(15,'Karnataka Institute of Mental Health, Belgaum Road, Dharwad, Karnataka','Karnataka','580008',15.4617,75.0062,NULL),(16,'National Institute of Mental Health and Neuro Sciences, NIMHANS, P.O. Box No 2900, Bangalore, Karanataka','Karnataka','560029',12.9262,77.5974,NULL),(17,'Mental Health Centre, Oolampara, Thiruvanathapuram, Kerala','Kerala','695005',8.53656,76.9665,NULL),(18,'Govt. Mental Health Centre, Kuthiravattom P.O. Kozhikode, Kerala','Kerala','673016',11.2572,75.8182,NULL),(19,'Govt. Mental Health Centre, Poothole P.O., Thrissur, Kerala','Kerala','680004',10.5225,76.2054,NULL),(20,'Gwalior Manasik Arogyasala, Central jail Road, Gwalior, Madhya Pradesh','Madhya Pradesh','474012',24.5221,81.3106,NULL),(21,'Mental Hospital, Banganga Sawer Road, Indore, Madhya Pradesh','Madhya Pradesh','452002',22.7665,75.9007,NULL),(22,'Regional Mental Hospital, Nagpur, Maharashtra','Maharashtra','440029',21.1773,79.0819,NULL),(23,'Regional Mental Hospital, Yeravda, Pune, Maharashtra','Maharashtra','440029',18.5519,73.8918,NULL),(24,'Regional Mental Hospital, Ratnagiri, Maharashtra','Maharashtra','440029',16.9934,73.2954,NULL),(25,'Regional Mental Hospital, Wagle Estate, Thane (W), Maharashtra','Maharashtra','400604',19.2178,72.9854,NULL),(26,'Mental Hospital, Kohima, Nagaland','Nagaland','797001',25.6669,94.1055,NULL),(27,'Mental Health Institute, S.C.B. Medical College, Cuttack, Orissa','Orissa','753007',22.4123,79.1329,NULL),(28,'Dr. Vidyasagar Punjab Mental Hospital, \nCircular Road, Amritsar, Punjab','Punjab','143001',31.6324,74.869,NULL),(29,'Mental Hospital (Psychiatric Centre), \nJanta Colony, Jaipur, Rajasthan','Rajasthan','302004',26.9044,75.8323,NULL),(30,'Mental Hospital,(Psychiatric Center),Shastri Nagar, Jodhpur, Rajasthan','Rajasthan','342001',26.2656,72.9837,NULL),(31,'Institute of Mental Health, Medavakkam Tank Road, Kilpauk, Chennai, Tamil Nadu','Tamil Nadu','600010',13.0856,80.2348,NULL),(32,'Institute of Mental Health & Hospital, Billochpura, Mathura Road, Agra, Uttar Pradesh','Uttar Pradesh','282002',27.2199,77.9348,NULL),(33,'Mental Hospital Bareilly\nCivil Lines, Bareilly, Uttar Pradesh','Uttar Pradesh','243005',28.365,79.4325,NULL),(34,'Mental Hospital, S2/1 Pandeypur, Varanasi, Uttar Pradesh','Uttar Pradesh','221002',25.345,82.9904,NULL),(35,'Lumbini Park Mental Hospital, 115, G.S, Bose Road, Calcutta, West Bengal','West Bengal','700010',22.5656,88.3702,NULL),(36,'Calcutta Pavlov Hospital, 18, Gobra Road, Calcutta, West Bengal','West Bengal','700046',22.5313,88.396,NULL),(37,'Institute of Psychiatry, 7, D.L. Khan Road, Calcutta, West Bengal','West Bengal','700025',22.5257,88.3501,NULL),(38,'The Mental Hospital (Calcutta & Mankundu), 133, Vivekananda Road, Calcutta, West Bengal','West Bengal','700006',22.587,88.3704,NULL),(39,'Institute for Mental Care, Purulia P.O., Purulia, West Bengal','West Bengal','723103',23.2483,86.4997,NULL),(40,'Mental Hospital Berhampore, Berhampore Mental Hospital, Berhampore P.O, Murshidabad, West Bengal','West Bengal','742101',24.1048,88.251,NULL),(41,'Himachal Hospital of Mental Health & Rehabilitation, Boileauganj, Shimla','Shimla','171004',31.1042,77.171,NULL),(42,'Institute of Mental Health, Koelwar, Bhojpur, Bihar','Bihar','802301',27.25,87.0833,NULL),(43,'Meghalaya Institute of Mental Health & Neurosciences, Shillong, Meghalaya','Meghalaya','793001',25.576,91.8828,NULL),(44,'Government Mental Hospital, Agartala, Tripura','Tripura','799001',23.8328,91.2791,NULL);
/*!40000 ALTER TABLE `hospitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `browserid` varchar(30) DEFAULT NULL,
  `chat_start` datetime DEFAULT NULL,
  `otp` int(11) DEFAULT NULL,
  `otp_sent_at` datetime DEFAULT NULL,
  `verified` int(11) DEFAULT NULL,
  `feeling` enum('Very Happy','Happy','Not So Bad','Neutral','Not So Good','Sad','Very Sad') DEFAULT NULL,
  `chat_end` datetime DEFAULT NULL,
  `reported` decimal(1,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sessionid` (`browserid`)
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (203,NULL,'kavyakpuranik8@gmail.com','15422159571897988677032','2018-11-22 10:16:29',NULL,NULL,NULL,'Neutral','2018-11-22 10:44:35',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_scores`
--

DROP TABLE IF EXISTS `user_scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_scores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `chat_start` datetime DEFAULT NULL,
  `browserid` varchar(30) NOT NULL,
  `who_score` int(11) DEFAULT NULL,
  `screener_score` int(11) DEFAULT NULL,
  `senti_score` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `browserid` (`browserid`,`chat_start`),
  CONSTRAINT `user_scores_ibfk_1` FOREIGN KEY (`browserid`) REFERENCES `user` (`browserid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_scores`
--

LOCK TABLES `user_scores` WRITE;
/*!40000 ALTER TABLE `user_scores` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wellness_app_details`
--

DROP TABLE IF EXISTS `wellness_app_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wellness_app_details` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `feedback` varchar(3000) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wellness_app_details`
--

LOCK TABLES `wellness_app_details` WRITE;
/*!40000 ALTER TABLE `wellness_app_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `wellness_app_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-22 12:42:59
