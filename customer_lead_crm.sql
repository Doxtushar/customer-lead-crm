-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: customer_lead_crm
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `customer_lead`
--

DROP TABLE IF EXISTS `customer_lead`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_lead` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `alternate_number` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) NOT NULL,
  `discussion_details` varchar(3000) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `lead_source` varchar(255) DEFAULT NULL,
  `mobile` varchar(10) NOT NULL,
  `next_follow_up_date` date DEFAULT NULL,
  `priority` enum('COLD','HOT','NOT_A_CUSTOMER','WARM') DEFAULT NULL,
  `requirement` varchar(2000) DEFAULT NULL,
  `status` enum('CLOSED_LOST','CLOSED_WON','CONTACTED','FOLLOW_UP','INTERESTED','NEGOTIATION','NEW','NOT_INTERESTED','VISIT_SCHEDULED') DEFAULT NULL,
  `visit_date` date DEFAULT NULL,
  `assigned_user_id` bigint DEFAULT NULL,
  `lead_type_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlm7k2yfowu6w4ir1cpj1ply99` (`assigned_user_id`),
  KEY `FKtcr0rnh6sun821wpy81dkc6yf` (`lead_type_id`),
  CONSTRAINT `FKlm7k2yfowu6w4ir1cpj1ply99` FOREIGN KEY (`assigned_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKtcr0rnh6sun821wpy81dkc6yf` FOREIGN KEY (`lead_type_id`) REFERENCES `lead_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_lead`
--

LOCK TABLES `customer_lead` WRITE;
/*!40000 ALTER TABLE `customer_lead` DISABLE KEYS */;
INSERT INTO `customer_lead` VALUES (6,'2026-07-09 06:29:20.000000','2026-07-09 06:29:20.000000','Bhubaneswar','9876500001','Bhubaneswar','Rohan Das','Interested in Java Full Stack','rohan@gmail.com','Website','9876543211','2026-07-15','HOT','Java Full Stack Course','INTERESTED','2026-07-12',2,10),(7,'2026-07-09 06:29:20.000000','2026-07-09 06:29:20.000000','Cuttack','9876500002','Cuttack','Ananya Mishra','Needs Admission Details','ananya@gmail.com','Facebook','9876543212','2026-07-16','WARM','School Admission','NEW','2026-07-13',2,2),(8,'2026-07-09 06:29:20.000000','2026-07-09 06:29:20.000000','Puri','9876500003','Puri','Sourav Nayak','Requested Demo','sourav@gmail.com','Instagram','9876543213','2026-07-17','HOT','Website Development','FOLLOW_UP','2026-07-14',2,8),(9,'2026-07-09 06:29:20.000000','2026-07-09 06:29:20.000000','Rourkela','9876500004','Rourkela','Priyanka Das','Negotiation Going On','priyanka@gmail.com','Referral','9876543214','2026-07-18','WARM','Mobile App Development','NEGOTIATION','2026-07-15',2,9),(10,'2026-07-09 06:29:20.000000','2026-07-09 06:29:20.000000','Balasore','9876500005','Balasore','Abhishek Rout','Course Enquiry','abhishek@gmail.com','Google','9876543215','2026-07-20','COLD','Digital Marketing','CONTACTED','2026-07-16',2,7),(11,'2026-07-09 06:29:24.000000','2026-07-09 06:29:24.000000','Bhubaneswar','9876500001','Bhubaneswar','Rohan Das','Interested in Java Full Stack','rohan@gmail.com','Website','9876543211','2026-07-15','HOT','Java Full Stack Course','INTERESTED','2026-07-12',2,10),(12,'2026-07-09 06:29:24.000000','2026-07-09 06:29:24.000000','Cuttack','9876500002','Cuttack','Ananya Mishra','Needs Admission Details','ananya@gmail.com','Facebook','9876543212','2026-07-16','WARM','School Admission','NEW','2026-07-13',2,2),(13,'2026-07-09 06:29:24.000000','2026-07-09 06:29:24.000000','Puri','9876500003','Puri','Sourav Nayak','Requested Demo','sourav@gmail.com','Instagram','9876543213','2026-07-17','HOT','Website Development','FOLLOW_UP','2026-07-14',2,8),(14,'2026-07-09 06:29:24.000000','2026-07-09 06:29:24.000000','Rourkela','9876500004','Rourkela','Priyanka Das','Negotiation Going On','priyanka@gmail.com','Referral','9876543214','2026-07-18','WARM','Mobile App Development','NEGOTIATION','2026-07-15',2,9),(15,'2026-07-09 06:29:24.000000','2026-07-09 06:29:24.000000','Balasore','9876500005','Balasore','Abhishek Rout','Course Enquiry','abhishek@gmail.com','Google','9876543215','2026-07-20','COLD','Digital Marketing','CONTACTED','2026-07-16',2,7);
/*!40000 ALTER TABLE `customer_lead` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow_up`
--

DROP TABLE IF EXISTS `follow_up`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow_up` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `discussion` varchar(3000) DEFAULT NULL,
  `follow_up_date` date DEFAULT NULL,
  `next_follow_up_date` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `lead_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk55uhmuajqd823senbo1qu0l3` (`lead_id`),
  CONSTRAINT `FKk55uhmuajqd823senbo1qu0l3` FOREIGN KEY (`lead_id`) REFERENCES `customer_lead` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow_up`
--

