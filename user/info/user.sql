-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2025 at 12:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+08:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user`
--

-- --------------------------------------------------------

--
-- Table structure for table `preserveuser`
--

CREATE TABLE `preserveuser` (
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `preserveuser`
--

INSERT INTO `preserveuser` (`userID`) VALUES
(0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(8) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(320) NOT NULL,
  `password` longtext NOT NULL,
  `salt` longtext NOT NULL,
  `userTypeID` int(8) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `name`, `email`, `password`, `salt`, `userTypeID`, `createdAt`, `updatedAt`) VALUES
(0, 'root', 'root@soton.ac.uk', 'H4sIAAAAAAAACiWRPW6YMQxD7/LNbzAp+UcZe40iQ4Amc1GkQ1H07oWcTbAoiXz++3z++fn+vDzffn98vP96eH68fb49L99Vm9xYQnVwFDKVKJLNPISYiUaxJlqH4hykjW0mDtZBa+DT+jnRXngiCWeh1k8OqiLi7nLvPIXmwiPwOHefZ1CTCtbGY1Pj9pSDdN++sig8iOTEdXNwHnJcHzuQE7lQkolj4Pwy3LXKzMA9NjaqecXOQMrrp1WjOB3ZWEE3y9TquPGl1EzcE4vAjktNFY1UPmj7Om8SDbdBT/KwddM7OqnalptDG/66Fgtn/4LRWqjrztU4x+n9/Xr267//zS20m9sBAAA=', 'H4sIAAAAAAAACi2QO25dMRBD93LrU4ij+Uiv9DaMFAZi14HxXBhG9h6MbipJHA5F8ud6fv95vx7Xy9fHx/vnxfX77fl2PV5rsgxzNFFtlAMbgXJjDSVzsBsUCrZYhVkSjoajmCgTd3awEivUAlGYFtba21A6A5mwObD+Tol5Mg2LgeZCogxFYFOsgSLPVcuxJvrCelooJ2FoJU4tZqK9MLXcRKPlBkqkwsZAMnwed7bRqHu5fcZN2EUU2t3G3Mf76pjEZhYWTgl5dQ992P+kx6dvpG6pN7uVhY41a+K+M+m4dD+dy3ossROtlnJ0CptNyXl34ffE10njeVA3rJ8WlP/6+w8/d2xH4gEAAA==', 3, '2025-03-01 16:15:11', '2025-03-09 16:15:23');

-- --------------------------------------------------------

--
-- Table structure for table `usertype`
--

CREATE TABLE `usertype` (
  `userTypeID` int(8) NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `usertype`
--

INSERT INTO `usertype` (`userTypeID`, `name`) VALUES
(1, 'Student'),
(2, 'Staff'),
(3, 'Administrator');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `preserveuser`
--
ALTER TABLE `preserveuser`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD KEY `userTypeID` (`userTypeID`);

--
-- Indexes for table `usertype`
--
ALTER TABLE `usertype`
  ADD PRIMARY KEY (`userTypeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usertype`
--
ALTER TABLE `usertype`
  MODIFY `userTypeID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `preserveuser`
--
ALTER TABLE `preserveuser`
  ADD CONSTRAINT `preserveuser_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`userTypeID`) REFERENCES `usertype` (`userTypeID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
