-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 14 juin 2024 à 10:11
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `forum_2`
--

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `ID_Post` int NOT NULL AUTO_INCREMENT,
  `Contenu` varchar(900) NOT NULL,
  `Titre` varchar(50) NOT NULL,
  `Date_de_création` datetime NOT NULL,
  `Etat` varchar(50) NOT NULL,
  `Likes` varchar(50) DEFAULT NULL,
  `Dislikes` varchar(50) DEFAULT NULL,
  `ID_Topic` int NOT NULL,
  `ID_Utilisateur` int NOT NULL,
  PRIMARY KEY (`ID_Post`),
  KEY `ID_Topic` (`ID_Topic`),
  KEY `ID_Utilisateur` (`ID_Utilisateur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `post_tag`
--

DROP TABLE IF EXISTS `post_tag`;
CREATE TABLE IF NOT EXISTS `post_tag` (
  `ID_Post` int NOT NULL,
  `ID_Tag` int NOT NULL,
  PRIMARY KEY (`ID_Post`,`ID_Tag`),
  KEY `ID_Tag` (`ID_Tag`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reponse`
--

DROP TABLE IF EXISTS `reponse`;
CREATE TABLE IF NOT EXISTS `reponse` (
  `ID_Reponse` int NOT NULL AUTO_INCREMENT,
  `Contenu` varchar(900) NOT NULL,
  `Date_De_Réponse` datetime NOT NULL,
  `Likes` varchar(50) DEFAULT NULL,
  `Dislikes` varchar(50) DEFAULT NULL,
  `ID_Utilisateur` int NOT NULL,
  `ID_Post` int NOT NULL,
  PRIMARY KEY (`ID_Reponse`),
  KEY `ID_Utilisateur` (`ID_Utilisateur`),
  KEY `ID_Post` (`ID_Post`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `ID_Role` int NOT NULL AUTO_INCREMENT,
  `Type` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_Role`),
  UNIQUE KEY `Type` (`Type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tag`
--

DROP TABLE IF EXISTS `tag`;
CREATE TABLE IF NOT EXISTS `tag` (
  `ID_Tag` int NOT NULL AUTO_INCREMENT,
  `Nom_tag` varchar(25) NOT NULL,
  PRIMARY KEY (`ID_Tag`),
  UNIQUE KEY `Nom_tag` (`Nom_tag`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `topics`
--

DROP TABLE IF EXISTS `topics`;
CREATE TABLE IF NOT EXISTS `topics` (
  `ID_Topic` int NOT NULL AUTO_INCREMENT,
  `Nom_Topic` varchar(50) NOT NULL,
  `ID_Utilisateur` int NOT NULL,
  PRIMARY KEY (`ID_Topic`),
  UNIQUE KEY `Nom_Topic` (`Nom_Topic`),
  KEY `ID_Utilisateur` (`ID_Utilisateur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `ID` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `displayName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `receivemails` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `ID_Utilisateur` int NOT NULL AUTO_INCREMENT,
  `Nom_Utilisateur` varchar(25) NOT NULL,
  `Mot_de_passe` varchar(255) NOT NULL,
  `Photo_de_profil` varchar(50) NOT NULL,
  `Bio` varchar(200) DEFAULT NULL,
  `Dernière_connection` datetime NOT NULL,
  `Email` varchar(191) NOT NULL,
  PRIMARY KEY (`ID_Utilisateur`),
  UNIQUE KEY `Nom_Utilisateur` (`Nom_Utilisateur`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur_role`
--

DROP TABLE IF EXISTS `utilisateur_role`;
CREATE TABLE IF NOT EXISTS `utilisateur_role` (
  `ID_Utilisateur` int NOT NULL,
  `ID_Role` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_Utilisateur`,`ID_Role`),
  KEY `ID_Role` (`ID_Role`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
