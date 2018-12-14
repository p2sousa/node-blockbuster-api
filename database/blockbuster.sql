/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump da tabela Movies
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Movies`;

CREATE TABLE `Movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `director` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `rent` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Movies` WRITE;
/*!40000 ALTER TABLE `Movies` DISABLE KEYS */;

INSERT INTO `Movies` (`id`, `name`, `director`, `quantity`, `rent`, `available`)
VALUES
	(2,'Titanic','James Cameron',5,0,1),
	(3,'Senhor dos Aneis: A Sociedade do Anel','Peter Jackson',3,0,1),
	(4,'Senhor dos Aneis: As duas torres','Peter Jackson',3,0,1),
	(5,'Senhor dos Aneis: O retorno do rei','Peter Jackson',3,0,1),
	(6,'Harry Potter: A pedra filosofal','David Yates',2,0,1),
	(7,'Harry Potter: A camara secreta','David Yates',2,0,1),
	(8,'Harry Potter: O Prisioneiro de Askabam','David Yates',2,0,1),
	(9,'Velozes e Furiosos','Rob Cohen',2,0,1),
	(10,'Clube da Luta','David Fincher',2,0,1),
	(11,'Kill Bill','Quentin Tarantino',2,0,1);

/*!40000 ALTER TABLE `Movies` ENABLE KEYS */;
UNLOCK TABLES;


# Dump da tabela Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `name`, `email`, `password`)
VALUES
	(1,'Floki','floki@mail.com','$2b$10$wm/f9Geow6Lnw7GCXJJpROxtzWbyrNykQm7NlG25WismYwGID5vbi');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
