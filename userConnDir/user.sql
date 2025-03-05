-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2025 at 05:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(8) NOT NULL,
  `uniID` int(8) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` longtext NOT NULL,
  `salt` longtext NOT NULL,
  `userTypeID` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `uniID`, `name`, `email`, `password`, `salt`, `userTypeID`) VALUES
(0, 10000000, 'root', 'root@soton.ac.uk', 'H4sIAAAAAAAACiWRPW6YMQxD7/LNbzAp+UcZe40iQ4Amc1GkQ1H07oWcTbAoiXz++3z++fn+vDzffn98vP96eH68fb49L99Vm9xYQnVwFDKVKJLNPISYiUaxJlqH4hykjW0mDtZBa+DT+jnRXngiCWeh1k8OqiLi7nLvPIXmwiPwOHefZ1CTCtbGY1Pj9pSDdN++sig8iOTEdXNwHnJcHzuQE7lQkolj4Pwy3LXKzMA9NjaqecXOQMrrp1WjOB3ZWEE3y9TquPGl1EzcE4vAjktNFY1UPmj7Om8SDbdBT/KwddM7OqnalptDG/66Fgtn/4LRWqjrztU4x+n9/Xr267//zS20m9sBAAA=', 'H4sIAAAAAAAACi2QO25dMRBD93LrU4ij+Uiv9DaMFAZi14HxXBhG9h6MbipJHA5F8ud6fv95vx7Xy9fHx/vnxfX77fl2PV5rsgxzNFFtlAMbgXJjDSVzsBsUCrZYhVkSjoajmCgTd3awEivUAlGYFtba21A6A5mwObD+Tol5Mg2LgeZCogxFYFOsgSLPVcuxJvrCelooJ2FoJU4tZqK9MLXcRKPlBkqkwsZAMnwed7bRqHu5fcZN2EUU2t3G3Mf76pjEZhYWTgl5dQ992P+kx6dvpG6pN7uVhY41a+K+M+m4dD+dy3ossROtlnJ0CptNyXl34ffE10njeVA3rJ8WlP/6+w8/d2xH4gEAAA==', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `uniID` (`uniID`),
  ADD KEY `userTypeID` (`userTypeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(8) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`userTypeID`) REFERENCES `usertype` (`userTypeID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
