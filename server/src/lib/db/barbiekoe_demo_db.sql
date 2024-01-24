CREATE DATABASE  IF NOT EXISTS `barbiekoe` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `barbiekoe`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: barbiekoe
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accommodations`
--

DROP TABLE IF EXISTS `accommodations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accommodations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accommodation_type` varchar(100) DEFAULT NULL,
  `description_note` varchar(1000) DEFAULT NULL,
  `cost` smallint DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accommodations`
--

LOCK TABLES `accommodations` WRITE;
/*!40000 ALTER TABLE `accommodations` DISABLE KEYS */;
INSERT INTO `accommodations` VALUES (1,'Tent','',15,'2024-01-24 10:41:03','2024-01-24 10:41:03'),(2,'Camper','',30,'2024-01-24 10:41:11','2024-01-24 10:41:11');
/*!40000 ALTER TABLE `accommodations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `house_number` varchar(25) DEFAULT NULL,
  `city` varchar(90) DEFAULT NULL,
  `country` varchar(60) DEFAULT NULL,
  `streetname` varchar(90) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'45Z','Leiden','Nederland','Heidelberglaan','1234AB','2024-01-24 11:32:21','2024-01-24 11:32:21'),(2,'13','Zwolle','Nederland','Symfonielaan','4321BA','2024-01-24 11:35:29','2024-01-24 11:35:29'),(3,'55','Haarlem','Nederland','Aardbeigaarde','4321BA','2024-01-24 11:40:25','2024-01-24 11:40:25'),(4,'4B','Nijmegen','Nederland','Padualaan','4321BA','2024-01-24 11:46:27','2024-01-24 11:46:27'),(5,'33','Tiel','Nederland','Smaragdgaarde','5891AB','2024-01-24 11:52:55','2024-01-24 11:52:55'),(6,'101A','Twente','Nederland','Raketlaan','8412PB','2024-01-24 11:56:13','2024-01-24 11:56:13'),(7,'7','Almere','Nederland','Turnerstraat','8412PB','2024-01-24 11:59:55','2024-01-24 11:59:55');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `guest_id` int DEFAULT NULL,
  `camping_spot_id` int DEFAULT NULL,
  `arrival` datetime DEFAULT NULL,
  `departure` datetime DEFAULT NULL,
  `adult` tinyint unsigned DEFAULT NULL,
  `child` tinyint unsigned DEFAULT NULL,
  `young_child` tinyint unsigned DEFAULT NULL,
  `cost` smallint unsigned DEFAULT NULL,
  `booking_status` tinyint(1) DEFAULT NULL,
  `notes` varchar(610) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `guest_id` (`guest_id`),
  KEY `camping_spot_id` (`camping_spot_id`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`camping_spot_id`) REFERENCES `camping_spots` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,1,1,'2024-01-23 19:00:00','2024-01-31 14:00:00',1,0,0,320,1,'','2024-01-24 11:32:21','2024-01-24 11:32:21'),(2,2,2,'2024-01-25 19:00:00','2024-01-28 14:00:00',1,0,0,120,0,'','2024-01-24 11:35:29','2024-01-24 11:35:29'),(3,3,3,'2024-01-24 19:00:00','2024-02-02 14:00:00',2,2,1,765,1,'Extra kinderzitjes','2024-01-24 11:40:25','2024-01-24 11:40:25'),(4,4,4,'2024-02-15 19:00:00','2024-02-18 14:00:00',2,1,1,225,0,'Extra kinderzitjes','2024-01-24 11:46:27','2024-01-24 11:46:27'),(5,5,5,'2024-01-25 19:00:00','2024-02-04 14:00:00',2,0,0,600,0,'','2024-01-24 11:52:55','2024-01-24 11:52:55'),(6,6,6,'2024-01-20 19:00:00','2024-02-05 14:00:00',4,0,0,1600,1,'Festivalgangers','2024-01-24 11:56:13','2024-01-24 11:56:13'),(7,7,7,'2024-01-30 19:00:00','2024-02-10 14:00:00',2,0,1,715,0,'','2024-01-24 11:59:55','2024-01-24 11:59:55');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camping_spots`
--

DROP TABLE IF EXISTS `camping_spots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camping_spots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accommodations_id` int DEFAULT NULL,
  `spot_name` varchar(5) DEFAULT NULL,
  `spot_status` tinyint(1) DEFAULT NULL,
  `notes` varchar(610) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `accommodations_id` (`accommodations_id`),
  CONSTRAINT `camping_spots_ibfk_1` FOREIGN KEY (`accommodations_id`) REFERENCES `accommodations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camping_spots`
--

LOCK TABLES `camping_spots` WRITE;
/*!40000 ALTER TABLE `camping_spots` DISABLE KEYS */;
INSERT INTO `camping_spots` VALUES (1,1,'1.0',1,'family','2024-01-24 11:06:00','2024-01-24 11:06:00'),(2,1,'1.1',1,'family','2024-01-24 11:06:00','2024-01-24 11:06:00'),(3,1,'1.2',1,'family','2024-01-24 11:06:00','2024-01-24 11:06:00'),(4,1,'1.3',1,'family','2024-01-24 11:06:00','2024-01-24 11:06:00'),(5,1,'1.4',1,'family','2024-01-24 11:06:00','2024-01-24 11:06:00'),(6,1,'1.5',1,'family','2024-01-24 11:06:00','2024-01-24 11:06:00'),(7,1,'1.6',1,'family','2024-01-24 11:06:00','2024-01-24 11:06:00'),(8,1,'1.7',1,'family','2024-01-24 11:06:00','2024-01-24 11:06:00'),(9,1,'1.8',1,'family','2024-01-24 11:06:00','2024-01-24 11:06:00'),(10,1,'1.9',1,'family','2024-01-24 11:06:01','2024-01-24 11:06:01'),(11,1,'1.10',1,'family','2024-01-24 11:06:01','2024-01-24 11:06:01'),(12,1,'1.11',1,'family','2024-01-24 11:06:01','2024-01-24 11:06:01'),(13,1,'1.12',1,'family','2024-01-24 11:06:01','2024-01-24 11:06:01'),(14,1,'1.13',1,'family','2024-01-24 11:06:01','2024-01-24 11:06:01'),(15,1,'1.14',1,'family','2024-01-24 11:06:01','2024-01-24 11:06:01'),(16,1,'1.15',1,'family','2024-01-24 11:06:01','2024-01-24 11:06:01'),(17,1,'1.16',1,'family','2024-01-24 11:06:01','2024-01-24 11:06:01'),(18,1,'1.17',1,'family','2024-01-24 11:06:01','2024-01-24 11:06:01'),(19,1,'1.18',1,'family','2024-01-24 11:06:02','2024-01-24 11:06:02'),(20,1,'1.19',1,'family','2024-01-24 11:06:02','2024-01-24 11:06:02'),(21,1,'1.20',1,'family','2024-01-24 11:06:02','2024-01-24 11:06:02'),(22,1,'1.21',1,'family','2024-01-24 11:06:02','2024-01-24 11:06:02'),(23,1,'1.22',1,'family','2024-01-24 11:06:02','2024-01-24 11:06:02'),(24,1,'1.23',1,'family','2024-01-24 11:06:02','2024-01-24 11:06:02'),(25,1,'1.24',1,'family','2024-01-24 11:06:02','2024-01-24 11:06:02'),(26,1,'1.25',1,'family','2024-01-24 11:06:02','2024-01-24 11:06:02'),(27,1,'1.26',1,'family','2024-01-24 11:06:02','2024-01-24 11:06:02'),(28,1,'1.27',1,'family','2024-01-24 11:06:02','2024-01-24 11:06:02'),(29,1,'1.28',1,'family','2024-01-24 11:06:03','2024-01-24 11:06:03'),(30,1,'1.29',1,'family','2024-01-24 11:06:03','2024-01-24 11:06:03'),(31,1,'1.30',1,'family','2024-01-24 11:06:03','2024-01-24 11:06:03'),(32,1,'1.31',1,'family','2024-01-24 11:06:03','2024-01-24 11:06:03'),(33,1,'1.32',1,'family','2024-01-24 11:06:03','2024-01-24 11:06:03'),(34,1,'1.33',1,'family','2024-01-24 11:06:03','2024-01-24 11:06:03'),(35,1,'1.34',1,'family','2024-01-24 11:06:03','2024-01-24 11:06:03'),(36,1,'1.35',1,'family','2024-01-24 11:06:03','2024-01-24 11:06:03'),(37,1,'1.36',1,'family','2024-01-24 11:06:03','2024-01-24 11:06:03'),(38,1,'1.37',1,'family','2024-01-24 11:06:04','2024-01-24 11:06:04'),(39,1,'1.38',1,'family','2024-01-24 11:06:04','2024-01-24 11:06:04'),(40,1,'1.39',1,'family','2024-01-24 11:06:04','2024-01-24 11:06:04'),(41,1,'1.40',1,'family','2024-01-24 11:06:04','2024-01-24 11:06:04'),(42,1,'1.41',1,'family','2024-01-24 11:06:04','2024-01-24 11:06:04'),(43,1,'1.42',1,'family','2024-01-24 11:06:04','2024-01-24 11:06:04'),(44,1,'1.43',1,'family','2024-01-24 11:06:04','2024-01-24 11:06:04'),(45,1,'1.44',1,'family','2024-01-24 11:06:04','2024-01-24 11:06:04'),(46,1,'2.0',1,'family','2024-01-24 11:06:04','2024-01-24 11:06:04'),(47,1,'2.1',1,'family','2024-01-24 11:06:05','2024-01-24 11:06:05'),(48,1,'2.2',1,'family','2024-01-24 11:06:05','2024-01-24 11:06:05'),(49,1,'2.3',1,'family','2024-01-24 11:06:05','2024-01-24 11:06:05'),(50,1,'2.4',1,'family','2024-01-24 11:06:05','2024-01-24 11:06:05'),(51,1,'2.5',1,'family','2024-01-24 11:06:05','2024-01-24 11:06:05'),(52,1,'2.6',1,'family','2024-01-24 11:06:05','2024-01-24 11:06:05'),(53,1,'2.7',1,'family','2024-01-24 11:06:05','2024-01-24 11:06:05'),(54,1,'2.8',1,'family','2024-01-24 11:06:05','2024-01-24 11:06:05'),(55,1,'2.9',1,'family','2024-01-24 11:06:05','2024-01-24 11:06:05'),(56,1,'2.10',1,'family','2024-01-24 11:06:05','2024-01-24 11:06:05'),(57,1,'2.11',1,'family','2024-01-24 11:06:06','2024-01-24 11:06:06'),(58,1,'3.0',1,'family','2024-01-24 11:06:06','2024-01-24 11:06:06'),(59,1,'3.1',1,'family','2024-01-24 11:06:06','2024-01-24 11:06:06'),(60,1,'3.2',1,'family','2024-01-24 11:06:06','2024-01-24 11:06:06'),(61,1,'3.3',1,'family','2024-01-24 11:06:06','2024-01-24 11:06:06'),(62,1,'3.4',1,'family','2024-01-24 11:06:06','2024-01-24 11:06:06'),(63,1,'3.5',1,'family','2024-01-24 11:06:06','2024-01-24 11:06:06'),(64,1,'3.6',1,'family','2024-01-24 11:06:06','2024-01-24 11:06:06'),(65,1,'3.7',1,'family','2024-01-24 11:06:06','2024-01-24 11:06:06'),(66,1,'3.8',1,'family','2024-01-24 11:06:07','2024-01-24 11:06:07'),(67,1,'3.9',1,'family','2024-01-24 11:06:07','2024-01-24 11:06:07'),(68,1,'3.10',1,'family','2024-01-24 11:06:07','2024-01-24 11:06:07'),(69,1,'3.11',1,'family','2024-01-24 11:06:07','2024-01-24 11:06:07'),(70,1,'3.12',1,'family','2024-01-24 11:06:07','2024-01-24 11:06:07'),(71,1,'3.13',1,'family','2024-01-24 11:06:07','2024-01-24 11:06:07'),(72,1,'3.14',1,'family','2024-01-24 11:06:07','2024-01-24 11:06:07'),(73,1,'3.15',1,'family','2024-01-24 11:06:07','2024-01-24 11:06:07'),(74,1,'3.16',1,'family','2024-01-24 11:06:07','2024-01-24 11:06:07'),(75,1,'3.17',1,'family','2024-01-24 11:06:08','2024-01-24 11:06:08'),(76,1,'4.0',1,'family','2024-01-24 11:06:08','2024-01-24 11:06:08'),(77,1,'4.1',1,'family','2024-01-24 11:06:08','2024-01-24 11:06:08'),(78,1,'4.2',1,'family','2024-01-24 11:06:08','2024-01-24 11:06:08'),(79,1,'4.3',1,'family','2024-01-24 11:06:08','2024-01-24 11:06:08'),(80,1,'4.4',1,'family','2024-01-24 11:06:08','2024-01-24 11:06:08'),(81,1,'4.5',1,'family','2024-01-24 11:06:08','2024-01-24 11:06:08'),(82,1,'4.6',1,'family','2024-01-24 11:06:08','2024-01-24 11:06:08'),(83,1,'4.7',1,'family','2024-01-24 11:06:08','2024-01-24 11:06:08'),(84,1,'4.8',1,'family','2024-01-24 11:06:09','2024-01-24 11:06:09'),(85,1,'4.9',1,'family','2024-01-24 11:06:09','2024-01-24 11:06:09'),(86,1,'4.10',1,'family','2024-01-24 11:06:09','2024-01-24 11:06:09'),(87,1,'4.11',1,'family','2024-01-24 11:06:09','2024-01-24 11:06:09'),(88,1,'5.0',1,'not family','2024-01-24 11:06:09','2024-01-24 11:06:09'),(89,1,'5.1',1,'not family','2024-01-24 11:06:09','2024-01-24 11:06:09'),(90,1,'5.2',1,'not family','2024-01-24 11:06:09','2024-01-24 11:06:09'),(91,1,'5.3',1,'not family','2024-01-24 11:06:09','2024-01-24 11:06:09'),(92,1,'5.4',1,'not family','2024-01-24 11:06:09','2024-01-24 11:06:09'),(93,1,'5.5',1,'not family','2024-01-24 11:06:09','2024-01-24 11:06:09'),(94,1,'5.6',1,'not family','2024-01-24 11:06:10','2024-01-24 11:06:10'),(95,1,'5.7',1,'not family','2024-01-24 11:06:10','2024-01-24 11:06:10'),(96,1,'5.8',1,'not family','2024-01-24 11:06:10','2024-01-24 11:06:10'),(97,1,'5.9',1,'not family','2024-01-24 11:06:10','2024-01-24 11:06:10'),(98,1,'5.10',1,'not family','2024-01-24 11:06:10','2024-01-24 11:06:10'),(99,1,'5.11',1,'not family','2024-01-24 11:06:10','2024-01-24 11:06:10'),(100,1,'5.12',1,'not family','2024-01-24 11:06:10','2024-01-24 11:06:10'),(101,1,'5.13',1,'not family','2024-01-24 11:06:10','2024-01-24 11:06:10'),(102,1,'5.14',1,'not family','2024-01-24 11:06:10','2024-01-24 11:06:10'),(103,1,'5.15',1,'not family','2024-01-24 11:06:11','2024-01-24 11:06:11'),(104,1,'5.16',1,'not family','2024-01-24 11:06:11','2024-01-24 11:06:11'),(105,1,'5.17',1,'not family','2024-01-24 11:06:11','2024-01-24 11:06:11'),(106,1,'5.18',1,'not family','2024-01-24 11:06:11','2024-01-24 11:06:11'),(107,1,'5.19',1,'not family','2024-01-24 11:06:11','2024-01-24 11:06:11'),(108,1,'5.20',1,'not family','2024-01-24 11:06:11','2024-01-24 11:06:11'),(109,1,'5.21',1,'not family','2024-01-24 11:06:11','2024-01-24 11:06:11'),(110,1,'5.22',1,'not family','2024-01-24 11:06:11','2024-01-24 11:06:11'),(111,1,'5.23',1,'not family','2024-01-24 11:06:11','2024-01-24 11:06:11'),(112,1,'5.24',1,'not family','2024-01-24 11:06:12','2024-01-24 11:06:12'),(113,1,'5.25',1,'not family','2024-01-24 11:06:12','2024-01-24 11:06:12'),(114,1,'6.0',1,'family','2024-01-24 11:06:12','2024-01-24 11:06:12'),(115,1,'6.1',1,'family','2024-01-24 11:06:12','2024-01-24 11:06:12'),(116,1,'6.2',1,'family','2024-01-24 11:06:12','2024-01-24 11:06:12'),(117,1,'6.3',1,'family','2024-01-24 11:06:12','2024-01-24 11:06:12'),(118,1,'6.4',1,'family','2024-01-24 11:06:12','2024-01-24 11:06:12'),(119,1,'6.5',1,'family','2024-01-24 11:06:12','2024-01-24 11:06:12'),(120,1,'6.6',1,'family','2024-01-24 11:06:12','2024-01-24 11:06:12'),(121,1,'6.7',1,'family','2024-01-24 11:06:12','2024-01-24 11:06:12'),(122,1,'6.8',1,'family','2024-01-24 11:06:13','2024-01-24 11:06:13'),(123,1,'6.9',1,'family','2024-01-24 11:06:13','2024-01-24 11:06:13'),(124,1,'6.10',1,'family','2024-01-24 11:06:13','2024-01-24 11:06:13'),(125,1,'6.11',1,'family','2024-01-24 11:06:13','2024-01-24 11:06:13'),(126,1,'6.12',1,'family','2024-01-24 11:06:13','2024-01-24 11:06:13'),(127,1,'6.13',1,'family','2024-01-24 11:06:13','2024-01-24 11:06:13'),(128,1,'6.14',1,'family','2024-01-24 11:06:13','2024-01-24 11:06:13'),(129,1,'6.15',1,'family','2024-01-24 11:06:13','2024-01-24 11:06:13'),(130,1,'6.16',1,'family','2024-01-24 11:06:13','2024-01-24 11:06:13'),(131,1,'6.17',1,'family','2024-01-24 11:06:14','2024-01-24 11:06:14'),(132,1,'6.18',1,'family','2024-01-24 11:06:14','2024-01-24 11:06:14'),(133,1,'6.19',1,'family','2024-01-24 11:06:14','2024-01-24 11:06:14'),(134,1,'6.20',1,'family','2024-01-24 11:06:14','2024-01-24 11:06:14'),(135,1,'6.21',1,'family','2024-01-24 11:06:14','2024-01-24 11:06:14'),(136,1,'6.22',1,'family','2024-01-24 11:06:14','2024-01-24 11:06:14'),(137,1,'6.23',1,'family','2024-01-24 11:06:14','2024-01-24 11:06:14'),(138,1,'6.24',1,'family','2024-01-24 11:06:14','2024-01-24 11:06:14'),(139,1,'6.25',1,'family','2024-01-24 11:06:14','2024-01-24 11:06:14'),(140,1,'7.0',1,'not family','2024-01-24 11:06:15','2024-01-24 11:06:15'),(141,1,'7.1',1,'not family','2024-01-24 11:06:15','2024-01-24 11:06:15'),(142,1,'7.2',1,'not family','2024-01-24 11:06:15','2024-01-24 11:06:15'),(143,1,'7.3',1,'not family','2024-01-24 11:06:15','2024-01-24 11:06:15'),(144,1,'7.4',1,'not family','2024-01-24 11:06:15','2024-01-24 11:06:15'),(145,1,'7.5',1,'not family','2024-01-24 11:06:15','2024-01-24 11:06:15'),(146,1,'7.6',1,'not family','2024-01-24 11:06:15','2024-01-24 11:06:15'),(147,1,'7.7',1,'not family','2024-01-24 11:06:15','2024-01-24 11:06:15'),(148,1,'7.8',1,'not family','2024-01-24 11:06:15','2024-01-24 11:06:15'),(149,1,'7.9',1,'not family','2024-01-24 11:06:16','2024-01-24 11:06:16'),(150,1,'7.10',1,'not family','2024-01-24 11:06:16','2024-01-24 11:06:16'),(151,1,'7.11',1,'not family','2024-01-24 11:06:16','2024-01-24 11:06:16'),(152,1,'7.12',1,'not family','2024-01-24 11:06:16','2024-01-24 11:06:16'),(153,1,'7.13',1,'not family','2024-01-24 11:06:16','2024-01-24 11:06:16'),(154,1,'7.14',1,'not family','2024-01-24 11:06:16','2024-01-24 11:06:16'),(155,1,'7.15',1,'not family','2024-01-24 11:06:16','2024-01-24 11:06:16'),(156,1,'7.16',1,'not family','2024-01-24 11:06:16','2024-01-24 11:06:16'),(157,1,'7.17',1,'not family','2024-01-24 11:06:16','2024-01-24 11:06:16'),(158,1,'7.18',1,'not family','2024-01-24 11:06:16','2024-01-24 11:06:16'),(159,1,'7.19',1,'not family','2024-01-24 11:06:17','2024-01-24 11:06:17'),(160,1,'7.20',1,'not family','2024-01-24 11:06:17','2024-01-24 11:06:17'),(161,1,'7.21',1,'not family','2024-01-24 11:06:17','2024-01-24 11:06:17'),(162,1,'7.22',1,'not family','2024-01-24 11:06:17','2024-01-24 11:06:17'),(163,1,'7.23',1,'not family','2024-01-24 11:06:17','2024-01-24 11:06:17'),(164,1,'7.24',1,'not family','2024-01-24 11:06:17','2024-01-24 11:06:17'),(165,1,'7.25',1,'not family','2024-01-24 11:06:17','2024-01-24 11:06:17'),(166,1,'7.26',1,'not family','2024-01-24 11:06:17','2024-01-24 11:06:17'),(167,1,'7.27',1,'not family','2024-01-24 11:06:17','2024-01-24 11:06:17'),(168,1,'7.28',1,'not family','2024-01-24 11:06:18','2024-01-24 11:06:18'),(169,1,'7.29',1,'not family','2024-01-24 11:06:18','2024-01-24 11:06:18'),(170,1,'7.30',1,'not family','2024-01-24 11:06:18','2024-01-24 11:06:18'),(171,1,'7.31',1,'not family','2024-01-24 11:06:18','2024-01-24 11:06:18'),(172,1,'7.32',1,'not family','2024-01-24 11:06:18','2024-01-24 11:06:18'),(173,1,'8.0',1,'not family','2024-01-24 11:06:18','2024-01-24 11:06:18'),(174,1,'8.1',1,'not family','2024-01-24 11:06:18','2024-01-24 11:06:18'),(175,1,'8.2',1,'not family','2024-01-24 11:06:18','2024-01-24 11:06:18'),(176,1,'8.3',1,'not family','2024-01-24 11:06:18','2024-01-24 11:06:18'),(177,1,'8.4',1,'not family','2024-01-24 11:06:19','2024-01-24 11:06:19'),(178,1,'8.5',1,'not family','2024-01-24 11:06:19','2024-01-24 11:06:19'),(179,1,'8.6',1,'not family','2024-01-24 11:06:19','2024-01-24 11:06:19'),(180,1,'8.7',1,'not family','2024-01-24 11:06:19','2024-01-24 11:06:19'),(181,1,'8.8',1,'not family','2024-01-24 11:06:19','2024-01-24 11:06:19'),(182,1,'8.9',1,'not family','2024-01-24 11:06:19','2024-01-24 11:06:19'),(183,1,'8.10',1,'not family','2024-01-24 11:06:19','2024-01-24 11:06:19'),(184,1,'8.11',1,'not family','2024-01-24 11:06:19','2024-01-24 11:06:19'),(185,1,'8.12',1,'not family','2024-01-24 11:06:19','2024-01-24 11:06:19'),(186,1,'8.13',1,'not family','2024-01-24 11:06:19','2024-01-24 11:06:19'),(187,1,'8.14',1,'not family','2024-01-24 11:06:20','2024-01-24 11:06:20'),(188,1,'8.15',1,'not family','2024-01-24 11:06:20','2024-01-24 11:06:20'),(189,1,'8.16',1,'not family','2024-01-24 11:06:20','2024-01-24 11:06:20'),(190,1,'9.0',1,'not family','2024-01-24 11:06:20','2024-01-24 11:06:20'),(191,1,'9.1',1,'not family','2024-01-24 11:06:20','2024-01-24 11:06:20'),(192,1,'9.2',1,'not family','2024-01-24 11:06:20','2024-01-24 11:06:20'),(193,1,'9.3',1,'not family','2024-01-24 11:06:20','2024-01-24 11:06:20'),(194,1,'9.4',1,'not family','2024-01-24 11:06:20','2024-01-24 11:06:20'),(195,1,'9.5',1,'not family','2024-01-24 11:06:20','2024-01-24 11:06:20'),(196,1,'9.6',1,'not family','2024-01-24 11:06:21','2024-01-24 11:06:21'),(197,1,'9.7',1,'not family','2024-01-24 11:06:21','2024-01-24 11:06:21'),(198,1,'9.8',1,'not family','2024-01-24 11:06:21','2024-01-24 11:06:21'),(199,1,'9.9',1,'not family','2024-01-24 11:06:21','2024-01-24 11:06:21'),(200,1,'9.10',1,'not family','2024-01-24 11:06:21','2024-01-24 11:06:21'),(201,1,'9.11',1,'not family','2024-01-24 11:06:21','2024-01-24 11:06:21'),(202,1,'9.12',1,'not family','2024-01-24 11:06:21','2024-01-24 11:06:21'),(203,1,'9.13',1,'not family','2024-01-24 11:06:21','2024-01-24 11:06:21'),(204,1,'9.14',1,'not family','2024-01-24 11:06:21','2024-01-24 11:06:21'),(205,1,'9.15',1,'not family','2024-01-24 11:06:22','2024-01-24 11:06:22'),(206,1,'9.16',1,'not family','2024-01-24 11:06:22','2024-01-24 11:06:22'),(207,1,'10.0',1,'not family','2024-01-24 11:06:22','2024-01-24 11:06:22'),(208,1,'10.1',1,'not family','2024-01-24 11:06:22','2024-01-24 11:06:22'),(209,1,'10.2',1,'not family','2024-01-24 11:06:22','2024-01-24 11:06:22'),(210,1,'10.3',1,'not family','2024-01-24 11:06:22','2024-01-24 11:06:22'),(211,1,'10.4',1,'not family','2024-01-24 11:06:22','2024-01-24 11:06:22'),(212,1,'10.5',1,'not family','2024-01-24 11:06:22','2024-01-24 11:06:22'),(213,1,'10.6',1,'not family','2024-01-24 11:06:22','2024-01-24 11:06:22'),(214,1,'10.7',1,'not family','2024-01-24 11:06:22','2024-01-24 11:06:22'),(215,1,'10.8',1,'not family','2024-01-24 11:06:23','2024-01-24 11:06:23'),(216,1,'10.9',1,'not family','2024-01-24 11:06:23','2024-01-24 11:06:23'),(217,1,'10.10',1,'not family','2024-01-24 11:06:23','2024-01-24 11:06:23'),(218,1,'10.11',1,'not family','2024-01-24 11:06:23','2024-01-24 11:06:23'),(219,1,'10.12',1,'not family','2024-01-24 11:06:23','2024-01-24 11:06:23'),(220,1,'10.13',1,'not family','2024-01-24 11:06:23','2024-01-24 11:06:23'),(221,1,'11.0',1,'not family','2024-01-24 11:06:23','2024-01-24 11:06:23'),(222,1,'11.1',1,'not family','2024-01-24 11:06:23','2024-01-24 11:06:23'),(223,1,'11.2',1,'not family','2024-01-24 11:06:23','2024-01-24 11:06:23'),(224,1,'11.3',1,'not family','2024-01-24 11:06:24','2024-01-24 11:06:24'),(225,1,'11.4',1,'not family','2024-01-24 11:06:24','2024-01-24 11:06:24'),(226,1,'11.5',1,'not family','2024-01-24 11:06:24','2024-01-24 11:06:24'),(227,1,'11.6',1,'not family','2024-01-24 11:06:24','2024-01-24 11:06:24'),(228,1,'11.7',1,'not family','2024-01-24 11:06:24','2024-01-24 11:06:24'),(229,1,'11.8',1,'not family','2024-01-24 11:06:24','2024-01-24 11:06:24'),(230,1,'11.9',1,'not family','2024-01-24 11:06:24','2024-01-24 11:06:24'),(231,1,'11.10',1,'not family','2024-01-24 11:06:24','2024-01-24 11:06:24'),(232,1,'11.11',1,'not family','2024-01-24 11:06:24','2024-01-24 11:06:24'),(233,1,'11.12',1,'not family','2024-01-24 11:06:25','2024-01-24 11:06:25'),(234,1,'11.13',1,'not family','2024-01-24 11:06:25','2024-01-24 11:06:25'),(235,1,'11.14',1,'not family','2024-01-24 11:06:25','2024-01-24 11:06:25'),(236,1,'11.15',1,'not family','2024-01-24 11:06:25','2024-01-24 11:06:25'),(237,1,'11.16',1,'not family','2024-01-24 11:06:25','2024-01-24 11:06:25'),(238,1,'11.17',1,'not family','2024-01-24 11:06:25','2024-01-24 11:06:25'),(239,1,'11.18',1,'not family','2024-01-24 11:06:25','2024-01-24 11:06:25'),(240,1,'11.19',1,'not family','2024-01-24 11:06:25','2024-01-24 11:06:25'),(241,1,'11.20',1,'not family','2024-01-24 11:06:25','2024-01-24 11:06:25'),(242,1,'11.21',1,'not family','2024-01-24 11:06:25','2024-01-24 11:06:25'),(243,1,'11.22',1,'not family','2024-01-24 11:06:26','2024-01-24 11:06:26'),(244,1,'11.23',1,'not family','2024-01-24 11:06:26','2024-01-24 11:06:26'),(245,1,'11.24',1,'not family','2024-01-24 11:06:26','2024-01-24 11:06:26'),(246,1,'11.25',1,'not family','2024-01-24 11:06:26','2024-01-24 11:06:26'),(247,1,'11.26',1,'not family','2024-01-24 11:06:26','2024-01-24 11:06:26'),(248,1,'11.27',1,'not family','2024-01-24 11:06:26','2024-01-24 11:06:26'),(249,1,'11.28',1,'not family','2024-01-24 11:06:26','2024-01-24 11:06:26'),(250,1,'11.29',1,'not family','2024-01-24 11:06:26','2024-01-24 11:06:26');
/*!40000 ALTER TABLE `camping_spots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int DEFAULT NULL,
  `license_plate` varchar(15) DEFAULT NULL,
  `car_status` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,1,'GR0-ET-J3S',1,'2024-01-24 11:32:21','2024-01-24 11:32:21'),(2,2,'RA-0UU-UL',0,'2024-01-24 11:35:29','2024-01-24 11:35:29'),(3,3,'XA-0R3-ZZ',1,'2024-01-24 11:40:25','2024-01-24 11:40:25'),(4,4,'NT-LA3-12',0,'2024-01-24 11:46:27','2024-01-24 11:46:27'),(5,5,'AB-32Y-KM',0,'2024-01-24 11:52:55','2024-01-24 11:52:55'),(6,6,'F3-EST-24',1,'2024-01-24 11:56:13','2024-01-24 11:56:13'),(7,7,'HO-3Y-EL2',0,'2024-01-24 11:59:55','2024-01-24 11:59:55');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cost_guest_sort`
--

DROP TABLE IF EXISTS `cost_guest_sort`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cost_guest_sort` (
  `id` int NOT NULL AUTO_INCREMENT,
  `person_type` varchar(20) DEFAULT NULL,
  `cost` tinyint unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cost_guest_sort`
--

LOCK TABLES `cost_guest_sort` WRITE;
/*!40000 ALTER TABLE `cost_guest_sort` DISABLE KEYS */;
INSERT INTO `cost_guest_sort` VALUES (1,'Kind',5,'2024-01-24 10:33:54','2024-01-24 10:33:54'),(2,'Tiener',10,'2024-01-24 10:34:03','2024-01-24 10:34:03'),(3,'Volwassene',20,'2024-01-24 10:34:11','2024-01-24 10:34:11');
/*!40000 ALTER TABLE `cost_guest_sort` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guests`
--

DROP TABLE IF EXISTS `guests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address_id` int DEFAULT NULL,
  `first_name` varchar(120) DEFAULT NULL,
  `last_name` varchar(120) DEFAULT NULL,
  `phone` varchar(120) DEFAULT NULL,
  `email` varchar(325) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `guests_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guests`
--

LOCK TABLES `guests` WRITE;
/*!40000 ALTER TABLE `guests` DISABLE KEYS */;
INSERT INTO `guests` VALUES (1,1,'Hugo','Poeks','+316 12345678','hugopoeks@gmail.com','2024-01-24 11:32:21','2024-01-24 11:32:21'),(2,2,'Raoul','van Wijk','+316 87654321','raoulvanwijk@gmail.com','2024-01-24 11:35:29','2024-01-24 11:35:29'),(3,3,'Myrthe','van den Hogenblieken','+316 12348765','myrthevdhogenblieken@gmail.com','2024-01-24 11:40:25','2024-01-24 11:40:25'),(4,4,'Iris','van Spanje','+316 23586123','iris03@gmail.com','2024-01-24 11:46:27','2024-01-24 11:46:27'),(5,5,'Natalie','Ter Voorde','+316 23586123','nata.vor@gmail.com','2024-01-24 11:52:55','2024-01-24 11:52:55'),(6,6,'Sam','Jansen','+316 23586123','san.jan@gmail.com','2024-01-24 11:56:13','2024-01-24 11:56:13'),(7,7,'Bas','Els','+316 41240912','bassiebras@gmail.com','2024-01-24 11:59:55','2024-01-24 11:59:55');
/*!40000 ALTER TABLE `guests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(500) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIdWdvIiwicHJvZmlsZV9waWN0dXJlIjpudWxsLCJpYXQiOjE3MDYwOTQ0OTIsImV4cCI6MTcwNjI2NzI5Mn0.lbGmhugMMrBG3bVI7AMXyQBCUHDwHFXNvVK5nBX6SWs','2024-01-24 12:08:12','2024-01-24 12:08:12');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Hugo','$2a$12$4uFFPqv79HdmGQ0rf6jg0OdV2L0oS00r7iI/UpVkbPASzMCDJDwTy',NULL,NULL,NULL),(2,'Finn','$2a$12$4uFFPqv79HdmGQ0rf6jg0OdV2L0oS00r7iI/UpVkbPASzMCDJDwTy','https://ariscaphotography.nl/wp-content/uploads/2020/10/IMG_0351-541-1-600x374.jpg',NULL,NULL),(3,'Raoul','$2a$12$4uFFPqv79HdmGQ0rf6jg0OdV2L0oS00r7iI/UpVkbPASzMCDJDwTy','https://cms.dierenbescherming.nl/assets/common/default/_640x853_crop_center-center_none/iStock-93198717_2023-06-27-080530_kaui.png?stamp=2311211550&tag=xs',NULL,NULL),(4,'Jochem','$2a$12$4uFFPqv79HdmGQ0rf6jg0OdV2L0oS00r7iI/UpVkbPASzMCDJDwTy','https://imgur.com/9Axxeto.jpg',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'barbiekoe'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_create_session` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_session`(
  IN p_user_id INT,
  IN p_token VARCHAR(500)
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
  END;

  START TRANSACTION;
    INSERT INTO sessions (user_id, token) VALUES (p_user_id, p_token);
  COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_session` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_session`(
  IN _session_token VARCHAR(700)
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
  END;

  START TRANSACTION;
    DELETE FROM sessions WHERE `token` = _session_token;
  COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_password_from_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_password_from_user`(
  IN p_id INT
)
BEGIN
  SELECT username, password, profile_picture FROM users WHERE id = p_id LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_session` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_session`(
    IN _session_token VARCHAR(700)
)
BEGIN
    
    SELECT * FROM sessions WHERE `token` = _session_token;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_users` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_users`()
BEGIN
    
    SELECT id, username, profile_picture, created_at, updated_at FROM users;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_user_with_session` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_user_with_session`(
    IN _session_token VARCHAR(700)
)
BEGIN
    
    SELECT users.id, users.username, users.profile_picture, users.created_at, users.updated_at, _session_token as token FROM users
    INNER JOIN sessions ON sessions.user_id = users.id
    WHERE sessions.token = _session_token;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-24 13:55:49
