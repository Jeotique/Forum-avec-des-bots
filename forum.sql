-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 27 juin 2024 à 08:51
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `forum`
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
-- Structure de la table `post_like_dislike`
--

DROP TABLE IF EXISTS `post_like_dislike`;
CREATE TABLE IF NOT EXISTS `post_like_dislike` (
  `ID_Utilisateur` int NOT NULL,
  `ID_Post` int NOT NULL,
  `Type` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`ID_Post`),
  UNIQUE KEY `Type` (`Type`),
  KEY `ID_Utilisateur` (`ID_Utilisateur`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Déchargement des données de la table `post_like_dislike`
--

INSERT INTO `post_like_dislike` (`ID_Utilisateur`, `ID_Post`, `Type`) VALUES
(1, 4, 'dislike'),
(1, 3, 'like');

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
-- Structure de la table `reponse_like_dislike`
--

DROP TABLE IF EXISTS `reponse_like_dislike`;
CREATE TABLE IF NOT EXISTS `reponse_like_dislike` (
  `ID_Utilisateur` int NOT NULL,
  `ID_Reponse` int NOT NULL,
  `Type` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`ID_Utilisateur`),
  UNIQUE KEY `Type` (`Type`),
  KEY `ID_Reponse` (`ID_Reponse`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Déchargement des données de la table `reponse_like_dislike`
--

INSERT INTO `reponse_like_dislike` (`ID_Utilisateur`, `ID_Reponse`, `Type`) VALUES
(1, 4, 'like');

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
-- Structure de la table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `ID_Tag` int NOT NULL AUTO_INCREMENT,
  `Nom_Tag` varchar(25) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`ID_Tag`),
  UNIQUE KEY `Nom_Tag` (`Nom_Tag`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Déchargement des données de la table `tags`
--

INSERT INTO `tags` (`ID_Tag`, `Nom_Tag`) VALUES
(1, 'Test_tag'),
(2, 'Highway 37'),
(3, 'Highway 375'),
(4, 'Highway 3754'),
(5, 'Highway 3754564'),
(6, 'Highway 375445785564'),
(7, 'Highway 3'),
(8, 'Highway 31'),
(9, 'ccccc'),
(10, 'wwwww'),
(11, 'www'),
(12, 'ww'),
(13, 'aa'),
(14, 'aaa'),
(15, 'aaaa');

-- --------------------------------------------------------

--
-- Structure de la table `topics`
--

DROP TABLE IF EXISTS `topics`;
CREATE TABLE IF NOT EXISTS `topics` (
  `ID_Topic` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`ID_Topic`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `topics`
--

INSERT INTO `topics` (`ID_Topic`, `title`, `description`, `userId`) VALUES
(1, 'bm', 'ggggg', 457745),
(2, 'audi ', 'hhhhh', 457745);

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

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`ID`, `username`, `displayName`, `email`, `password`, `receivemails`) VALUES
(457745, 'johan', 'johan', 'johan.tichit@ynov.com', '010422jo', 0);

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
