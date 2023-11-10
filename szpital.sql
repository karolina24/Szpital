-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 10, 2023 at 12:08 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `szpital`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lekarze`
--

CREATE TABLE `lekarze` (
  `Id_lekarza` int(60) NOT NULL,
  `Imię` varchar(60) NOT NULL,
  `Nazwisko` varchar(60) NOT NULL,
  `Specjalizacja` varchar(100) NOT NULL,
  `Oddział` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lekarze`
--

INSERT INTO `lekarze` (`Id_lekarza`, `Imię`, `Nazwisko`, `Specjalizacja`, `Oddział`) VALUES
(1, 'Jan', 'Semafor', 'Onkologia kliniczna', 'Onkologia');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pacjęci`
--

CREATE TABLE `pacjęci` (
  `Id_pacjęta` int(64) NOT NULL,
  `Imię` varchar(64) NOT NULL,
  `Nazwisko` varchar(64) NOT NULL,
  `Dolegliwość` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pacjęci`
--

INSERT INTO `pacjęci` (`Id_pacjęta`, `Imię`, `Nazwisko`, `Dolegliwość`) VALUES
(1, 'Adolf', 'Hiller', 'Pęknięta czaszka');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `lekarze`
--
ALTER TABLE `lekarze`
  ADD PRIMARY KEY (`Id_lekarza`);

--
-- Indeksy dla tabeli `pacjęci`
--
ALTER TABLE `pacjęci`
  ADD PRIMARY KEY (`Id_pacjęta`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lekarze`
--
ALTER TABLE `lekarze`
  MODIFY `Id_lekarza` int(60) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pacjęci`
--
ALTER TABLE `pacjęci`
  MODIFY `Id_pacjęta` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
