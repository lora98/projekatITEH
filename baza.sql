/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.11-MariaDB : Database - projekat
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`projekat` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `projekat`;

/*Table structure for table `autor` */

DROP TABLE IF EXISTS `autor`;

CREATE TABLE `autor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(255) NOT NULL,
  `prezime` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `autor` */

insert  into `autor`(`id`,`ime`,`prezime`) values 
(1,'ime1','prezime1'),
(2,'ime2','prezime2'),
(3,'ime3','prezime3');

/*Table structure for table `autorstvo` */

DROP TABLE IF EXISTS `autorstvo`;

CREATE TABLE `autorstvo` (
  `knjigaId` int(11) NOT NULL,
  `autorId` int(11) NOT NULL,
  PRIMARY KEY (`knjigaId`,`autorId`),
  KEY `IDX_48abf5d1d53b04cbdd4875ea69` (`knjigaId`),
  KEY `IDX_c202a180c24b61b80bcd46b156` (`autorId`),
  CONSTRAINT `FK_48abf5d1d53b04cbdd4875ea690` FOREIGN KEY (`knjigaId`) REFERENCES `knjiga` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_c202a180c24b61b80bcd46b1561` FOREIGN KEY (`autorId`) REFERENCES `autor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `autorstvo` */

insert  into `autorstvo`(`knjigaId`,`autorId`) values 
(1,1),
(1,2),
(2,2),
(2,3),
(4,1),
(4,3),
(5,1),
(5,2),
(6,2);

/*Table structure for table `knjiga` */

DROP TABLE IF EXISTS `knjiga`;

CREATE TABLE `knjiga` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(255) NOT NULL,
  `brojStrana` int(11) NOT NULL,
  `fajl` varchar(255) DEFAULT NULL,
  `slika` varchar(255) NOT NULL,
  `cena` int(11) NOT NULL,
  `zanrId` int(11) DEFAULT NULL,
  `kreiraoId` int(11) DEFAULT NULL,
  `opis` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b294e253b475146541c6100c425` (`zanrId`),
  KEY `FK_0bd24564f5128582ce43de666da` (`kreiraoId`),
  CONSTRAINT `FK_0bd24564f5128582ce43de666da` FOREIGN KEY (`kreiraoId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_b294e253b475146541c6100c425` FOREIGN KEY (`zanrId`) REFERENCES `zanr` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `knjiga` */

insert  into `knjiga`(`id`,`naziv`,`brojStrana`,`fajl`,`slika`,`cena`,`zanrId`,`kreiraoId`,`opis`) values 
(1,'Docker in action',350,'Docker-in-Action.pdf','docker slika.JPG',4200,4,1,'Although the global economy is emerging from the collapse triggered by the pandemic, the recovery is uneven, halting, and subdued. Global economic output is expected to expand 3.8 percent in 2021. Notwithstanding this recovery, global GDP will still be more than 5 percent below its pre-pandemic trend in 2021 and there is a material risk that setbacks in containing the pandemic or other adverse events derail the recovery. Emerging market and developing economies (EMDE) growth is envisioned to firm to 5 percent in 2021, but EMDE output is expected to remain well below its prepandemic projection. The pandemic has exacerbated the risks associated with a decade-long wave of global debt accumulation. Debt levels have reached historic highs, making the global economy particularly vulnerable to financial market stress. The pandemic is likely to steepen the long-expected slowdown in potential growth over the next decade, undermining prospects for poverty reduction. The heightened level of uncertainty around the global outlook highlights policymakers’ role in raising the likelihood of better growth outcomes while warding off worse ones. Limiting the spread of the virus, providing relief for vulnerable populations, and overcoming vaccine-related challenges are key immediate priorities. With weak fiscal positions severely constraining government support measures in many countries, an emphasis on ambitious reforms is needed to rekindle robust, sustainable and equitable growth. Global cooperation is critical in addressing many of these challenges. In particular, the global community needs to act rapidly and forcefully to make sure the ongoing debt wave does not end with a string of debt crises in EMDEs, as was the case with earlier waves of debt accumulation.\r\n\r\n‘Global Economic Prospects’ is a World Bank Group Flagship Report that examines global economic developments and prospects, with a special focus on emerging market and developing economies, on a semiannual basis (in January and June). The January edition includes in-depth analyses of topical policy challenges faced by these economies, while the June edition contains shorter analytical pieces.'),
(2,'AnalizA',333,'Diplomski Aplikacija za upravljanje znanjem (1).pdf','20210829_131846.jpg',123,2,1,'agsf'),
(4,'nova',256,'Raps_zacini_d.o.o-12-3.pdf','gallery7.jpg',1999,4,1,'afd\\g'),
(5,'neka knjiga',43243,NULL,'Capture.PNG',3425,2,1,'aesgrhdt'),
(6,'afsgd',323,NULL,'концептуални модел.PNG',3456,1,1,'afsghd');

/*Table structure for table `korpa` */

DROP TABLE IF EXISTS `korpa`;

CREATE TABLE `korpa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `poslata` tinyint(4) NOT NULL,
  `adresa` varchar(255) NOT NULL,
  `telefon` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2815295f3b650447330a4171dd5` (`userId`),
  CONSTRAINT `FK_2815295f3b650447330a4171dd5` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `korpa` */

insert  into `korpa`(`id`,`poslata`,`adresa`,`telefon`,`userId`) values 
(1,1,'asg','asg',1),
(2,1,'neka adresa','2345432',1);

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`timestamp`,`name`) values 
(1,1629839415161,'createUser1629839415161'),
(2,1629839458926,'createZanr1629839458926'),
(3,1629839510424,'createAutor1629839510424'),
(4,1629839548264,'createKnjiga1629839548264'),
(5,1629839590197,'createKorpa1629839590197'),
(6,1630351624786,'dodatOpisKnjizi1630351624786');

/*Table structure for table `stavka` */

DROP TABLE IF EXISTS `stavka`;

CREATE TABLE `stavka` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kolicina` int(11) NOT NULL,
  `korpaId` int(11) NOT NULL,
  `knjigaId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`korpaId`),
  KEY `FK_b147ad90bc0f031fb9c545acbe1` (`korpaId`),
  KEY `FK_8ae15742adacb133929d37316af` (`knjigaId`),
  CONSTRAINT `FK_8ae15742adacb133929d37316af` FOREIGN KEY (`knjigaId`) REFERENCES `knjiga` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_b147ad90bc0f031fb9c545acbe1` FOREIGN KEY (`korpaId`) REFERENCES `korpa` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `stavka` */

insert  into `stavka`(`id`,`kolicina`,`korpaId`,`knjigaId`) values 
(1,3,1,1),
(2,3,2,1),
(3,5,2,2);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `isAdmin` tinyint(4) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`firstName`,`lastName`,`email`,`isAdmin`,`password`) values 
(1,'klara','mitrovic','klara@gmail.com',1,'/1rBkZBCSx2I+UGe+UmuVmcLCWMBpt/3l1Cn+qdl32g=');

/*Table structure for table `zanr` */

DROP TABLE IF EXISTS `zanr`;

CREATE TABLE `zanr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `zanr` */

insert  into `zanr`(`id`,`naziv`) values 
(1,'komedija'),
(2,'decji'),
(3,'klasici'),
(4,'programiranje'),
(5,'ekonomija');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
