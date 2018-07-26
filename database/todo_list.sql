-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2018 at 11:13 AM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo_list`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `parentId` int(11) NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  `isCompleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `parentId`, `content`, `start`, `end`, `isCompleted`) VALUES
(1, 0, 'Tìm hiểu Node.js', '2018-07-26', '2018-08-01', 0),
(2, 1, 'Các version của Node.js ', '2018-07-26', '2018-07-27', 0),
(3, 1, 'Cài đặt Node.js trên Win', '2018-07-10', '2018-07-11', 0),
(4, 3, 'Cài đặt npm và yarn', '2018-07-18', '2018-07-18', 0),
(5, 4, 'Kiểm tra version đang chạy', '2018-07-25', '2018-07-27', 0),
(6, 0, 'Tìm hiểu GraphQL', '2018-07-28', '2018-07-29', 0),
(7, 0, 'API là gì ?', '2018-08-08', '2018-08-10', 0),
(8, 0, 'Web server là gì ?', '2018-08-09', '2018-08-10', 0),
(9, 8, 'Apache là gì ?', '2018-08-11', '2018-08-12', 0),
(10, 8, 'Nginx là gì ?', '2018-08-13', '2018-08-14', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
