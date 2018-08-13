-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2018 at 01:26 PM
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
  `thumbnail` tinytext COLLATE utf8_unicode_ci,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `status_log` varchar(8) COLLATE utf8_unicode_ci DEFAULT 'Pending',
  `user_id` bigint(20) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `parent_id`, `content`, `thumbnail`, `created_date`, `modified_date`, `start_date`, `end_date`, `status`, `status_log`, `user_id`) VALUES
(37, 0, 'dasdasd', NULL, '2018-08-13 13:30:31', '2018-08-13 13:30:31', '2018-08-13', '2018-08-14', 2, 'Deleted', 290252008400123),
(38, 0, 'dasda', NULL, '2018-08-13 13:30:34', '2018-08-13 13:30:34', '2018-08-13', '2018-08-14', 0, 'Pending', 290252008400123),
(39, 38, 'dasasd', NULL, '2018-08-13 13:31:00', '2018-08-13 13:31:00', '2018-08-13', '2018-08-14', 0, 'Pending', 290252008400123);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `social_id` tinytext COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` tinytext COLLATE utf8_unicode_ci,
  `access_token` tinytext COLLATE utf8_unicode_ci,
  `provider` varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `social_id`, `fullname`, `email`, `avatar`, `access_token`, `provider`) VALUES
(113910026214085, '', 'Olivia Albghebfdeiib Changwitz', 'erjrmttipu_1533895327@tfbnw.net', 'null', 'EAADAZBrewW8MBALbE65bP9CQ50gp6ux3KgEAiiM2WTnk4WGlcHuG0WaAtBKRGkCuIb5odrsYU7CRVZA9pzXQENlZAVluamKRjZB8H7L64W8XmLKEmTA9qNh1EQAI5bledwkHPfnYnI7H4B4SLgO1rDu8z2ZCjy8cMVk0Ff0unZAauSKpcXznrV', 'facebook'),
(290252008400123, '', 'Trí Thâm', 'trithamdev@gmail.com', 'http://graph.facebook.com/290252008400123/picture?type=square', 'EAADAZBrewW8MBABQ5NHgynYXe81AAXBZCSgNGkWjXqrav7DyCbD8zgOI2l7yZATmunPGkvnvZBlDbf0gtGja6GXhMRxWjhwmumWBQMvMxRxqbCogre2eYESMZC41rLn1jsY2Y4iQDvoe2watdpcfIyitZCIvyw0T9UNLJATF55MwZDZD', 'facebook'),
(921702469182649767, '', 'Nguyễn Trí Thâm', '', 'http://s120.avatar.talk.zdn.vn/c/e/2/0/2/120/e8735f5d9dd33bc3dc38909fa60b0b48.jpg', '78y70Efw034VY087x7y6Dns900tkPrX5Jfy-9DuxFKHDd4atuZKtNrAnJt3w7Kv1IeGVCjGmJ5Dxl4uTYmmxR3gXGZQE53f18fmwEjqRH0bvwmT3Za5OBZB8KcQCQLafEjfQ78KiNJC4YLfQZICz51YgVrYA8IHj1vCYDgOW8NbNkKPCgHGs9GtWDMQOQ4LM3iGOURb0G4eBsJ0Vd2nlL2g44W2aD7DD880KOh8oLYSiYpnmXtXuGJNsVowKNH8', 'zalo');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

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
