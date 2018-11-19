-- MySQL dump 10.13  Distrib 5.6.41, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: mehadb
-- ------------------------------------------------------
-- Server version	5.6.41

GRANT ALL PRIVILEGES ON *.* TO 'meha'@'localhost' IDENTIFIED BY 'Password1';
CREATE DATABASE mehaDB;
USE mehaDB;

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
  `sessionid` varchar(30) NOT NULL,
  `last_visited` datetime DEFAULT NULL,
  `otp` int(11) DEFAULT NULL,
  `otp_sent_at` datetime DEFAULT NULL,
  `who_score` int(11) DEFAULT NULL,
  `screener_score` int(11) DEFAULT NULL,
  `verified` int(11) DEFAULT NULL,
  `feeling` enum('Very Happy','Happy','Not So Bad','Neutral','Not So Good','Sad','Very Sad') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_SESSION_HISTORY` (`sessionid`,`last_visited`),
  CONSTRAINT `history_user_ibfk_1` FOREIGN KEY (`sessionid`) REFERENCES `user` (`sessionid`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_user`
--

LOCK TABLES `history_user` WRITE;
/*!40000 ALTER TABLE `history_user` DISABLE KEYS */;
INSERT INTO `history_user` VALUES (1,NULL,NULL,'15405476920337912061600',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,NULL,'kavyakpuranik8@gmail.com','15405476920337912061600','2018-10-26 17:41:59',196216,'2018-10-26 17:42:21',NULL,NULL,1,'Happy'),(3,NULL,NULL,'15406418036963152916022',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,NULL,NULL,'15407046457127286493424',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,NULL,NULL,'15407046457127286493424','2018-10-28 21:21:14',NULL,NULL,NULL,NULL,NULL,'Neutral'),(6,NULL,NULL,'15407046457127286493424','2018-10-28 21:21:45',NULL,NULL,NULL,NULL,NULL,'Neutral'),(7,NULL,NULL,'15407046457127286493424','2018-10-28 21:44:17',NULL,NULL,NULL,NULL,NULL,'Neutral'),(8,NULL,NULL,'15407046457127286493424','2018-10-29 08:53:50',NULL,NULL,NULL,NULL,NULL,'Very Happy'),(9,NULL,NULL,'15407046457127286493424','2018-10-29 08:54:13',NULL,NULL,NULL,NULL,NULL,'Neutral'),(10,NULL,NULL,'15407046457127286493424','2018-10-29 08:55:10',NULL,NULL,NULL,NULL,NULL,'Neutral'),(11,NULL,NULL,'15407046457127286493424','2018-10-29 08:55:25',NULL,NULL,NULL,NULL,NULL,'Neutral'),(12,NULL,NULL,'15407046457127286493424','2018-10-29 09:00:25',NULL,NULL,NULL,NULL,NULL,'Neutral'),(13,NULL,NULL,'15407046457127286493424','2018-10-29 09:04:19',NULL,NULL,NULL,NULL,NULL,'Not So Good'),(14,NULL,NULL,'15407046457127286493424','2018-10-29 09:05:43',NULL,NULL,NULL,NULL,NULL,'Happy'),(15,NULL,NULL,'15407046457127286493424','2018-10-29 09:06:05',NULL,NULL,NULL,NULL,NULL,'Neutral'),(16,NULL,NULL,'15407046457127286493424','2018-10-29 09:06:35',NULL,NULL,NULL,NULL,NULL,'Not So Good'),(17,NULL,NULL,'15407046457127286493424','2018-10-29 09:07:19',NULL,NULL,NULL,NULL,NULL,'Not So Good'),(18,NULL,NULL,'15407046457127286493424','2018-10-29 09:09:34',NULL,NULL,NULL,NULL,NULL,'Happy'),(19,NULL,NULL,'15407046457127286493424','2018-10-29 09:15:22',NULL,NULL,NULL,NULL,NULL,'Happy'),(20,NULL,NULL,'15407046457127286493424','2018-10-29 09:16:17',NULL,NULL,NULL,NULL,NULL,'Not So Good'),(21,NULL,NULL,'15407046457127286493424','2018-10-29 09:16:42',NULL,NULL,NULL,NULL,NULL,'Neutral'),(22,NULL,NULL,'15407046457127286493424','2018-10-29 09:18:26',NULL,NULL,NULL,NULL,NULL,'Happy'),(23,NULL,NULL,'15407046457127286493424','2018-10-29 09:19:05',NULL,NULL,NULL,NULL,NULL,'Very Sad'),(24,NULL,NULL,'15407046457127286493424','2018-10-29 09:20:09',NULL,NULL,NULL,NULL,NULL,'Happy'),(25,NULL,'kavyakpuranik8@gmail.com','15405476920337912061600','2018-10-26 17:43:14',196216,'2018-10-26 17:42:21',NULL,NULL,1,'Happy'),(26,NULL,'kavyakpuranik8@gmail.com','15405476920337912061600','2018-10-29 09:20:59',196216,'2018-10-26 17:42:21',NULL,NULL,1,'Not So Good'),(27,NULL,'kavyakpuranik8@gmail.com','15405476920337912061600','2018-10-29 09:24:12',196216,'2018-10-26 17:42:21',NULL,NULL,1,'Not So Good'),(28,NULL,'kavyakpuranik8@gmail.com','15405476920337912061600','2018-10-29 09:25:20',196216,'2018-10-26 17:42:21',NULL,NULL,1,'Not So Good'),(29,NULL,NULL,'1540785724465381423183',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(30,NULL,NULL,'1540785724465381423183','2018-10-29 09:34:53',NULL,NULL,NULL,NULL,NULL,'Happy'),(31,NULL,NULL,'1540785724465381423183','2018-10-29 09:38:09',NULL,NULL,NULL,NULL,NULL,'Happy'),(32,NULL,NULL,'1540785724465381423183','2018-10-29 09:43:55',NULL,NULL,NULL,NULL,NULL,'Happy'),(33,NULL,NULL,'1540785724465381423183','2018-10-29 10:02:05',NULL,NULL,NULL,NULL,NULL,'Not So Good'),(34,NULL,NULL,'1540785724465381423183','2018-10-29 10:08:18',NULL,NULL,NULL,NULL,NULL,'Not So Good'),(35,NULL,NULL,'15407880245231351250767',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(36,NULL,NULL,'1540785724465381423183','2018-10-29 10:10:03',NULL,NULL,NULL,NULL,NULL,'Happy'),(37,NULL,NULL,'1540785724465381423183','2018-10-29 10:12:35',NULL,NULL,NULL,NULL,NULL,'Neutral'),(38,NULL,NULL,'1540785724465381423183','2018-10-29 10:12:56',NULL,NULL,NULL,NULL,NULL,'Very Sad'),(39,NULL,NULL,'1540785724465381423183','2018-10-29 10:13:26',NULL,NULL,NULL,NULL,NULL,'Happy'),(40,NULL,NULL,'1540785724465381423183','2018-10-29 10:13:37',NULL,NULL,NULL,NULL,NULL,'Very Happy'),(41,NULL,NULL,'1540785724465381423183','2018-10-29 10:14:26',NULL,NULL,NULL,NULL,NULL,'Very Happy'),(42,NULL,NULL,'1540785724465381423183','2018-10-29 10:14:40',NULL,NULL,NULL,NULL,NULL,'Very Happy'),(43,NULL,NULL,'1540785724465381423183','2018-10-29 10:18:10',NULL,NULL,NULL,NULL,NULL,'Happy'),(44,NULL,NULL,'1540785724465381423183','2018-10-29 10:20:14',NULL,NULL,NULL,NULL,NULL,'Very Happy'),(45,NULL,NULL,'1540785724465381423183','2018-10-29 10:20:55',NULL,NULL,NULL,NULL,NULL,'Happy'),(46,NULL,NULL,'1540785724465381423183','2018-10-29 10:21:52',NULL,NULL,NULL,NULL,NULL,'Not So Bad'),(47,NULL,NULL,'1540785724465381423183','2018-10-29 10:24:03',NULL,NULL,NULL,NULL,NULL,'Happy'),(48,NULL,NULL,'1540785724465381423183','2018-10-29 10:39:03',NULL,NULL,NULL,NULL,NULL,'Neutral'),(49,NULL,NULL,'1540785724465381423183','2018-10-29 11:17:48',NULL,NULL,NULL,NULL,NULL,'Neutral'),(50,NULL,'kavyakpuranik8@gmail.com','15405476920337912061600','2018-10-29 09:28:27',196216,'2018-10-26 17:42:21',NULL,NULL,1,'Not So Good'),(51,NULL,'kavyakpuranik8@gmail.com','15405476920337912061600','2018-10-29 11:18:07',196216,'2018-10-26 17:42:21',NULL,NULL,1,'Happy'),(52,NULL,'kavyakpuranik8@gmail.com','15405476920337912061600','2018-10-29 11:21:07',196216,'2018-10-26 17:42:21',NULL,NULL,1,'Happy'),(53,NULL,'kavyakpuranik8@gmail.com','15405476920337912061600','2018-10-29 11:21:26',196216,'2018-10-26 17:42:21',NULL,NULL,1,'Happy'),(54,NULL,'kavyakpuranik8@gmail.com','15405476920337912061600','2018-10-29 11:22:15',196216,'2018-10-26 17:42:21',NULL,NULL,1,'Happy'),(55,NULL,'kavyakpuranik8@gmail.com','15405476920337912061600','2018-10-29 11:32:36',196216,'2018-10-26 17:42:21',NULL,NULL,1,'Happy'),(56,NULL,'kavyakpuranik8@gmail.com','15405476920337912061600','2018-10-29 11:33:51',196216,'2018-10-26 17:42:21',NULL,NULL,1,'Happy'),(57,NULL,'kavyakpuranik8@gmail.com','15405476920337912061600','2018-10-29 11:58:35',196216,'2018-10-26 17:42:21',NULL,NULL,1,'Happy'),(58,NULL,NULL,'15407996252626124728372',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(59,NULL,NULL,'15407996252626124728372','2018-10-29 21:45:49',NULL,NULL,NULL,NULL,NULL,'Neutral');
/*!40000 ALTER TABLE `history_user` ENABLE KEYS */;
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
  `sessionid` varchar(30) NOT NULL,
  `last_visited` datetime DEFAULT NULL,
  `otp` int(11) DEFAULT NULL,
  `otp_sent_at` datetime DEFAULT NULL,
  `who_score` int(11) DEFAULT NULL,
  `screener_score` int(11) DEFAULT NULL,
  `verified` int(11) DEFAULT NULL,
  `feeling` enum('Very Happy','Happy','Not So Bad','Neutral','Not So Good','Sad','Very Sad') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sessionid` (`sessionid`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'kavyakpuranik8@gmail.com','15405476920337912061600','2018-10-29 12:18:25',196216,'2018-10-26 17:42:21',NULL,NULL,1,'Happy'),(2,NULL,'shreyas360@gmail.com','15406418036963152916022','2018-10-28 10:49:44',980362,'2018-10-28 10:51:00',NULL,NULL,1,'Happy'),(4,NULL,NULL,'15406454524674806725825',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(53,NULL,NULL,'15407046457127286493424','2018-10-29 09:20:59',NULL,NULL,NULL,NULL,NULL,'Not So Good'),(125,NULL,NULL,'1540785724465381423183','2018-10-29 11:18:07',NULL,NULL,NULL,NULL,NULL,'Happy'),(161,NULL,NULL,'15407880245231351250767','2018-10-29 10:10:27',NULL,NULL,NULL,NULL,NULL,'Not So Good'),(162,NULL,'minnuann5@gmail.com','15407996252626124728372','2018-10-30 11:49:31',790638,'2018-10-30 11:50:26',NULL,NULL,1,'Neutral');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-30 12:13:36


-- Table structure for table `Hospitals`
--

DROP TABLE IF EXISTS `Hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Hospitals` (
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
-- Dumping data for table `Hospitals`
--

LOCK TABLES `Hospitals` WRITE;
/*!40000 ALTER TABLE `Hospitals` DISABLE KEYS */;
INSERT INTO `Hospitals` VALUES (1,'Govt.  Hospital for Mental Health Care, S.R. Nagar, Hyderabad, Andra Pradesh','Andra Pradesh','500038',17.436,78.4454,NULL),(2,'Govt. Hospital for Mental Care, Chinnawaltair, Visakapatnam, Andra Pradesh','Andra Pradesh','500023',17.445,78.3856,NULL),(3,'Lokopriya Gopinath Bordoloi Institute of Mental Health,P.O. Tezpur, Sonitpur, Assam','Assam	','784001',26.623,92.7998,NULL),(4,'Central Institute of Psychiatry, Kanke P.O. Ranchi, Jharkand','Jharkhand','834006',23.4084,85.3174,NULL),(5,'Ranchi Institute of Neuropsychiaty and Allied Science(RINPAS), Kanke, Ranchi ,Bihar, Jharkand','Jharkhand	','834006',23.4084,85.3174,NULL),(6,'Institute of Human Behavior & Allied Sciences, G.T. Road, P.O. Box 9520, Jhilmil, Delhi','Delhi	','110095',28.6585,77.281,NULL),(7,'Mental Health Centre, Oolampara, Thiruvanathapuram, Kerala','Kerala','695005',8.53399,76.9614,NULL),(8,'Institute of Psychiatry & Human Behavior,Altinho, Panaji, Goa','Goa','403001',15.51,73.8162,NULL),(9,'Hospital for Mental Health, Bhuj, Gujarat','Gujarat','370001',23.245,69.665,NULL),(10,'Hospital for Mental Health, Vikasgruh Road, Jamnagar, Gujarat','Gujarat','361008',22.479,70.0593,NULL),(11,'Hospital for Mental Health, Behind Kapadia High School, Outside Delhi Gate, Shahibaug Road, Ahamedabad, Gujarat','Gujarat','380004',23.0477,72.5888,NULL),(12,'Hospital for Mental Health, Karelibag, Baroda, Gujarat','Gujarat','390018',22.4123,79.1329,NULL),(13,'Govt. Hospital for Psychiatric Diseases, Rainawari, Khatidarwaze, Srinagar , Jammu & Kashmir','Jammu & Kashmir','190003',32.702,74.8719,NULL),(14,'Psychiatric Diseases hospital GMC, Jammu, Ambphalla B.C. Road,Jammu, Jammu & Kashmir','Jammu & Kashmir','180001',32.7186,74.8581,NULL),(15,'Karnataka Institute of Mental Health, Belgaum Road, Dharwad, Karnataka','Karnataka','580008',15.4617,75.0062,NULL),(16,'National Institute of Mental Health and Neuro Sciences, NIMHANS, P.O. Box No 2900, Bangalore, Karanataka','Karnataka','560029',12.9262,77.5974,NULL),(17,'Mental Health Centre, Oolampara, Thiruvanathapuram, Kerala','Kerala','695005',8.53656,76.9665,NULL),(18,'Govt. Mental Health Centre, Kuthiravattom P.O. Kozhikode, Kerala','Kerala','673016',11.2572,75.8182,NULL),(19,'Govt. Mental Health Centre, Poothole P.O., Thrissur, Kerala','Kerala','680004',10.5225,76.2054,NULL),(20,'Gwalior Manasik Arogyasala, Central jail Road, Gwalior, Madhya Pradesh','Madhya Pradesh','474012',24.5221,81.3106,NULL),(21,'Mental Hospital, Banganga Sawer Road, Indore, Madhya Pradesh','Madhya Pradesh','452002',22.7665,75.9007,NULL),(22,'Regional Mental Hospital, Nagpur, Maharashtra','Maharashtra','440029',21.1773,79.0819,NULL),(23,'Regional Mental Hospital, Yeravda, Pune, Maharashtra','Maharashtra','440029',18.5519,73.8918,NULL),(24,'Regional Mental Hospital, Ratnagiri, Maharashtra','Maharashtra','440029',16.9934,73.2954,NULL),(25,'Regional Mental Hospital, Wagle Estate, Thane (W), Maharashtra','Maharashtra','400604',19.2178,72.9854,NULL),(26,'Mental Hospital, Kohima, Nagaland','Nagaland','797001',25.6669,94.1055,NULL),(27,'Mental Health Institute, S.C.B. Medical College, Cuttack, Orissa','Orissa','753007',22.4123,79.1329,NULL),(28,'Dr. Vidyasagar Punjab Mental Hospital, \nCircular Road, Amritsar, Punjab','Punjab','143001',31.6324,74.869,NULL),(29,'Mental Hospital (Psychiatric Centre), \nJanta Colony, Jaipur, Rajasthan','Rajasthan','302004',26.9044,75.8323,NULL),(30,'Mental Hospital,(Psychiatric Center),Shastri Nagar, Jodhpur, Rajasthan','Rajasthan','342001',26.2656,72.9837,NULL),(31,'Institute of Mental Health, Medavakkam Tank Road, Kilpauk, Chennai, Tamil Nadu','Tamil Nadu','600010',13.0856,80.2348,NULL),(32,'Institute of Mental Health & Hospital, Billochpura, Mathura Road, Agra, Uttar Pradesh','Uttar Pradesh','282002',27.2199,77.9348,NULL),(33,'Mental Hospital Bareilly\nCivil Lines, Bareilly, Uttar Pradesh','Uttar Pradesh','243005',28.365,79.4325,NULL),(34,'Mental Hospital, S2/1 Pandeypur, Varanasi, Uttar Pradesh','Uttar Pradesh','221002',25.345,82.9904,NULL),(35,'Lumbini Park Mental Hospital, 115, G.S, Bose Road, Calcutta, West Bengal','West Bengal','700010',22.5656,88.3702,NULL),(36,'Calcutta Pavlov Hospital, 18, Gobra Road, Calcutta, West Bengal','West Bengal','700046',22.5313,88.396,NULL),(37,'Institute of Psychiatry, 7, D.L. Khan Road, Calcutta, West Bengal','West Bengal','700025',22.5257,88.3501,NULL),(38,'The Mental Hospital (Calcutta & Mankundu), 133, Vivekananda Road, Calcutta, West Bengal','West Bengal','700006',22.587,88.3704,NULL),(39,'Institute for Mental Care, Purulia P.O., Purulia, West Bengal','West Bengal','723103',23.2483,86.4997,NULL),(40,'Mental Hospital Berhampore, Berhampore Mental Hospital, Berhampore P.O, Murshidabad, West Bengal','West Bengal','742101',24.1048,88.251,NULL),(41,'Himachal Hospital of Mental Health & Rehabilitation, Boileauganj, Shimla','Shimla','171004',31.1042,77.171,NULL),(42,'Institute of Mental Health, Koelwar, Bhojpur, Bihar','Bihar','802301',27.25,87.0833,NULL),(43,'Meghalaya Institute of Mental Health & Neurosciences, Shillong, Meghalaya','Meghalaya','793001',25.576,91.8828,NULL),(44,'Government Mental Hospital, Agartala, Tripura','Tripura','799001',23.8328,91.2791,NULL);
/*!40000 ALTER TABLE `Hospitals` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