LOCK TABLES `follow_up` WRITE;
/*!40000 ALTER TABLE `follow_up` DISABLE KEYS */;
INSERT INTO `follow_up` VALUES (1,'2026-07-09 06:30:38.000000','2026-07-09 06:30:38.000000','Explained course fees and syllabus.','2026-07-09','2026-07-15','FOLLOW_UP',6),(2,'2026-07-09 06:30:38.000000','2026-07-09 06:30:38.000000','Sent admission brochure by email.','2026-07-09','2026-07-16','CONTACTED',7),(3,'2026-07-09 06:30:38.000000','2026-07-09 06:30:38.000000','Requested callback tomorrow.','2026-07-09','2026-07-17','INTERESTED',8),(4,'2026-07-09 06:30:38.000000','2026-07-09 06:30:38.000000','Negotiating project budget.','2026-07-09','2026-07-18','NEGOTIATION',9),(5,'2026-07-09 06:30:38.000000','2026-07-09 06:30:38.000000','Waiting for customer confirmation.','2026-07-09','2026-07-20','CONTACTED',10),(6,'2026-07-09 06:30:38.000000','2026-07-09 06:30:38.000000','Customer will visit office next week.','2026-07-10','2026-07-21','VISIT_SCHEDULED',11),(7,'2026-07-09 06:30:38.000000','2026-07-09 06:30:38.000000','Interested in internship program.','2026-07-10','2026-07-22','INTERESTED',12),(8,'2026-07-09 06:30:38.000000','2026-07-09 06:30:38.000000','Requested final quotation.','2026-07-10','2026-07-23','FOLLOW_UP',13),(9,'2026-07-09 06:30:38.000000','2026-07-09 06:30:38.000000','Meeting scheduled with parents.','2026-07-10','2026-07-24','CONTACTED',14),(10,'2026-07-09 06:30:38.000000','2026-07-09 06:30:38.000000','Customer almost finalized.','2026-07-10','2026-07-25','CLOSED_WON',15);
/*!40000 ALTER TABLE `follow_up` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lead_type`
--

DROP TABLE IF EXISTS `lead_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lead_type` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK7r948g18gwe631p92cu0kiywd` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lead_type`
--

LOCK TABLES `lead_type` WRITE;
/*!40000 ALTER TABLE `lead_type` DISABLE KEYS */;
INSERT INTO `lead_type` VALUES (2,'2026-07-08 20:24:32.000000','2026-07-08 20:24:32.000000',_binary '','Leads for school admissions','School Admission'),(4,'2026-07-08 20:24:32.000000','2026-07-08 20:24:32.000000',_binary '','Corporate training enquiries','Corporate Training'),(5,'2026-07-08 20:24:32.000000','2026-07-08 20:24:32.000000',_binary '','Online course enquiries','Online Course'),(6,'2026-07-08 20:24:32.000000','2026-07-08 20:24:32.000000',_binary '','Software development enquiries','Software Development'),(7,'2026-07-08 20:24:32.000000','2026-07-08 20:24:32.000000',_binary '','Digital marketing service enquiries','Digital Marketing'),(8,'2026-07-08 20:24:32.000000','2026-07-08 20:24:32.000000',_binary '','Website development enquiries','Website Development'),(9,'2026-07-08 20:24:32.000000','2026-07-08 20:24:32.000000',_binary '','Mobile application enquiries','Mobile App Development'),(10,'2026-07-08 20:24:32.000000','2026-07-08 20:24:32.000000',_binary '','Internship programme enquiries','Internship'),(11,'2026-07-08 20:24:32.000000','2026-07-08 20:24:32.000000',_binary '','Placement assistance enquiries','Placement');
/*!40000 ALTER TABLE `lead_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `note` varchar(3000) DEFAULT NULL,
  `lead_id` bigint NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqdc9k2sfkt6n81ryxh62qpjjt` (`lead_id`),
  CONSTRAINT `FKqdc9k2sfkt6n81ryxh62qpjjt` FOREIGN KEY (`lead_id`) REFERENCES `customer_lead` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (6,'2026-07-09 06:30:49.000000','2026-07-09 06:30:49.000000','Customer is very interested in joining.',6,'Priority Lead'),(7,'2026-07-09 06:30:49.000000','2026-07-09 06:30:49.000000','Asked for scholarship details.',7,'Admission'),(8,'2026-07-09 06:30:49.000000','2026-07-09 06:30:49.000000','Needs detailed quotation.',8,'Website Project'),(9,'2026-07-09 06:30:49.000000','2026-07-09 06:30:49.000000','Budget discussion pending.',9,'Corporate'),(10,'2026-07-09 06:30:49.000000','2026-07-09 06:30:49.000000','Call after two days.',10,'Reminder'),(11,'2026-07-09 06:30:49.000000','2026-07-09 06:30:49.000000','Parents will visit campus.',11,'Visit'),(12,'2026-07-09 06:30:49.000000','2026-07-09 06:30:49.000000','Interested in internship.',12,'Internship'),(13,'2026-07-09 06:30:49.000000','2026-07-09 06:30:49.000000','Requested project demo.',13,'Demo'),(14,'2026-07-09 06:30:49.000000','2026-07-09 06:30:49.000000','Waiting for management approval.',14,'Approval'),(15,'2026-07-09 06:30:49.000000','2026-07-09 06:30:49.000000','Successfully converted.',15,'Closed Won');
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'2026-07-09 06:19:18.000000','2026-07-09 06:19:18.000000',_binary '','admin@crm.com','System Administrator','9876543210','admin123','ADMIN','admin'),(3,'2026-07-09 06:19:18.000000','2026-07-09 06:19:18.000000',_binary '','tushar@crm.com','SALES_EXECUTIVE','9123456780','rahul123','Tushar','rahul');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'customer_lead_crm'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-09 18:39:25
