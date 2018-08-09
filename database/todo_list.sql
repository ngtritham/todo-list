-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2018 at 01:12 PM
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
  `content` tinytext COLLATE utf8_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `status_log` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` bigint(20) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `parent_id`, `content`, `created_date`, `modified_date`, `start_date`, `end_date`, `deleted`, `status`, `status_log`, `user_id`) VALUES
(1, 0, 'test', '2018-08-08 00:00:00', '2018-08-10 00:00:00', '2018-08-08', '2018-08-09', 1, 1, NULL, 1),
(4, 0, 'dsadad', '2018-08-08 13:01:57', '2018-08-08 13:01:57', '2018-08-08', '2018-08-09', 0, 0, NULL, 1),
(5, 0, 'fgdgd', '2018-08-08 13:14:22', '2018-08-08 13:14:22', '2018-08-08', '2018-08-09', 0, 1, NULL, 1),
(6, 0, 'gdfg', '2018-08-08 13:18:17', '2018-08-08 13:18:17', '2018-08-08', '2018-08-09', 0, 0, NULL, 1),
(7, 0, 'gdfgdgfdg', '2018-08-09 17:13:21', '2018-08-09 17:13:21', '2018-08-09', '2018-08-10', 0, 0, NULL, 1),
(8, 0, 'test', '2018-08-09 17:15:24', '2018-08-09 17:15:24', '2018-08-09', '2018-08-10', 0, 0, NULL, 1),
(9, 0, 'dasdasd', '2018-08-09 17:16:17', '2018-08-09 17:16:17', '2018-08-09', '2018-08-10', 0, 0, NULL, 1),
(10, 0, 'task của thâm', '2018-08-09 17:17:49', '2018-08-09 17:17:49', '2018-08-09', '2018-08-10', 1, 1, NULL, 290252008400123),
(11, 0, 'qewqeqweqe', '2018-08-09 17:26:25', '2018-08-09 17:26:25', '2018-08-09', '2018-08-10', 1, 1, NULL, 290252008400123),
(12, 0, 'qweqwewqeqe', '2018-08-09 17:30:54', '2018-08-09 17:30:54', '2018-08-09', '2018-08-10', 0, 1, 'undefined', 290252008400123),
(13, 0, 'fsdfsf', '2018-08-09 17:31:14', '2018-08-09 17:31:14', '2018-08-09', '2018-08-10', 0, 1, 'undefined', 290252008400123);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `fullname` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` tinytext COLLATE utf8_unicode_ci,
  `access_token` tinytext COLLATE utf8_unicode_ci,
  `provider` varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fullname`, `email`, `avatar`, `access_token`, `provider`) VALUES
(1, 'Nguyễn Trí Thâm', NULL, NULL, NULL, NULL),
(2, 'abc', NULL, NULL, NULL, NULL),
(3, 'dasdadad', NULL, NULL, NULL, NULL),
(290252008400123, 'Trí Thâm', 'trithamdev@gmail.com', 'null', 'EAADAZBrewW8MBAK6lD42KAyHOymWo8TKGoUtXqIKlcGbTL5JgdFZCMZBSbjyv6YHrzMV4hA4PDBob0S4IphxDjmjNgc3sHGrtxZBkPNA1M308ukS1GzDkB1Bw4J0sZCu5V4ZBmBZByaPvRjzvDy9FNyT0ZCJl7WjWjXeJ5pqjIN75gZDZD', 'facebook');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid_task` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `userid_task` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
