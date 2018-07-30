-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2018 at 12:50 PM
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
  `parent_id` int(11) DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `status` bit(1) NOT NULL DEFAULT b'0',
  `status_log` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `parent_id`, `content`, `created_date`, `modified_date`, `start_date`, `end_date`, `deleted`, `status`, `status_log`) VALUES
(1, 0, 'Tìm hiểu Node.js', '2018-07-30 13:34:22', '2018-07-30 13:34:22', '2018-07-26', '2018-08-01', 0, b'0', NULL),
(2, 1, 'Các version của Node.js ', '2018-07-30 13:34:22', '2018-07-30 13:34:22', '2018-07-26', '2018-07-27', 0, b'0', NULL),
(3, 1, 'Cài đặt Node.js trên Win', '2018-07-30 13:34:22', '2018-07-30 13:34:22', '2018-07-10', '2018-07-11', 0, b'0', NULL),
(4, 3, 'Cài đặt npm và yarn', '2018-07-30 13:34:22', '2018-07-30 13:34:22', '2018-07-18', '2018-07-18', 0, b'0', NULL),
(5, 4, 'Kiểm tra version đang chạy', '2018-07-30 13:34:22', '2018-07-30 13:34:22', '2018-07-25', '2018-07-27', 0, b'0', NULL),
(6, 0, 'Tìm hiểu GraphQL', '2018-07-30 13:34:22', '2018-07-30 13:34:22', '2018-07-28', '2018-07-29', 0, b'0', NULL),
(7, 0, 'API là gì ?', '2018-07-30 13:34:22', '2018-07-30 13:34:22', '2018-08-08', '2018-08-10', 0, b'0', NULL),
(8, 0, 'Web server là gì ?', '2018-07-30 13:34:22', '2018-07-30 13:34:22', '2018-08-09', '2018-08-10', 0, b'0', NULL),
(9, 8, 'Apache là gì ?', '2018-07-30 13:34:22', '2018-07-30 13:34:22', '2018-08-11', '2018-08-12', 0, b'0', NULL),
(10, 8, 'Nginx là gì ?', '2018-07-30 13:34:22', '2018-07-30 13:34:22', '2018-08-13', '2018-08-14', 0, b'0', NULL),
(12, 0, 'tfdtdgf', '2018-07-30 14:31:06', '2018-07-30 14:31:06', '2018-07-05', '2018-07-26', 0, b'0', NULL),
(13, 0, 'cfsdfsdfsdf', '2018-07-30 14:31:39', '2018-07-30 14:31:39', '2018-07-05', '2018-08-02', 0, b'0', NULL),
(14, 0, 'đasasad', '2018-07-30 14:32:51', '2018-07-30 14:32:51', '2018-07-10', '2018-07-27', 0, b'0', NULL),
(15, 0, 'đasasda', '2018-07-30 14:32:59', '2018-07-30 14:32:59', '2018-07-02', '2018-07-26', 0, b'0', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
