-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: skripsiku
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.21.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `abstract_submission_approval_details`
--

DROP TABLE IF EXISTS `abstract_submission_approval_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abstract_submission_approval_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `status` int NOT NULL,
  `lecturer_id` int NOT NULL,
  `abstract_submission_approval_id` int NOT NULL,
  `remarks` text,
  PRIMARY KEY (`id`),
  KEY `FK_be7f8ad56cc9322b511e44fa36d` (`lecturer_id`),
  KEY `FK_6f7530cbed22190728b86a080d0` (`abstract_submission_approval_id`),
  CONSTRAINT `FK_6f7530cbed22190728b86a080d0` FOREIGN KEY (`abstract_submission_approval_id`) REFERENCES `abstract_submission_approvals` (`id`),
  CONSTRAINT `FK_be7f8ad56cc9322b511e44fa36d` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abstract_submission_approval_details`
--

LOCK TABLES `abstract_submission_approval_details` WRITE;
/*!40000 ALTER TABLE `abstract_submission_approval_details` DISABLE KEYS */;
INSERT INTO `abstract_submission_approval_details` VALUES (37,'2022-04-30 10:24:46.539786','2022-04-30 13:07:52.000000',1,1,18,'judul bisa diterima');
/*!40000 ALTER TABLE `abstract_submission_approval_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `abstract_submission_approvals`
--

DROP TABLE IF EXISTS `abstract_submission_approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abstract_submission_approvals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `status` int NOT NULL,
  `abstract_submission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f352a8886d726e7211967170d23` (`abstract_submission_id`),
  CONSTRAINT `FK_f352a8886d726e7211967170d23` FOREIGN KEY (`abstract_submission_id`) REFERENCES `abstract_submissions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abstract_submission_approvals`
--

LOCK TABLES `abstract_submission_approvals` WRITE;
/*!40000 ALTER TABLE `abstract_submission_approvals` DISABLE KEYS */;
INSERT INTO `abstract_submission_approvals` VALUES (18,'2022-04-30 10:24:46.196618','2022-04-30 13:07:52.000000',1,20);
/*!40000 ALTER TABLE `abstract_submission_approvals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `abstract_submissions`
--

DROP TABLE IF EXISTS `abstract_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abstract_submissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `title` varchar(255) NOT NULL,
  `status` int NOT NULL,
  `sequence` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `attachment` int DEFAULT NULL,
  `submission_period_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_e8a0284e69854693ab8f224547` (`attachment`),
  KEY `FK_29095e74c900a5868626470ce58` (`user_id`),
  KEY `FK_e6e10bd4e8132d9317eb3f65d26` (`submission_period_id`),
  CONSTRAINT `FK_29095e74c900a5868626470ce58` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_e6e10bd4e8132d9317eb3f65d26` FOREIGN KEY (`submission_period_id`) REFERENCES `submission_periods` (`id`),
  CONSTRAINT `FK_e8a0284e69854693ab8f2245470` FOREIGN KEY (`attachment`) REFERENCES `attachments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abstract_submissions`
--

LOCK TABLES `abstract_submissions` WRITE;
/*!40000 ALTER TABLE `abstract_submissions` DISABLE KEYS */;
INSERT INTO `abstract_submissions` VALUES (20,'2022-04-30 10:24:46.042226','2022-04-30 13:07:52.000000','RANCANG BANGUN SISTEM INFORMASI TUGAS AKHIR DENGAN METODE RESTFUL API BERBASIS WEB DI FALKUTAS KOMPUTER DI UNIVERSITAS UNIVERSAL',1,1,2,41,3);
/*!40000 ALTER TABLE `abstract_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `title` varchar(255) NOT NULL,
  `attachment` int DEFAULT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_441ddc3a9a093b8046bafa3f04` (`attachment`),
  CONSTRAINT `FK_441ddc3a9a093b8046bafa3f040` FOREIGN KEY (`attachment`) REFERENCES `attachments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attachments`
--

DROP TABLE IF EXISTS `attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attachments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `file_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachments`
--

LOCK TABLES `attachments` WRITE;
/*!40000 ALTER TABLE `attachments` DISABLE KEYS */;
INSERT INTO `attachments` VALUES (4,'2022-03-22 21:38:58.149971','2022-03-22 21:38:58.149971','57-File Utama Naskah-202-1-10-20170124-204a5a95-9fa1-4e33-8b94-df1330ecefd2.pdf'),(5,'2022-03-28 18:38:19.335424','2022-03-28 18:38:19.335424','65+ JavaScript Code Snippets - With Explanations-2224b341-0e22-4f9a-8743-5c187ab6a29e.pdf'),(6,'2022-03-28 18:40:41.941410','2022-03-28 18:40:41.941410','65+ JavaScript Code Snippets - With Explanations-6e379e4a-e6bc-48ee-babe-870f98e0693b.pdf'),(11,'2022-04-07 19:08:14.371424','2022-04-07 19:08:14.371424','601725-park-hyung-sik-fee17f50-8754-40ac-b536-e570d95f59e6.jpg'),(12,'2022-04-17 20:06:07.662381','2022-04-17 20:06:07.662381','KARTU_0001475318935-f1b00735-5ef3-47b0-902a-3e5bc4ada66b.pdf'),(15,'2022-04-18 21:17:00.399614','2022-04-18 21:17:00.399614','65+ JavaScript Code Snippets - With Explanations-8bb53cd3-9545-48a5-b1ae-8815ca7092e8.pdf'),(16,'2022-04-18 21:17:27.709009','2022-04-18 21:17:27.709009','KARTU_0001475318935-62538ad6-63ad-4cad-8513-5a124010413b.pdf'),(17,'2022-04-18 21:19:22.295459','2022-04-18 21:19:22.295459','KARTU_0001475318935-62538ad6-63ad-4cad-8513-5a124010413b.pdf'),(18,'2022-04-18 21:22:11.636862','2022-04-18 21:22:11.636862','KARTU_0001475318935-62538ad6-63ad-4cad-8513-5a124010413b.pdf'),(20,'2022-04-18 21:24:37.005295','2022-04-18 21:24:37.005295','KARTU_0001475318935-29f50b19-b530-4d3f-af8d-3a0275dc2d02.pdf'),(21,'2022-04-18 21:29:36.569679','2022-04-18 21:29:36.569679','KARTU_0001475318935-29f50b19-b530-4d3f-af8d-3a0275dc2d02.pdf'),(22,'2022-04-18 21:32:35.921086','2022-04-18 21:32:35.921086','KARTU_0001475318935-29f50b19-b530-4d3f-af8d-3a0275dc2d02.pdf'),(23,'2022-04-18 21:34:56.125893','2022-04-18 21:34:56.125893','KARTU_0001475318935-da7e853c-ef54-4ad0-b427-84a26a2f1513.pdf'),(26,'2022-04-18 21:38:05.225633','2022-04-18 21:38:05.225633','KARTU_0001475318935-0e0b0233-85d3-4122-bed0-772f872b9d8a.pdf'),(30,'2022-04-18 22:05:49.289486','2022-04-18 22:05:49.289486','KARTU_0001475318935-ca4de9f1-4650-4df4-8c2f-fb3a1f30fe8d.pdf'),(32,'2022-04-19 05:10:31.996906','2022-04-19 05:10:31.996906','KARTU_0001475318935-e391e5d6-e0f4-4bd7-bc7f-7433b34387ae.pdf'),(34,'2022-04-19 05:12:50.664242','2022-04-19 05:12:50.664242','KARTU_0001475318935-70faf1a2-9651-434c-8116-c8f69f80b30a.pdf'),(35,'2022-04-22 08:30:02.673512','2022-04-22 08:30:02.673512','6214979992716051919 1_waifu2x_photo_noise3_scale_tta_1-7f5f457b-ad13-490a-96d1-7c1482e7f280.png'),(36,'2022-04-23 14:57:31.987133','2022-04-23 14:57:31.987133','Kim_Da-Mi-P1-5bd4bd89-5dcb-4a65-af2e-0326ef0687b4.jpg'),(37,'2022-04-30 08:38:50.460262','2022-04-30 08:38:50.460262','65+ JavaScript Code Snippets - With Explanations-532d92d8-4d50-4a1e-977d-76b4852228b3.pdf'),(38,'2022-04-30 10:22:25.039386','2022-04-30 10:22:25.039386','65+ JavaScript Code Snippets - With Explanations-16a6de65-f9b6-4aed-bc7e-ef0d4e91d4fe.pdf'),(39,'2022-04-30 10:22:25.972399','2022-04-30 10:22:25.972399','65+ JavaScript Code Snippets - With Explanations-16a6de65-f9b6-4aed-bc7e-ef0d4e91d4fe.pdf'),(40,'2022-04-30 10:22:26.689405','2022-04-30 10:22:26.689405','65+ JavaScript Code Snippets - With Explanations-16a6de65-f9b6-4aed-bc7e-ef0d4e91d4fe.pdf'),(41,'2022-04-30 10:24:45.882740','2022-04-30 10:24:45.882740','65+ JavaScript Code Snippets - With Explanations-f6b3948a-42be-4228-9896-48aec2e483e0.pdf'),(42,'2022-05-02 08:48:39.809938','2022-05-02 08:48:39.809938','65+ JavaScript Code Snippets - With Explanations-e36188fd-d204-4fcb-a80a-a9cc8c89053c.pdf'),(43,'2022-05-08 07:13:09.583153','2022-05-08 07:13:09.583153','Hendra_tugasakhir-07f80588-15e9-4439-9f91-835d187cfcde'),(44,'2022-05-08 08:23:45.550533','2022-05-08 08:23:45.550533','Hendra_tugasakhir-eb473291-1b7f-4be7-bacf-974d8314299a'),(45,'2022-05-15 09:13:27.595257','2022-05-15 09:13:27.595257','Hendra_tugasakhir-2a2817c1-86c0-4e06-a8e6-b7140ee2bd3d'),(46,'2022-05-15 09:22:29.474945','2022-05-15 09:22:29.474945','Hendra_tugasakhir-91c98e9b-3fd0-4a2f-954e-52a159ec1b30'),(47,'2022-05-15 09:34:48.724828','2022-05-15 09:34:48.724828','Hendra_tugasakhir-60b67076-6e12-4ddc-ac13-2e594135ae51'),(49,'2022-05-16 16:13:53.863273','2022-05-16 16:13:53.863273','65+ JavaScript Code Snippets - With Explanations-5c6e6a4b-8680-40eb-a540-087bd7fae0f2.pdf'),(50,'2022-05-16 16:14:51.349990','2022-05-16 16:14:51.349990','Hendra_tugasakhir-c10b1a85-f03f-4aba-927e-5f978ff423a9'),(51,'2022-05-17 14:39:30.041230','2022-05-17 14:39:30.041230','Hendra_tugasakhir-d02ee527-0da1-4722-9b3b-f490a8d8af06'),(52,'2022-05-17 14:39:37.065570','2022-05-17 14:39:37.065570','Hendra_tugasakhir-d02ee527-0da1-4722-9b3b-f490a8d8af06'),(53,'2022-05-17 14:40:17.660580','2022-05-17 14:40:17.660580','Hendra_tugasakhir-dc00ddc1-57a9-4e6b-b7e4-ccaaa4391905'),(55,'2022-05-17 14:40:49.952537','2022-05-17 14:40:49.952537','65+ JavaScript Code Snippets - With Explanations-c4839b25-6180-45e1-9529-1b6dd2e26f85.pdf'),(56,'2022-05-18 16:20:51.990263','2022-05-18 16:20:51.990263','Hendra_tugasakhir-2a505c73-8832-43f8-8d8f-4627a4a1af3c');
/*!40000 ALTER TABLE `attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_ofs`
--

DROP TABLE IF EXISTS `class_ofs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_ofs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_ofs`
--

LOCK TABLES `class_ofs` WRITE;
/*!40000 ALTER TABLE `class_ofs` DISABLE KEYS */;
INSERT INTO `class_ofs` VALUES (1,'2022-04-22 07:49:37.353384','2022-04-22 07:49:37.353384','134816','2018/2022');
/*!40000 ALTER TABLE `class_ofs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `note` varchar(255) NOT NULL,
  `sender` int NOT NULL,
  `attachment` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `lecturer_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_61b705e97f03cb428ad727922c` (`attachment`),
  KEY `FK_4c675567d2a58f0b07cef09c13d` (`user_id`),
  KEY `FK_8fecb997e12799d3925f10ce530` (`lecturer_id`),
  CONSTRAINT `FK_4c675567d2a58f0b07cef09c13d` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_61b705e97f03cb428ad727922cc` FOREIGN KEY (`attachment`) REFERENCES `attachments` (`id`),
  CONSTRAINT `FK_8fecb997e12799d3925f10ce530` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'2022-03-22 20:39:28.015000','2022-03-22 20:39:28.015000','note',1,NULL,2,1),(2,'2022-03-22 21:38:58.160326','2022-03-22 21:38:58.160326','tolong dibimbing',1,4,2,1),(3,'2022-03-22 21:46:27.372875','2022-03-22 21:46:27.372875','ok hendra',0,NULL,2,1),(4,'2022-03-26 16:02:10.276613','2022-03-26 16:02:10.276613','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',0,NULL,2,1),(5,'2022-03-28 18:40:41.955143','2022-03-28 18:40:41.955143','testing',1,6,2,1),(6,'2022-05-15 09:48:27.235718','2022-05-15 09:48:27.235718','halo',1,NULL,9,1);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erepositories`
--

DROP TABLE IF EXISTS `erepositories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `erepositories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `status` int NOT NULL,
  `attachment` int DEFAULT NULL,
  `publisher` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `major` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_62f945a7c2f0cce3459595bd30` (`attachment`),
  KEY `FK_47adf1b3ff67e2027259c1a3fdc` (`major`),
  CONSTRAINT `FK_47adf1b3ff67e2027259c1a3fdc` FOREIGN KEY (`major`) REFERENCES `majors` (`id`),
  CONSTRAINT `FK_62f945a7c2f0cce3459595bd30f` FOREIGN KEY (`attachment`) REFERENCES `attachments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erepositories`
--

LOCK TABLES `erepositories` WRITE;
/*!40000 ALTER TABLE `erepositories` DISABLE KEYS */;
INSERT INTO `erepositories` VALUES (5,'2022-05-16 10:53:49.585072','2022-05-17 14:40:50.000000','RANCANG BANGUN SISTEM INFORMASI 1213123',2022,1,55,'hendra','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',1),(6,'2022-05-16 10:54:00.299256','2022-05-16 15:24:25.000000','RANCANG BANGUN SISTEM INFORMASI 2',2022,2,NULL,'hendra','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(7,'2022-05-16 10:54:24.075324','2022-05-16 10:54:24.075324','RANCANG BANGUN SISTEM INFORMASI 2',2022,0,NULL,'hendra','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(8,'2022-05-16 11:12:24.274869','2022-05-16 11:12:24.274869','RANCANG BANGUN SISTEM INFORMASI 4',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(9,'2022-05-16 11:12:27.715820','2022-05-16 11:12:27.715820','RANCANG BANGUN SISTEM INFORMASI 5',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(10,'2022-05-16 11:12:34.706156','2022-05-16 11:12:34.706156','RANCANG BANGUN SISTEM INFORMASI 6',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(11,'2022-05-16 11:12:41.616648','2022-05-16 11:12:41.616648','RANCANG BANGUN SISTEM INFORMASI 7',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(12,'2022-05-16 11:12:46.930283','2022-05-16 11:12:46.930283','RANCANG BANGUN SISTEM INFORMASI 8',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(13,'2022-05-16 11:12:53.992973','2022-05-16 11:12:53.992973','RANCANG BANGUN SISTEM INFORMASI 9',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(14,'2022-05-16 11:12:58.119576','2022-05-16 11:12:58.119576','RANCANG BANGUN SISTEM INFORMASI 10',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(15,'2022-05-16 11:13:01.246083','2022-05-16 11:13:01.246083','RANCANG BANGUN SISTEM INFORMASI 11',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(16,'2022-05-16 11:13:05.867272','2022-05-16 11:13:05.867272','RANCANG BANGUN SISTEM INFORMASI 12',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(17,'2022-05-16 11:13:08.165181','2022-05-16 11:13:08.165181','RANCANG BANGUN SISTEM INFORMASI 13',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(18,'2022-05-16 11:13:12.433010','2022-05-16 11:13:12.433010','RANCANG BANGUN SISTEM INFORMASI 14',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(19,'2022-05-16 11:13:15.252269','2022-05-16 11:13:15.252269','RANCANG BANGUN SISTEM INFORMASI 15',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(20,'2022-05-16 11:13:18.239414','2022-05-16 11:13:18.239414','RANCANG BANGUN SISTEM INFORMASI 16',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(21,'2022-05-16 11:13:24.427890','2022-05-16 11:13:24.427890','RANCANG BANGUN SISTEM INFORMASI 17',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(22,'2022-05-16 11:13:28.461130','2022-05-16 11:13:28.461130','RANCANG BANGUN SISTEM INFORMASI 18',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(23,'2022-05-16 11:13:33.573893','2022-05-16 11:13:33.573893','RANCANG BANGUN SISTEM INFORMASI 20',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(24,'2022-05-16 11:13:36.669793','2022-05-16 11:13:36.669793','RANCANG BANGUN SISTEM INFORMASI 21',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(25,'2022-05-16 11:13:40.370353','2022-05-16 11:13:40.370353','RANCANG BANGUN SISTEM INFORMASI 22',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(26,'2022-05-16 11:13:43.258569','2022-05-16 11:13:43.258569','RANCANG BANGUN SISTEM INFORMASI 23',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(27,'2022-05-16 11:13:45.019574','2022-05-16 11:13:45.019574','RANCANG BANGUN SISTEM INFORMASI 24',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(28,'2022-05-16 11:13:46.788794','2022-05-16 11:13:46.788794','RANCANG BANGUN SISTEM INFORMASI 25',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(29,'2022-05-16 11:13:49.941436','2022-05-16 11:13:49.941436','RANCANG BANGUN SISTEM INFORMASI 26',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(30,'2022-05-16 11:14:24.099282','2022-05-16 11:14:24.099282','RANCANG BANGUN SISTEM INFORMASI 27',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(31,'2022-05-16 11:14:26.798201','2022-05-16 11:14:26.798201','RANCANG BANGUN SISTEM INFORMASI 28',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(32,'2022-05-16 11:14:29.374653','2022-05-16 11:14:29.374653','RANCANG BANGUN SISTEM INFORMASI 29',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(33,'2022-05-16 11:14:34.738829','2022-05-16 11:14:34.738829','RANCANG BANGUN SISTEM INFORMASI 30',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(34,'2022-05-16 11:14:38.241831','2022-05-16 11:14:38.241831','RANCANG BANGUN SISTEM INFORMASI 31',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(35,'2022-05-16 11:14:40.901800','2022-05-16 11:14:40.901800','RANCANG BANGUN SISTEM INFORMASI 32',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',NULL),(36,'2022-05-16 11:15:43.257674','2022-05-16 11:15:43.257674','RANCANG BANGUN SISTEM INFORMASI 33',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',1),(37,'2022-05-16 11:16:29.171138','2022-05-16 11:16:29.171138','RANCANG BANGUN SISTEM INFORMASI 34',2019,1,NULL,'gunawan','Dalam undang – undang nomor 12 tahun 2012, menjelaskan bahwa untuk menghasilkan kuantitas dan kualitas publikasi karya ilmiah mahasiswa jenjang pendidikan program sarjana untuk lulusan program sarjana dan program sarjana terapan ialah menyusun skripsi atau laporan tugas akhir dan mengunggahnya ke Repositori. Perguruan tinggi yang diintegrasikan di portal Repositori Tugas Akhir Mahasiswa Kemenristekdikti (rama.ristekdikti.go.id) kecuali apabila dipublikasikan di jurnal. Peraturan akademik Universitas Universal menjelaskan bahwa mahasiswa wajib menyelesaikan tugas akhir sebagai persyaratan kelulusan, dan tugas akhir akan dinilai oleh tim penguji yang dibentuk fakultas komputer di Universitas Universal',5),(38,'2022-05-16 16:11:17.573094','2022-05-16 16:11:17.573094','test',2019,1,NULL,'hendra','test',1),(39,'2022-05-16 16:13:54.094144','2022-05-16 16:13:54.094144','Leadership',123123,1,49,'hendra','asdasd',4),(40,'2022-05-16 16:14:51.580491','2022-05-16 16:14:51.580491','Template Testing 3',2019,0,50,'hendra','asdasdas',4),(41,'2022-05-17 14:38:37.337341','2022-05-17 14:38:37.337341','444',2022,1,NULL,'444','444',1),(42,'2022-05-17 14:39:30.272741','2022-05-17 14:39:30.272741','444',2022,1,51,'444','444',1),(43,'2022-05-17 14:39:37.258373','2022-05-17 14:39:37.258373','444',2022,1,52,'444','444',1),(44,'2022-05-17 14:40:17.985898','2022-05-17 14:40:17.985898','Assessment Junior UI/UX',2019,1,53,'hendra','asdasd',1);
/*!40000 ALTER TABLE `erepositories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecturers`
--

DROP TABLE IF EXISTS `lecturers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecturers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `registration_number` varchar(255) NOT NULL,
  `gender` int NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthdate` datetime NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `role` int NOT NULL,
  `major` int DEFAULT NULL,
  `profile_picture` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_3bf0b8dac54e0e07b5c3078f52` (`email`),
  UNIQUE KEY `IDX_4fee1f8d7abdd337f34021a480` (`registration_number`),
  UNIQUE KEY `REL_93a5586a540352e3c3719840d7` (`profile_picture`),
  KEY `FK_b90ea54b4b1c6437889fc84b930` (`major`),
  CONSTRAINT `FK_93a5586a540352e3c3719840d7f` FOREIGN KEY (`profile_picture`) REFERENCES `attachments` (`id`),
  CONSTRAINT `FK_b90ea54b4b1c6437889fc84b930` FOREIGN KEY (`major`) REFERENCES `majors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturers`
--

LOCK TABLES `lecturers` WRITE;
/*!40000 ALTER TABLE `lecturers` DISABLE KEYS */;
INSERT INTO `lecturers` VALUES (1,'2022-03-03 20:29:20.705373','2022-04-22 07:50:44.000000','Holong Marisi Simalango ','A.Md., S.T., M.Kom.','holongsimalongo@gmail.com','44792765187',0,'$2b$10$iPpTjDjWPTj1q2dB9jHtwePef4iq4PPeuOaVyjQ183PnLtOibo2Ei','1999-12-31 07:00:00','09726255523',30,4,11),(2,'2022-03-05 15:49:48.701102','2022-04-22 07:51:41.000000','Akhmad Rezki Purnajaya,',' S.Kom, M.Kom.','AkhmadRezki@gmail.com','67841322065',0,'$2b$10$PM62evWXyChUv/lfPwUo0OivCl4QeUMbe0TtH5yFYuzhmtQnF5gCq','2022-03-01 15:49:17','0123717371237',50,4,NULL),(3,'2022-03-08 21:42:25.043399','2022-04-22 07:53:38.000000','Yonky Pernando, ','S.Kom., M.Kom','YonkyPernando@gmail.com','44792765872',0,'$2b$10$BgUvrjOzJV.GwdCWFJposegIZfnD67DYak1HQBVewK/l1bje/.rie','1995-03-08 00:00:00','345345345345345',50,1,NULL),(4,'2022-04-22 07:53:32.438781','2022-04-22 07:53:32.438781','Oey Anton, ','S.TP., M.Pd.','Oeyanto@gmail.com','4479278263',0,'$2b$10$7RATRIbmi3KXNcGWRbyKFO2dUVVUtX7IMX4ptvJ.QyxxxRp25pfaK','2022-04-21 07:53:04','08265323123',30,1,NULL);
/*!40000 ALTER TABLE `lecturers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `majors`
--

DROP TABLE IF EXISTS `majors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `majors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `majors`
--

LOCK TABLES `majors` WRITE;
/*!40000 ALTER TABLE `majors` DISABLE KEYS */;
INSERT INTO `majors` VALUES (1,'2022-03-03 20:23:25.816245','2022-03-24 22:33:21.000000','TIF','Teknik Informatika'),(4,'2022-03-03 20:23:25.844645','2022-03-24 22:34:51.000000','TPL','Teknik Perangkat Lunak'),(5,'2022-03-03 20:23:25.851181','2022-03-24 22:34:43.000000','SI','Sistem Informasi');
/*!40000 ALTER TABLE `majors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1646304952045,'initialMigration1646304952045'),(2,1646456378792,'addPublisherColumnToErepositoryEntity1646456378792'),(3,1646483237968,'updateLecturerEntity1646483237968'),(4,1646485757712,'addCommentEntity1646485757712'),(5,1646563752649,'addProfilePictureColumnToUserEntity1646563752649'),(6,1646566565830,'addProfilePictureColumnToLecturerEntity1646566565830'),(7,1647679470130,'addSubmissionPeriodEntity1647679470130'),(8,1647679620074,'setSubmissionPeriodMajorFieldToNotNullable1647679620074'),(9,1647741944842,'updateSubmissionEntity1647741944842'),(10,1647747229698,'updateSubmissionAttachmentEntity1647747229698'),(11,1647760509110,'updateSubmissionEntity1647760509110'),(12,1647762460378,'addSubmissionApprovalDetailEntity1647762460378'),(13,1647871102488,'fixUserEntity1647871102488'),(14,1648466227784,'addAbstractSubmissionEntity1648466227784'),(15,1648471108726,'addedAbstractSubmissionApprovalDetailsEntity1648471108726'),(16,1648566391045,'updateAbstractSubmissionApprovalDetailEntity1648566391045'),(17,1648639223516,'addAbstractSubmissionApprovalEntity1648639223516'),(18,1648640034031,'removedRelationFromAbstractSubmissionToAbstractSubmissionApprovalDetail1648640034031'),(19,1648641451350,'updateEntities1648641451350'),(20,1648822958559,'removeIsHeadOfStudyColumnFromLecturerEntity1648822958559'),(21,1648825290650,'addedClassOfEntity1648825290650'),(22,1648881243774,'updateUserEntity1648881243774'),(23,1648881473415,'updateAbstractSubmissionEntity1648881473415'),(24,1648881724000,'updateUserEntity1648881724000'),(25,1648882865637,'updateAbstractSubmissionEntity1648882865637'),(26,1648884540875,'updateUserEntity1648884540875'),(27,1648885828431,'updateUserEntity1648885828431'),(28,1648887506078,'addClassOfColumnToSubmissionPeriodEntity1648887506078'),(29,1648971668959,'setSequenceColumnToNullableInAbstractSubmissionEntity1648971668959'),(30,1649075804923,'addUserAbstractApproverEntity1649075804923'),(31,1649077329532,'setUserEntityLastNameColumnToNullable1649077329532'),(32,1649077521288,'addDescriptionColumnToEntitySubmissionPeriod1649077521288'),(33,1650008740904,'updateSubmissionEntity1650008740904'),(34,1650010903089,'updateSubmissionAttachmentEntity1650010903089'),(35,1650013962593,'updateSubmissionAttachmentEntity1650013962593'),(36,1650118231125,'addedSubmissionAttachmentApproverEntity1650118231125'),(37,1650181147199,'updatedSubmissionApprovalDetailEntity1650181147199'),(38,1650183298021,'setRemarksNullableForSubmissionAttachmentEntity1650183298021'),(39,1650199590239,'addedAnnouncementEntity1650199590239'),(40,1650290500072,'updateAnnouncementEntity1650290500072'),(41,1650463228046,'updateDescriptionColumnLengthInErepositoryEntity1650463228046'),(42,1650463713144,'changeVarcharLengthOfDescriptionForErepositoryEntity1650463713144'),(43,1650463952184,'updateErepositoryEntity1650463952184'),(44,1650464248379,'updateAnnouncementEntity1650464248379'),(45,1650464472221,'updateAbstractSubmissionApprovalDetailEntity1650464472221'),(46,1651311536618,'addedEndTimeColumnToSubmissionAttachmentEntity1651311536618'),(47,1652692197028,'addedMajorColumnForErepositoryColumn1652692197028'),(48,1652693204826,'removeUserColumnFromErepositoryEntity1652693204826'),(49,1652698062027,'addedStatusColumnToSubmissionPeriodEntity1652698062027');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stages`
--

DROP TABLE IF EXISTS `stages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stages`
--

LOCK TABLES `stages` WRITE;
/*!40000 ALTER TABLE `stages` DISABLE KEYS */;
INSERT INTO `stages` VALUES (1,'2022-03-03 20:23:25.846908','2022-03-03 20:23:25.846908','PROPOSAL','Proposal'),(2,'2022-03-03 20:23:25.848466','2022-03-03 20:23:25.848466','SEMINAR','Seminar'),(3,'2022-03-03 20:23:25.850070','2022-03-03 20:23:25.850070','FINAL_TEST','Final_Test');
/*!40000 ALTER TABLE `stages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submission_approval_details`
--

DROP TABLE IF EXISTS `submission_approval_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submission_approval_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `status` int NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `lecturer_id` int NOT NULL,
  `submission_approval_id` int NOT NULL,
  `score_content` int DEFAULT '0',
  `score_content_delivery` int DEFAULT '0',
  `score_content_mastery` int DEFAULT '0',
  `score_average` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_f00a161c4388dfaa8c520fa3d6b` (`lecturer_id`),
  KEY `FK_5f51bec2e93ddfa8748ec9c8d88` (`submission_approval_id`),
  CONSTRAINT `FK_5f51bec2e93ddfa8748ec9c8d88` FOREIGN KEY (`submission_approval_id`) REFERENCES `submission_approvals` (`id`),
  CONSTRAINT `FK_f00a161c4388dfaa8c520fa3d6b` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission_approval_details`
--

LOCK TABLES `submission_approval_details` WRITE;
/*!40000 ALTER TABLE `submission_approval_details` DISABLE KEYS */;
INSERT INTO `submission_approval_details` VALUES (22,'2022-05-15 09:11:16.550832','2022-05-15 09:14:03.000000',1,'bagus',1,12,60,79,79,73),(23,'2022-05-15 09:11:17.165101','2022-05-15 09:20:04.000000',1,'cukup',2,12,60,60,79,66),(24,'2022-05-15 09:11:18.097610','2022-05-15 09:20:39.000000',1,'good',3,12,80,70,80,77),(25,'2022-05-15 09:21:39.209161','2022-05-15 09:22:48.000000',1,'bagus',1,13,80,80,80,80),(26,'2022-05-15 09:21:41.804477','2022-05-15 09:26:10.000000',1,'tsahh',2,13,80,80,80,80),(27,'2022-05-15 09:21:42.348874','2022-05-15 09:26:39.000000',1,'lohh',3,13,80,80,80,80),(28,'2022-05-15 09:34:29.926542','2022-05-15 09:40:31.000000',2,'tolong direvisi kembali',1,14,0,0,0,0),(29,'2022-05-15 09:34:31.724849','2022-05-15 09:45:36.000000',2,'revisi tolong diulang',2,14,0,0,0,0),(30,'2022-05-15 09:34:32.177875','2022-05-15 09:46:04.000000',2,'revisi lagi',3,14,0,0,0,0),(31,'2022-05-16 13:47:30.043008','2022-05-16 13:47:30.043008',0,NULL,1,15,0,0,0,0),(32,'2022-05-16 13:47:30.799572','2022-05-16 13:47:30.799572',0,NULL,2,15,0,0,0,0),(33,'2022-05-16 13:47:31.372075','2022-05-16 13:47:31.372075',0,NULL,3,15,0,0,0,0);
/*!40000 ALTER TABLE `submission_approval_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submission_approvals`
--

DROP TABLE IF EXISTS `submission_approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submission_approvals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `status` int NOT NULL,
  `submission_attachment_id` int NOT NULL,
  `stage` int NOT NULL,
  `average_score` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_22e675d6dc82881e9aaa838681d` (`submission_attachment_id`),
  CONSTRAINT `FK_22e675d6dc82881e9aaa838681d` FOREIGN KEY (`submission_attachment_id`) REFERENCES `submission_attachments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission_approvals`
--

LOCK TABLES `submission_approvals` WRITE;
/*!40000 ALTER TABLE `submission_approvals` DISABLE KEYS */;
INSERT INTO `submission_approvals` VALUES (12,'2022-05-15 09:11:15.674665','2022-05-15 09:20:40.000000',1,20,1,72),(13,'2022-05-15 09:21:38.552151','2022-05-15 09:26:40.000000',1,21,2,80),(14,'2022-05-15 09:34:27.958829','2022-05-15 09:46:04.000000',2,23,1,0),(15,'2022-05-16 13:47:29.534471','2022-05-16 13:47:29.534471',0,24,1,0);
/*!40000 ALTER TABLE `submission_approvals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submission_attachment_approvers`
--

DROP TABLE IF EXISTS `submission_attachment_approvers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submission_attachment_approvers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `level` int DEFAULT NULL,
  `lecturer_id` int NOT NULL,
  `user_id` int NOT NULL,
  `submission_attachment_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4465e2482b1858e608c073a3ec1` (`lecturer_id`),
  KEY `FK_ae2c917c563d245ba9c4f511e23` (`user_id`),
  KEY `FK_570789daa19012d7b2acad89d02` (`submission_attachment_id`),
  CONSTRAINT `FK_4465e2482b1858e608c073a3ec1` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`),
  CONSTRAINT `FK_570789daa19012d7b2acad89d02` FOREIGN KEY (`submission_attachment_id`) REFERENCES `submission_attachments` (`id`),
  CONSTRAINT `FK_ae2c917c563d245ba9c4f511e23` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission_attachment_approvers`
--

LOCK TABLES `submission_attachment_approvers` WRITE;
/*!40000 ALTER TABLE `submission_attachment_approvers` DISABLE KEYS */;
INSERT INTO `submission_attachment_approvers` VALUES (35,'2022-05-15 09:11:15.982713','2022-05-15 09:11:15.982713',NULL,1,2,20),(36,'2022-05-15 09:11:16.853612','2022-05-15 09:11:16.853612',NULL,2,2,20),(37,'2022-05-15 09:11:17.828951','2022-05-15 09:11:17.828951',NULL,3,2,20),(38,'2022-05-15 09:21:38.898542','2022-05-15 09:21:38.898542',NULL,1,2,21),(39,'2022-05-15 09:21:40.252709','2022-05-15 09:21:40.252709',NULL,2,2,21),(40,'2022-05-15 09:21:42.152478','2022-05-15 09:21:42.152478',NULL,3,2,21),(41,'2022-05-15 09:34:28.220846','2022-05-15 09:34:28.220846',NULL,1,9,23),(42,'2022-05-15 09:34:31.276989','2022-05-15 09:34:31.276989',NULL,2,9,23),(43,'2022-05-15 09:34:31.970877','2022-05-15 09:34:31.970877',NULL,3,9,23),(44,'2022-05-16 13:47:29.831132','2022-05-16 13:47:29.831132',NULL,1,9,24),(45,'2022-05-16 13:47:30.536322','2022-05-16 13:47:30.536322',NULL,2,9,24),(46,'2022-05-16 13:47:31.120674','2022-05-16 13:47:31.120674',NULL,3,9,24);
/*!40000 ALTER TABLE `submission_attachment_approvers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submission_attachments`
--

DROP TABLE IF EXISTS `submission_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submission_attachments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `status` int NOT NULL,
  `stage` int NOT NULL,
  `submission_id` int NOT NULL,
  `date` datetime DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `attachment` int DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_99f57fa639a31654936b41af35` (`attachment`),
  KEY `FK_c8e2f4d25c94df199d258e1fb1e` (`submission_id`),
  CONSTRAINT `FK_99f57fa639a31654936b41af35d` FOREIGN KEY (`attachment`) REFERENCES `attachments` (`id`),
  CONSTRAINT `FK_c8e2f4d25c94df199d258e1fb1e` FOREIGN KEY (`submission_id`) REFERENCES `submissions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission_attachments`
--

LOCK TABLES `submission_attachments` WRITE;
/*!40000 ALTER TABLE `submission_attachments` DISABLE KEYS */;
INSERT INTO `submission_attachments` VALUES (19,'2022-05-15 08:59:00.600874','2022-05-15 08:59:00.600874',0,0,5,NULL,NULL,NULL,NULL,NULL),(20,'2022-05-15 09:11:15.443535','2022-05-15 09:20:40.000000',1,1,5,'2022-05-16 07:00:00','07:00','ruangan lantai 4 gedung B',45,'08:00'),(21,'2022-05-15 09:21:38.317350','2022-05-15 09:26:42.000000',1,2,5,'2022-05-15 07:00:00','08:00','ruangan lantai 4 gedung B',46,'09:00'),(22,'2022-05-15 09:33:13.089053','2022-05-15 09:33:13.089053',0,0,6,NULL,NULL,NULL,NULL,NULL),(23,'2022-05-15 09:34:27.671926','2022-05-16 13:45:46.000000',2,1,6,'2022-05-31 07:00:00','09:00','ruangan lantai 4 gedung C',47,'10:00'),(24,'2022-05-16 13:47:29.300334','2022-05-16 13:47:29.300334',0,1,6,'2022-05-30 07:00:00','09:54','ruangan lantai 4 gedung B',NULL,'11:00'),(25,'2022-05-18 15:48:46.880266','2022-05-18 16:20:52.000000',1,3,5,'2022-06-30 07:00:00',NULL,NULL,56,NULL);
/*!40000 ALTER TABLE `submission_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submission_periods`
--

DROP TABLE IF EXISTS `submission_periods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submission_periods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `major` int NOT NULL,
  `class_of` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1f120bcf03d9e18610098a9efb5` (`major`),
  CONSTRAINT `FK_1f120bcf03d9e18610098a9efb5` FOREIGN KEY (`major`) REFERENCES `majors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission_periods`
--

LOCK TABLES `submission_periods` WRITE;
/*!40000 ALTER TABLE `submission_periods` DISABLE KEYS */;
INSERT INTO `submission_periods` VALUES (3,'2022-04-22 07:58:07.954842','2022-04-22 07:58:07.954842','2022-04-22 07:57:49','2022-04-30 07:57:52',4,'2018/2022','tolong dikumpulkan bab 1 sementara sampai daftar pustaka sementara',0),(5,'2022-04-22 07:58:51.607796','2022-04-22 07:58:51.607796','2022-04-22 07:58:36','2022-04-30 07:58:39',1,'2018/2022','tolong kumpulkan abstract judul proposal ',0);
/*!40000 ALTER TABLE `submission_periods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissions`
--

DROP TABLE IF EXISTS `submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `status` int NOT NULL,
  `user_id` int NOT NULL,
  `stage` int NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_fca12c4ddd646dea4572c6815a9` (`user_id`),
  CONSTRAINT `FK_fca12c4ddd646dea4572c6815a9` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissions`
--

LOCK TABLES `submissions` WRITE;
/*!40000 ALTER TABLE `submissions` DISABLE KEYS */;
INSERT INTO `submissions` VALUES (5,'2022-05-15 08:58:59.653339','2022-05-15 08:58:59.653339',0,2,0,'RANCANG BANGUN SISTEM INFORMASI TUGAS AKHIR DENGAN METODE RESTFUL API BERBASIS WEB DI FALKUTAS KOMPUTER DI UNIVERSITAS UNIVERSAL'),(6,'2022-05-15 09:33:12.908817','2022-05-15 09:33:12.908817',0,9,0,'RANCANG BANGUN SISTEM INFORMASI TUGAS AKHIR DENGAN METODE RESTFUL API BERBASIS WEB DI FALKUTAS KOMPUTER DI UNIVERSITAS UNIVERSAL');
/*!40000 ALTER TABLE `submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temporary_attachments`
--

DROP TABLE IF EXISTS `temporary_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temporary_attachments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `file_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temporary_attachments`
--

LOCK TABLES `temporary_attachments` WRITE;
/*!40000 ALTER TABLE `temporary_attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `temporary_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_abstract_approvers`
--

DROP TABLE IF EXISTS `user_abstract_approvers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_abstract_approvers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `level` int DEFAULT NULL,
  `lecturer_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_82e571914bd3b77ba80a0026d68` (`lecturer_id`),
  KEY `FK_25aa840da1be54298de429413ce` (`user_id`),
  CONSTRAINT `FK_25aa840da1be54298de429413ce` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_82e571914bd3b77ba80a0026d68` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_abstract_approvers`
--

LOCK TABLES `user_abstract_approvers` WRITE;
/*!40000 ALTER TABLE `user_abstract_approvers` DISABLE KEYS */;
INSERT INTO `user_abstract_approvers` VALUES (8,'2022-04-22 07:50:00.670509','2022-04-22 07:50:00.670509',NULL,1,3),(9,'2022-04-22 07:55:57.458812','2022-04-22 07:55:57.458812',NULL,3,8),(10,'2022-04-22 07:56:20.514858','2022-04-22 07:56:20.514858',NULL,1,2),(11,'2022-04-22 07:57:17.792519','2022-04-22 07:57:17.792519',NULL,3,9);
/*!40000 ALTER TABLE `user_abstract_approvers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_approvers`
--

DROP TABLE IF EXISTS `user_approvers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_approvers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `level` int DEFAULT NULL,
  `approver_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f4a7e35e04214272c4df738b09a` (`approver_id`),
  KEY `FK_d2436ae24d79eaeab870d202d13` (`user_id`),
  CONSTRAINT `FK_d2436ae24d79eaeab870d202d13` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_f4a7e35e04214272c4df738b09a` FOREIGN KEY (`approver_id`) REFERENCES `lecturers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_approvers`
--

LOCK TABLES `user_approvers` WRITE;
/*!40000 ALTER TABLE `user_approvers` DISABLE KEYS */;
INSERT INTO `user_approvers` VALUES (2,'2022-03-03 20:34:21.331922','2022-03-03 20:34:21.331922',NULL,1,2),(4,'2022-03-05 15:26:49.313795','2022-03-05 15:26:49.313795',NULL,1,3);
/*!40000 ALTER TABLE `user_approvers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `registration_number` varchar(255) NOT NULL,
  `class_of` varchar(255) DEFAULT NULL,
  `gender` int NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthdate` datetime NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `role` int NOT NULL,
  `major` int DEFAULT NULL,
  `thesis_advisor_id_id` int DEFAULT NULL,
  `profile_picture` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  UNIQUE KEY `IDX_6913ec13149b6981edb6c8b4d7` (`registration_number`),
  UNIQUE KEY `REL_1585c628c43cc50dc1e061dc50` (`profile_picture`),
  KEY `FK_36140e591dbea83bac5b2f8fa7d` (`major`),
  KEY `FK_16903503d5c6b46bebb0b8a8de5` (`thesis_advisor_id_id`),
  CONSTRAINT `FK_1585c628c43cc50dc1e061dc504` FOREIGN KEY (`profile_picture`) REFERENCES `attachments` (`id`),
  CONSTRAINT `FK_16903503d5c6b46bebb0b8a8de5` FOREIGN KEY (`thesis_advisor_id_id`) REFERENCES `lecturers` (`id`),
  CONSTRAINT `FK_36140e591dbea83bac5b2f8fa7d` FOREIGN KEY (`major`) REFERENCES `majors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2022-03-03 20:23:25.944171','2022-03-24 22:30:54.000000','admin','admin','admin@gmail.com','admin',NULL,0,'$2b$10$EkDKO.e48y08yOwsHZADF.cY.JCgApEkE3fJ34ygY9Xa/Q7/4NsaK','2022-03-03 20:15:20','08117778899',10,NULL,NULL,NULL),(2,'2022-03-03 20:30:03.318519','2022-04-27 15:13:20.000000','hendra','gunawan','gunawan4041@gmail.com','2018133011','2018/2022',0,'$2b$10$SYP8uVaDiTEBZT6e2RYVou3.ZZJ2t7Fphfn9W0xRuwihW2R.4LpuG','2022-03-30 20:29:44','082662661123',20,4,1,36),(3,'2022-03-05 14:46:56.062887','2022-04-22 07:56:07.000000','Juli','Yanto','juliyanto@gmail.com','2018133012','2018/2022',0,'$2b$10$CUMbFqtlwiRKJeiNgmFPVeHplGSvDibouF1RoCusDaBvC8OF.ocK2','2022-03-06 14:46:26','085625252513',20,4,1,NULL),(4,'2022-03-23 22:41:33.586679','2022-03-24 22:52:28.000000','hendra','gunawan','gunawan423041@gmail.com','085363598719',NULL,0,'$2b$10$86cNDhpK7VJT1.f4Pb3DJeEQi3h.rFcikqIv5kgFhlSDCUwhHS3r2','2022-03-01 22:40:27','085363598719',40,NULL,NULL,NULL),(8,'2022-04-22 07:55:56.005123','2022-04-22 07:55:56.005123','Agus','Wandi','aguswandi@gmail.com','2018131034','2018/2022',0,'$2b$10$3iQiCFbwUW67kIyB9fvO9ONBJSaoRTJ6Z3lskA/T.JaTapX61n8gy','2022-04-11 07:55:38','0822612312',20,1,NULL,NULL),(9,'2022-04-22 07:57:17.453174','2022-05-15 09:33:06.000000','Fini','Charisa','fini@gmail.com','2018131036','2018/2022',1,'$2b$10$KMG3Zvi8frnMGkc3c1Ai/OgBaT.PsY5sT8PmVGZS9S7cnTRQ1Rpy6','2022-04-04 07:57:02','0827263123',20,4,1,35);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-23 15:37:28
