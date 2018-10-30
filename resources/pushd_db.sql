-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2018 at 11:59 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pushd_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `depressed_res`
--

CREATE TABLE `depressed_res` (
  `depressed_res_id` int(10) UNSIGNED NOT NULL,
  `responce` varchar(400) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `depressed_res`
--

INSERT INTO `depressed_res` (`depressed_res_id`, `responce`, `user_id`, `created_at`) VALUES
(1, '', 9933, '2018-10-07 17:02:33'),
(2, '232322232323', 934, '2018-10-07 17:05:33'),
(3, '34,sdsdsdsd,Male,0,1,2,3,2,1,1,1,1,12,Yes,Yes,No,', NULL, '2018-10-22 07:08:09'),
(4, '34,sdsdsdsd,Male,0,1,2,3,2,1,1,1,1,12,Yes,Yes,No,', NULL, '2018-10-22 07:09:12'),
(5, '45,fdffddf,Male,1,1,1,1,1,1,1,1,1,9,Yes,Yes,No,', NULL, '2018-10-22 07:09:53'),
(6, '45,fdfdfdf,Male,0,1,2,2,2,2,1,0,0,10,Yes,Not sure,Yes,', NULL, '2018-10-23 10:28:45'),
(7, '0,1,1,1,1,1,1,1,1,8,', NULL, '2018-10-26 06:37:01'),
(8, '0,1,1,1,1,1,1,1,1,8,', NULL, '2018-10-26 06:45:44'),
(9, '0,1,1,0,0,0,0,0,0,2,', NULL, '2018-10-26 07:02:35'),
(10, '0,1,1,1,1,1,1,1,1,8,', NULL, '2018-10-26 07:05:34'),
(11, '1,1,1,1,1,1,1,1,1,9,', NULL, '2018-10-26 07:06:34');

-- --------------------------------------------------------

--
-- Table structure for table `pushd_notes`
--

CREATE TABLE `pushd_notes` (
  `pushd_notes_id` int(10) UNSIGNED NOT NULL,
  `users_id` int(11) NOT NULL,
  `notes` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pushd_notes`
--

INSERT INTO `pushd_notes` (`pushd_notes_id`, `users_id`, `notes`, `created_at`) VALUES
(1, 9939, 'bhbsbxsbsdsdjbsdb', '2018-10-08 12:21:06'),
(2, 9939, '	\n		its time', '2018-10-08 12:21:00'),
(3, 9939, '	\n		jkjsdkdkdk', '2018-10-08 12:20:53'),
(4, 9962, '	\n		you have done grate job', '2018-10-10 11:23:17'),
(5, 9961, '	\n		u have done greate job', '2018-10-12 07:03:25'),
(6, 9961, '	\n		think one if hvae', '2018-10-12 07:05:06'),
(7, 9961, '	\n		dfkdfjdfkdfkdf', '2018-10-12 07:05:37'),
(8, 9961, '	\n		jjjjhgcdffgfgf', '2018-10-12 07:06:13'),
(9, 9962, '	\n		hdhdghdsh', '2018-10-12 07:12:46');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `sections_pk_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `category_id` varchar(100) DEFAULT NULL,
  `sub_section_id` int(11) NOT NULL,
  `version_id` int(11) NOT NULL,
  `response` varchar(1500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`sections_pk_id`, `user_id`, `section_id`, `category_id`, `sub_section_id`, `version_id`, `response`) VALUES
(1, 9939, 3, 'null', 6, 1, '"1_1_1_1,1_3_jhjj_1,2_1_2_1,2_3_jjjj_1,3_1_3_0,3_3_gbhbv_0,4_1_4_1,4_2_hhbbbh_1,4_3_kmknknn_1,5_1_5_0,5_2_mkmkkk_0,5_3_vvhvv_0,6_1_6_0,6_2_bhbhbhb_0,6_3_bhbhbh_0,"'),
(2, 9939, 4, 'null', 5, 1, '["Have I had any experiences that show that this thought is not completely true all the time?","If my best friend or someone who loves me knew I was thinking this, what would they say to me?<br> What evidence would they point out to me that would suggest that my thoughts were not 100% true?","Five years from now, if I look back at this situation, will I look at it any differently?","Are there any strengths or positives in me or the situation that I am ignoring?","What is the worst that can happen and how can I deal with that?","Am I responding and concluding based only on how I am feeling?"]'),
(3, 9941, 4, 'null', 5, 1, '["What is the effect of thinking this way?","Am I jumping to any conclusions when I do not really have much evidence?","What is an alternative way of looking at this situation and what would the effect of that be?","What are the advantages and disadvantages of thinking this way?"]'),
(4, 9962, 3, '2a', 2, 1, '[{"natureVal":"Pleasurable","freVal":"1","easyVal":"2","inputVal":"plan1"},{"natureVal":"Meaningful","freVal":"3","easyVal":"3","inputVal":"plan2"},{"natureVal":"Mastery-oriented","freVal":"1","easyVal":"2","inputVal":"plan3"}]'),
(5, 9962, 3, '2b', 2, 1, '[{"actName1":"plan1","natureName1":"Pleasurable","checkboxes":[0,1,0,0,0,0,0]},{"actName1":"plan2","natureName1":"Meaningful","checkboxes":[0,0,1,0,0,0,0]},{"actName1":"plan3","natureName1":"Mastery-oriented","checkboxes":[0,0,0,1,0,0,0]}]'),
(6, 9962, 3, '2a', 4, 1, '"1_1_yes its working 3.4,2_1_yes its working 3.5,3_1_yes its working 3.6,4_1_yes its working 3.7,5_1_yes its working 3.8,""1_2_yes its working 3.4 part2,2_2_yes its working 3.5 part 2,"'),
(7, 9962, 3, 'null', 6, 1, '"1_1_1_0,1_3_right-1_0,2_1_2_0,2_3_right-2_0,3_1_3_1,3_3_right-3_1,4_1_4_0,4_2_left-3_0,4_3_right-4_0,5_1_5_1,5_2_left-4_1,5_3_right-5_1,6_1_6_1,6_2_left-5_1,6_3_right-6_1,"'),
(8, 9962, 4, 'null', 5, 1, '["Am I jumping to any conclusions when I do not really have much evidence?","Am I blaming myself for something over which I do not have complete control?","What is the effect of thinking this way?","What is an alternative way of looking at this situation and what would the effect of that be?"]'),
(9, 9962, 4, 'null', 6, 1, '"1_1_1,1_2_2,1_3_3,1_4_Selective Abstraction,1_5_4,2_1_5,2_2_6,2_3_7,2_4_All or None Thinking,2_5_u,3_1_f,3_2_g,3_3_g,3_4_Disqualifying the positive,3_5_c,4_1_cj,4_2_j,4_3_huh,4_4_Emotional reasoning,4_5_ddd,"'),
(10, 9962, 4, 'null', 7, 1, '"1_1_4.7 statement 1,1_2_4.7 statement 1,1_3_4.7 statement 1,"'),
(11, 9962, 5, 'null', 6, 1, '"1_1_5.6 statement 1,2_1_5.6 statement 2,3_1_5.6 statement 3,4_1_5.6 statement 4,"'),
(12, 9962, 5, 'null', 7, 1, '"1_1_5.7 staenmt,"'),
(13, 9962, 5, 'null', 8, 1, '"1_1_5.8 stmt 1,1_2_Emotional,1_3_5.8 stmt 1-1,2_1_5.8 stmt 2,2_2_Rational,2_3_5.8 stmt 1-2,3_1_5.8 stmt 3,3_2_Rational,3_3_5.8 stmt 1-3,4_1_5.8 stmt 4,4_2_Wise,4_3_5.8 stmt 1-4,"'),
(14, 9962, 6, 'null', 1, 1, '"1_2_2,2_2_3,3_2_4,4_2_3,5_2_2,6_2_4,7_2_4,8_2_2,9_2_5,10_2_1,11_2_1,12_2_1,"'),
(15, 9962, 6, 'null', 4, 1, '"1_2_6.4 stmt,2_2_6.4 stmt,3_1_6.4 stmt,3_2_6.4 stmt,"'),
(16, 9962, 6, 'null', 6, 1, '"1_1_6.4 stmt6.4 stmt6.4 stmt6.4 stmt6.4 stmt6.4 stmt6.4 stmt6.4 stmt6.4 stmt6.4 stmt6.4 stmt6.4 stmt6.4 stmt,"'),
(17, 9962, 7, 'null', 4, 1, '"1_1_7.4 stmt 1,1_2_7.4 stmt 2,1_3_7.4 stmt 3,"'),
(18, 9962, 7, 'null', 5, 1, '"1_1_11/12/89,1_2_2,1_3_ssass,1_4_3,1_5_asasas,2_1_11/12/89,2_2_3,2_3_sss,2_4_5,2_5_sdsdsd,3_1_,3_2_0,3_3_,3_4_0,3_5_,4_1_,4_2_0,4_3_,4_4_0,4_5_,"'),
(19, 9962, 8, 'null', 4, 1, '"1_1_stmt 1 8.4,1_2_stmt 1 8.4,1_3_stmt 1 8.4,1_4_stmt 1 8.4,1_5_stmt 1 8.4,2_1_stmt 2 8.4,2_2_stmt 2 8.4,2_3_stmt 2 8.4,2_4_stmt 2 8.4,2_5_stmt 2 8.4,"'),
(20, 9962, 8, 'null', 5, 1, '"1_1_stmt 1 8.5,1_2_stmt 1 8.5,1_3_stmt 1 8.5,2_1_stmt 2 8.5,2_2_stmt 2 8.5,2_3_stmt 2 8.5,3_1_stmt 3 8.5,"'),
(21, 9962, 9, 'null', 3, 1, '"undefined4_5_6_7_"'),
(22, 9962, 9, 'null', 4, 1, '"1_1_9.4 stmt commitment,2_1_9.4 stmt commitment,3_1_9.4 stmt commitment,4_1_9.4 stmt commitment,5_1_9.4 stmt commitment,5_2_9.4 stmt commitment,5_3_9.4 stmt commitment,"'),
(23, 9962, 10, 'null', 2, 1, '"1_2_5_"'),
(24, 9962, 11, 'null', 5, 1, '"1_1_optinoal section 12,1_2_optinoal section 12,1_3_optinoal section 12,1_4_optinoal section 12,1_5_optinoal section 12,"'),
(25, 9939, 7, 'null', 4, 1, '"1_1_sdsdsd,1_2_dsdsd,1_3_dsdsdsdsd,"'),
(26, 9939, 7, 'null', 5, 1, '"1_1_,1_2_,1_3_,1_4_,1_5_,2_1_,2_2_,2_3_,2_4_,2_5_,3_1_,3_2_,3_3_,3_4_,3_5_,4_1_,4_2_,4_3_,4_4_,4_5_,"'),
(27, 9939, 8, 'null', 4, 1, '"1_1_ddds,1_2_ee,1_3_ewewe,1_4_eweeee,1_5_434433,2_1_eddde,2_2_343434,2_3_ekhjfhjf3,2_4_23ewewed,2_5_323eee,"'),
(28, 9939, 8, 'null', 5, 1, '"1_1_dsddsd,1_2_e223www,1_3_eewewe,2_1_wewee,2_2_ewwewe,2_3_dsws,3_1_esssws,"'),
(29, 9939, 9, 'null', 3, 1, '"5_"'),
(30, 9939, 9, 'null', 4, 1, '"1_1_sd,sd,d ,2_1_jjjjnjn,3_1_njnnjnn,4_1_jnjnjnu999,5_1_jnnbnn,5_2_nh9i99i,5_3_njnjnjn,"'),
(31, 9939, 10, 'null', 2, 1, '"7_"'),
(32, 9969, 3, '2a', 4, 1, '"1_1_mnnm,""1_2_yy,"'),
(33, 9969, 3, 'null', 6, 1, '"1_1_1_1,1_3_mnm_1,2_1_2_0,2_3__0,3_1_3_0,3_3__0,4_1_4_0,4_2__0,4_3__0,5_1_5_0,5_2__0,5_3__0,6_1_6_0,6_2__0,6_3__0,"'),
(34, 9969, 4, 'null', 6, 1, '"1_1_,1_2_,1_3_,1_4_,1_5_,2_1_,2_2_,2_3_,2_4_,2_5_,3_1_,3_2_,3_3_,3_4_,3_5_,4_1_,4_2_,4_3_,4_4_,4_5_,"'),
(35, 9969, 4, 'null', 7, 1, '"1_1_,1_2_,1_3_,"'),
(36, 9969, 5, 'null', 6, 1, '"1_1_jk,2_1_yu,3_1_h,4_1_t,"'),
(37, 9969, 5, 'null', 7, 1, '"1_1_nm,"'),
(38, 9969, 5, 'null', 8, 1, '"1_1_jh,1_2_Emotional,1_3_kl,2_1_,2_2_0,2_3_,3_1_,3_2_0,3_3_,4_1_,4_2_0,4_3_,"'),
(39, 9969, 6, 'null', 1, 1, '"1_2_1,2_2_1,3_2_1,4_2_1,5_2_1,6_2_1,7_2_1,8_2_1,9_2_1,10_2_1,11_2_1,12_2_2,"'),
(40, 9969, 6, 'null', 4, 1, '"1_2_nm,2_2_ui,3_1_jk,3_2_hj,"'),
(41, 9969, 6, 'null', 6, 1, '"1_1_bnnbbn yuyuyu,"'),
(42, 9969, 7, 'null', 4, 1, '"1_1_nm,1_2_ui,1_3_jk,"'),
(43, 9969, 7, 'null', 5, 1, '"1_1_1-1-19,1_2_1,1_3_kl,1_4_1,1_5_kl,2_1_1-2-19,2_2_1,2_3_kl,2_4_1,2_5_kl,3_1_,3_2_0,3_3_,3_4_0,3_5_,4_1_,4_2_0,4_3_,4_4_0,4_5_,"'),
(44, 9969, 8, 'null', 4, 1, '"1_1_nm,1_2_iu,1_3_jk,1_4_uy,1_5_h,2_1_ui,2_2_ui,2_3_ui,2_4_j,2_5_nb,"'),
(45, 9969, 8, 'null', 5, 1, '"1_1_mn,1_2_ty,1_3_nm,2_1_jk,2_2_u,2_3_ty,3_1_bn,"'),
(46, 9969, 9, 'null', 3, 1, '"1_2_"'),
(47, 9969, 9, 'null', 4, 1, '"1_1_mn,2_1_jk,3_1_ui,4_1_j,5_1_h,5_2_y,5_3_tr,"'),
(48, 9969, 10, 'null', 2, 1, '"1_2_"');

-- --------------------------------------------------------

--
-- Table structure for table `section_feedback`
--

CREATE TABLE `section_feedback` (
  `section_feedback_id` int(10) UNSIGNED NOT NULL,
  `users_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `summary` varchar(300) DEFAULT NULL,
  `review` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `section_feedback`
--

INSERT INTO `section_feedback` (`section_feedback_id`, `users_id`, `section_id`, `summary`, `review`) VALUES
(1, 9933, 3, 'reer', 'ddd'),
(2, 1, 1, 'working herw', 'review'),
(3, 1, 1, 'deddddddsdsdsdsdsd', 'review'),
(4, 9933, 2, 'sdhdbhd', 'jndjnsdj'),
(5, 9938, 2, 'yests', '1234'),
(6, 9938, 2, 'neobbcbjhxs', NULL),
(7, 9939, 4, 'jjdfjsdfdj', NULL),
(8, 9939, 3, 'yuyu', NULL),
(9, 9939, 2, '123456789', NULL),
(10, 9962, 1, 'yes I completed', NULL),
(11, 9962, 2, 'yes i completed 2 section', NULL),
(12, 9962, 3, 'I completed 3 sec', NULL),
(13, 9962, 4, 'yes I completed 4th section', NULL),
(14, 9962, 5, 'I complected 5th section', NULL),
(15, 9962, 6, 'i complected 6th section', NULL),
(16, 9962, 7, 'i completed 7th section', NULL),
(17, 9962, 8, 'i completed 8th section', NULL),
(18, 9962, 9, 'i completed 9th section', NULL),
(19, 9962, 10, 'i completed 10th section', NULL),
(20, 9939, 6, 'jxsjhdjhdhd', 'I will try to use this'),
(21, 9939, 7, 'dsdsdsd', 'I will try to use this'),
(22, 9939, 8, 'ewewwe', 'I will try to use this'),
(23, 9939, 9, 'sksknsmsmms nksakasksk mkqww', 'I will try to use this'),
(24, 9939, 10, 'axzzxzxzx', 'I will try to use this'),
(25, 9969, 1, 'sdsdsdsdsd ddd', 'I will try to use this'),
(26, 9969, 2, 'done', 'I tried using it'),
(27, 9969, 3, 'jh', 'I will try to use this'),
(28, 9969, 4, 'jh', 'I tried using it'),
(29, 9969, 5, 'jh', 'I tried using it'),
(30, 9969, 6, 'nm', 'I will try to use this'),
(31, 9969, 7, 'jk', 'I tried using it'),
(32, 9969, 8, 'jh', 'I tried using it'),
(33, 9969, 9, 'nmnm', 'I will try to use this'),
(34, 9969, 10, 'sdsdsdsd', 'I will try to use this');

-- --------------------------------------------------------

--
-- Table structure for table `sessionstats`
--

CREATE TABLE `sessionstats` (
  `sessionStats_id` int(10) UNSIGNED NOT NULL,
  `stats_id` int(10) UNSIGNED NOT NULL,
  `users_id` int(10) UNSIGNED NOT NULL,
  `logoutTime` datetime DEFAULT NULL,
  `loginTime` datetime NOT NULL,
  `timeSpent` varchar(100) NOT NULL,
  `lastActivity` datetime DEFAULT NULL,
  `smiley` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessionstats`
--

INSERT INTO `sessionstats` (`sessionStats_id`, `stats_id`, `users_id`, `logoutTime`, `loginTime`, `timeSpent`, `lastActivity`, `smiley`) VALUES
(1, 2, 2, '2018-08-15 00:00:00', '0000-00-00 00:00:00', '11', '2018-08-23 00:00:00', 'A'),
(2, 2, 2, NULL, '2018-08-22 12:56:32', '', NULL, ''),
(3, 2, 2, NULL, '2018-08-22 13:27:33', '', NULL, ''),
(4, 2, 2, NULL, '2018-08-27 12:06:17', '', NULL, ''),
(5, 2, 2, NULL, '2018-08-27 12:25:02', '', NULL, 'D'),
(6, 2, 2, NULL, '2018-08-27 13:29:46', '', NULL, ''),
(7, 2, 2, NULL, '2018-08-27 13:31:47', '', NULL, ''),
(8, 2, 2, NULL, '2018-08-27 13:39:04', '', NULL, 'D'),
(9, 2, 2, NULL, '2018-08-28 15:06:46', '', NULL, ''),
(10, 2, 2, NULL, '2018-08-28 15:32:57', '', NULL, ''),
(11, 2, 2, NULL, '2018-08-29 13:36:26', '', NULL, ''),
(12, 2, 2, NULL, '2018-08-29 13:51:28', '', NULL, ''),
(13, 2, 2, NULL, '2018-08-29 13:54:30', '', NULL, ''),
(14, 2, 2, NULL, '2018-08-29 13:54:31', '', NULL, ''),
(15, 2, 2, NULL, '2018-08-29 13:54:33', '', NULL, ''),
(16, 2, 2, NULL, '2018-08-29 13:54:34', '', NULL, ''),
(17, 2, 2, NULL, '2018-08-29 13:54:34', '', NULL, ''),
(18, 2, 2, NULL, '2018-08-29 13:54:34', '', NULL, ''),
(19, 2, 2, NULL, '2018-08-29 13:54:34', '', NULL, ''),
(20, 2, 2, NULL, '2018-08-29 13:54:35', '', NULL, ''),
(21, 2, 2, NULL, '2018-08-29 13:54:35', '', NULL, ''),
(22, 2, 2, NULL, '2018-08-29 13:54:35', '', NULL, ''),
(23, 2, 2, NULL, '2018-08-29 13:54:35', '', NULL, ''),
(24, 2, 2, NULL, '2018-08-29 13:54:35', '', NULL, ''),
(25, 2, 2, NULL, '2018-08-29 13:54:36', '', NULL, ''),
(26, 2, 2, NULL, '2018-08-29 13:54:37', '', NULL, ''),
(27, 2, 2, NULL, '2018-08-29 13:54:37', '', NULL, ''),
(28, 2, 2, NULL, '2018-08-29 13:54:38', '', NULL, ''),
(29, 2, 2, NULL, '2018-08-29 13:54:38', '', NULL, ''),
(30, 2, 2, NULL, '2018-08-29 13:54:38', '', NULL, ''),
(31, 2, 2, NULL, '2018-08-29 13:54:38', '', NULL, ''),
(32, 2, 2, NULL, '2018-08-29 13:54:38', '', NULL, ''),
(33, 2, 2, NULL, '2018-08-29 13:54:39', '', NULL, ''),
(34, 2, 2, NULL, '2018-08-29 13:54:39', '', NULL, ''),
(35, 2, 2, NULL, '2018-08-29 13:54:39', '', NULL, ''),
(36, 2, 2, NULL, '2018-08-29 13:54:39', '', NULL, ''),
(37, 2, 2, NULL, '2018-08-29 13:54:39', '', NULL, ''),
(38, 2, 9937, NULL, '2018-08-29 13:54:40', '0 hrs 4 mins', NULL, ''),
(39, 2, 9937, NULL, '2018-08-29 13:54:40', '0 hrs 2 mins', NULL, ''),
(40, 2, 9933, NULL, '2018-09-25 23:06:06', '0 hrs 2 mins', NULL, 'A'),
(41, 0, 9937, NULL, '2018-09-25 23:39:03', '0 hrs 2 mins', NULL, 'C'),
(42, 0, 9937, NULL, '2018-09-26 12:01:48', '0 hrs 2 mins', NULL, 'F or G'),
(43, 4, 9937, NULL, '2018-09-29 16:58:06', '', NULL, 'A'),
(44, 4, 9937, NULL, '2018-09-29 16:58:57', '', NULL, 'F or G'),
(45, 4, 9937, NULL, '2018-09-29 17:00:22', '', NULL, 'A'),
(46, 4, 9937, NULL, '2018-09-29 17:38:19', '', NULL, 'B'),
(47, 4, 9937, NULL, '2018-09-29 20:32:27', '', NULL, 'B'),
(48, 4, 9937, NULL, '2018-09-29 20:56:21', '', NULL, 'B'),
(49, 4, 9937, NULL, '2018-09-29 22:27:49', '', NULL, 'B'),
(50, 4, 9937, NULL, '2018-09-29 22:50:13', '', NULL, 'A'),
(51, 4, 9937, NULL, '2018-09-29 22:53:37', '', NULL, 'A'),
(52, 4, 9937, NULL, '2018-09-29 23:14:53', '', NULL, 'A'),
(53, 4, 9937, NULL, '2018-09-29 23:25:52', '', NULL, 'B'),
(54, 4, 9937, NULL, '2018-09-29 23:50:04', '', NULL, 'B'),
(55, 4, 9937, NULL, '2018-09-30 00:17:45', '', NULL, 'A'),
(56, 4, 9937, NULL, '2018-09-30 00:53:49', '', NULL, 'B'),
(57, 4, 9937, NULL, '2018-09-30 12:52:07', '', NULL, 'C'),
(58, 4, 9937, NULL, '2018-09-30 13:12:06', '', NULL, 'B'),
(59, 5, 9938, NULL, '2018-09-30 13:21:59', '', NULL, 'B'),
(60, 5, 9938, NULL, '2018-09-30 13:40:23', '', NULL, 'B'),
(61, 5, 9938, NULL, '2018-09-30 17:26:37', '', NULL, 'C'),
(62, 5, 9938, NULL, '2018-09-30 18:08:16', '', NULL, 'B'),
(63, 5, 9938, NULL, '2018-09-30 19:00:33', '', NULL, 'D'),
(64, 6, 9939, NULL, '2018-09-30 19:08:52', '', NULL, 'B'),
(65, 6, 9939, NULL, '2018-09-30 19:11:41', '', NULL, 'B'),
(66, 6, 9939, NULL, '2018-09-30 22:10:45', '', NULL, 'B'),
(67, 6, 9939, NULL, '2018-10-01 10:56:37', '', NULL, 'B'),
(68, 6, 9939, NULL, '2018-10-01 14:05:04', '', NULL, 'B'),
(69, 7, 9941, NULL, '2018-10-01 14:59:07', '', NULL, 'B'),
(70, 4, 9937, NULL, '2018-10-01 16:12:20', '', NULL, 'F or G'),
(71, 5, 9938, NULL, '2018-10-03 16:19:40', '', NULL, 'B'),
(72, 7, 9941, NULL, '2018-10-03 16:26:23', '', NULL, 'B'),
(73, 7, 9941, NULL, '2018-10-04 17:28:35', '', NULL, 'D'),
(74, 7, 9941, NULL, '2018-10-04 17:56:03', '', NULL, 'B'),
(75, 7, 9941, NULL, '2018-10-05 09:53:46', '', NULL, 'C'),
(76, 8, 9942, NULL, '2018-10-05 10:25:27', '', NULL, 'C'),
(77, 8, 9942, NULL, '2018-10-05 10:27:36', '', NULL, 'B'),
(78, 8, 9942, NULL, '2018-10-05 10:28:25', '', NULL, 'B'),
(79, 0, 9943, NULL, '2018-10-05 10:33:06', '', NULL, 'B'),
(80, 12, 9946, NULL, '2018-10-05 11:22:14', '', NULL, 'B'),
(81, 13, 9947, NULL, '2018-10-05 11:37:44', '', NULL, 'D'),
(82, 13, 9947, NULL, '2018-10-05 11:43:11', '', NULL, 'C'),
(83, 14, 9948, NULL, '2018-10-05 11:55:03', '', NULL, 'E'),
(84, 15, 9949, NULL, '2018-10-05 12:02:32', '', NULL, 'E'),
(85, 15, 9949, NULL, '2018-10-05 12:10:25', '', NULL, 'E'),
(86, 16, 9950, NULL, '2018-10-05 12:27:18', '', NULL, 'E'),
(87, 17, 9951, NULL, '2018-10-05 12:33:51', '', NULL, 'E'),
(88, 18, 9952, NULL, '2018-10-05 12:40:17', '', NULL, 'F or G'),
(89, 19, 9953, NULL, '2018-10-05 12:44:43', '', NULL, 'E'),
(90, 19, 9953, NULL, '2018-10-05 16:32:06', '', NULL, 'D'),
(91, 7, 9941, NULL, '2018-10-07 12:56:04', '', NULL, 'D'),
(92, 6, 9939, NULL, '2018-10-08 17:42:11', '', NULL, 'B'),
(93, 6, 9939, NULL, '2018-10-08 19:51:08', '', NULL, 'B'),
(94, 6, 9939, NULL, '2018-10-08 20:48:26', '', NULL, 'C'),
(95, 6, 9939, NULL, '2018-10-09 11:09:50', '', NULL, 'C'),
(96, 6, 9939, NULL, '2018-10-09 12:27:47', '', NULL, 'C'),
(97, 6, 9939, NULL, '2018-10-09 12:29:45', '', NULL, 'B'),
(98, 6, 9939, NULL, '2018-10-10 11:06:01', '', NULL, 'E'),
(99, 26, 9962, NULL, '2018-10-10 14:42:25', '', NULL, 'C'),
(100, 26, 9962, NULL, '2018-10-10 15:26:42', '', NULL, 'F or G'),
(101, 26, 9962, NULL, '2018-10-10 16:50:08', '', NULL, 'E'),
(102, 26, 9962, NULL, '2018-10-10 16:53:33', '', NULL, 'C'),
(103, 26, 9962, NULL, '2018-10-10 17:52:44', '', NULL, 'D'),
(104, 6, 9939, NULL, '2018-10-11 12:36:14', '', NULL, 'D'),
(105, 26, 9962, NULL, '2018-10-11 13:19:39', '', NULL, 'C'),
(106, 26, 9962, NULL, '2018-10-11 15:39:54', '', NULL, 'E'),
(107, 26, 9962, NULL, '2018-10-11 15:42:40', '', NULL, 'D'),
(108, 26, 9962, NULL, '2018-10-11 15:45:14', '', NULL, 'E'),
(109, 26, 9962, NULL, '2018-10-11 15:47:10', '', NULL, 'F or G'),
(110, 26, 9962, NULL, '2018-10-11 15:49:02', '', NULL, 'F or G'),
(111, 26, 9962, NULL, '2018-10-11 15:50:40', '', NULL, 'F or G'),
(112, 26, 9962, NULL, '2018-10-11 15:52:16', '', NULL, 'C'),
(113, 26, 9962, NULL, '2018-10-12 12:46:54', '', NULL, 'E'),
(114, 6, 9939, NULL, '2018-10-12 13:33:42', '', NULL, 'F or G'),
(115, 19, 9953, NULL, '2018-10-12 13:40:36', '', NULL, 'F or G'),
(116, 26, 9962, NULL, '2018-10-12 13:41:58', '', NULL, 'B'),
(117, 6, 9939, NULL, '2018-10-16 14:34:28', '', NULL, 'C'),
(118, 6, 9939, NULL, '2018-10-17 12:47:24', '', NULL, 'F or G'),
(119, 6, 9939, NULL, '2018-10-17 12:55:40', '', NULL, 'D'),
(120, 6, 9939, NULL, '2018-10-17 13:05:13', '', NULL, 'C'),
(121, 6, 9939, NULL, '2018-10-17 13:45:22', '', NULL, 'C'),
(122, 6, 9939, NULL, '2018-10-17 13:47:53', '', NULL, 'C'),
(123, 6, 9939, NULL, '2018-10-17 14:05:40', '', NULL, 'D'),
(124, 6, 9939, NULL, '2018-10-17 14:29:13', '', NULL, 'D'),
(125, 6, 9939, NULL, '2018-10-17 14:30:10', '', NULL, 'C'),
(126, 6, 9939, NULL, '2018-10-17 14:35:05', '', NULL, 'C'),
(127, 6, 9939, NULL, '2018-10-17 14:36:08', '', NULL, 'C'),
(128, 6, 9939, NULL, '2018-10-17 14:36:48', '', NULL, 'C'),
(129, 6, 9939, NULL, '2018-10-17 14:44:52', '', NULL, 'C'),
(130, 6, 9939, NULL, '2018-10-17 14:45:42', '', NULL, 'C'),
(131, 6, 9939, NULL, '2018-10-17 14:46:32', '', NULL, 'B'),
(132, 6, 9939, NULL, '2018-10-17 14:53:13', '', NULL, 'B'),
(133, 6, 9939, NULL, '2018-10-17 14:55:13', '', NULL, 'C'),
(134, 6, 9939, NULL, '2018-10-17 15:00:43', '', NULL, 'C'),
(135, 6, 9939, NULL, '2018-10-17 15:04:05', '', NULL, 'C'),
(136, 6, 9939, NULL, '2018-10-17 15:12:47', '', NULL, 'C'),
(137, 6, 9939, NULL, '2018-10-17 15:37:30', '', NULL, 'C'),
(138, 6, 9939, NULL, '2018-10-17 15:39:08', '', NULL, 'C'),
(139, 6, 9939, NULL, '2018-10-17 15:41:00', '', NULL, 'B'),
(140, 6, 9939, NULL, '2018-10-17 15:43:02', '', NULL, ''),
(141, 6, 9939, NULL, '2018-10-17 15:43:38', '', NULL, 'C'),
(142, 6, 9939, NULL, '2018-10-17 15:54:49', '', NULL, 'B'),
(143, 6, 9939, NULL, '2018-10-17 15:55:36', '', NULL, 'C'),
(144, 6, 9939, NULL, '2018-10-17 16:07:18', '', NULL, 'D'),
(145, 6, 9939, NULL, '2018-10-17 16:09:10', '', NULL, 'A'),
(146, 6, 9939, NULL, '2018-10-17 16:36:00', '', NULL, 'C'),
(147, 6, 9939, NULL, '2018-10-17 16:45:32', '', NULL, 'D'),
(148, 6, 9939, NULL, '2018-10-17 16:48:17', '', NULL, 'C'),
(149, 6, 9939, NULL, '2018-10-17 16:49:05', '', NULL, 'F or G'),
(150, 6, 9939, NULL, '2018-10-17 16:52:09', '', NULL, 'C'),
(151, 6, 9939, NULL, '2018-10-17 16:53:44', '', NULL, ''),
(152, 6, 9939, '2018-10-17 16:54:06', '2018-10-17 16:53:45', '', NULL, 'C'),
(153, 6, 9939, '2018-10-17 16:57:52', '2018-10-17 16:57:31', '', NULL, 'E'),
(154, 6, 9939, '2018-10-17 16:59:37', '2018-10-17 16:59:23', '', NULL, 'C'),
(155, 6, 9939, '2018-10-17 17:02:54', '2018-10-17 17:02:37', '17 hrs 2 mins', '2018-10-17 17:02:54', 'D'),
(156, 6, 9939, NULL, '2018-10-18 13:54:12', '', NULL, 'C'),
(157, 27, 9963, '2018-10-22 15:14:51', '2018-10-22 15:14:30', '15 hrs 14 mins', '2018-10-22 15:14:51', 'E'),
(158, 6, 9939, '2018-10-23 14:55:12', '2018-10-23 14:43:53', '14 hrs 55 mins', '2018-10-23 14:55:12', 'F or G'),
(159, 32, 9968, NULL, '2018-10-23 16:42:50', '', NULL, 'E'),
(160, 32, 9968, '2018-10-24 15:30:50', '2018-10-24 15:00:41', '15 hrs 30 mins', '2018-10-24 15:30:50', 'D'),
(161, 32, 9968, '2018-10-24 17:02:25', '2018-10-24 16:32:18', '17 hrs 2 mins', '2018-10-24 17:02:26', 'E'),
(162, 32, 9968, '2018-10-25 11:17:47', '2018-10-25 10:47:36', '11 hrs 17 mins', '2018-10-25 11:17:47', 'C'),
(163, 0, 9968, '2018-10-25 13:03:20', '2018-10-25 12:33:12', '13 hrs 3 mins', '2018-10-25 13:03:20', 'D'),
(164, 0, 9968, '2018-10-25 14:04:07', '2018-10-25 13:54:54', '14 hrs 4 mins', '2018-10-25 14:04:07', 'F or G'),
(165, 0, 9967, '2018-10-25 14:06:35', '2018-10-25 14:04:26', '14 hrs 6 mins', '2018-10-25 14:06:35', 'D'),
(166, 33, 9969, '2018-10-25 14:12:21', '2018-10-25 14:10:50', '14 hrs 12 mins', '2018-10-25 14:12:21', 'D'),
(167, 33, 9969, '2018-10-25 14:42:45', '2018-10-25 14:12:39', '14 hrs 42 mins', '2018-10-25 14:42:45', 'C'),
(168, 33, 9969, '2018-10-26 12:06:26', '2018-10-26 11:02:20', '12 hrs 6 mins', '2018-10-26 12:06:27', 'E'),
(169, 33, 9969, '2018-10-26 12:29:08', '2018-10-26 12:06:34', '12 hrs 29 mins', '2018-10-26 12:29:08', 'D'),
(170, 33, 9969, '2018-10-26 12:38:27', '2018-10-26 12:31:53', '12 hrs 38 mins', '2018-10-26 12:38:27', 'D');

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `stats_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `nextSession` varchar(300) DEFAULT NULL,
  `activeSubSection` int(11) NOT NULL,
  `noOfExercisesCompleted` int(11) NOT NULL,
  `prSectionId` int(11) NOT NULL,
  `currentSection` int(11) NOT NULL,
  `noOfSectionsCompleted` int(11) NOT NULL,
  `remindersNeeded` int(11) NOT NULL,
  `currentSubSection` int(11) NOT NULL,
  `noOfSubSectionsCompleted` int(11) NOT NULL,
  `noOfTimesLoggedIn` int(11) NOT NULL,
  `activeSection` int(11) NOT NULL,
  `userCreationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('true','false') NOT NULL,
  `blockedSection` varchar(400) DEFAULT NULL,
  `prSections` varchar(400) DEFAULT NULL,
  `currentOptionalSection` int(11) DEFAULT NULL,
  `currentOptionalSubSection` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stats`
--

INSERT INTO `stats` (`stats_id`, `user_id`, `nextSession`, `activeSubSection`, `noOfExercisesCompleted`, `prSectionId`, `currentSection`, `noOfSectionsCompleted`, `remindersNeeded`, `currentSubSection`, `noOfSubSectionsCompleted`, `noOfTimesLoggedIn`, `activeSection`, `userCreationTime`, `status`, `blockedSection`, `prSections`, `currentOptionalSection`, `currentOptionalSubSection`) VALUES
(1, 1, '09-05-2018 10:00 PM', 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, '0000-00-00 00:00:00', 'true', NULL, NULL, NULL, NULL),
(2, 9933, '09-05-2018 10:00 PM', 11, 9, 0, 9, 9, 0, 7, 7, 7, 7, '2018-08-21 18:30:00', '', '7,6,5,4', NULL, NULL, NULL),
(3, 2, '09-05-2018 10:00 PM', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '0000-00-00 00:00:00', 'true', NULL, NULL, NULL, NULL),
(4, 9937, '09-05-2018 10:00 PM', 7, 22, 0, 6, 0, 0, 7, 6, 0, 6, '0000-00-00 00:00:00', 'true', '4,5,6,9,5,7,8', '1,15', 0, NULL),
(5, 9938, '2018-09-30 12:52:43', 1, 2, 2, 1, 2, 2, 1, 1, 0, 1, '2018-09-30 07:50:28', 'false', '7,8,5', '2,8,11', NULL, NULL),
(6, 9939, '25-10-2018 1:00 AM', 1, 30, 0, 11, 10, 2, 0, 0, 0, 12, '2018-09-10 13:37:07', 'false', '5,9,3,4,6,7', '3,13', NULL, NULL),
(7, 9941, '09-05-2018 10:00 PM', 1, 2, 0, 1, 4, 0, 1, 1, 0, 1, '2018-10-01 09:27:24', 'false', '4,7', '4,11', NULL, NULL),
(8, 9942, '09-05-2018 10:00 PM', 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, '0000-00-00 00:00:00', 'false', NULL, NULL, NULL, NULL),
(9, 9942, '09-05-2018 10:00 PM', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2018-10-09 18:30:00', 'false', NULL, NULL, NULL, NULL),
(10, 9944, '09-05-2018 10:00 PM', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2018-10-05 05:11:44', 'true', NULL, NULL, NULL, NULL),
(11, 9945, '09-05-2018 10:00 PM', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2018-10-05 05:37:13', 'true', NULL, NULL, NULL, NULL),
(12, 9946, '09-05-2018 10:00 PM', 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, '2018-10-05 05:51:25', 'true', NULL, NULL, NULL, NULL),
(13, 9947, '09-05-2018 10:00 PM', 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, '2018-10-05 06:05:56', 'false', NULL, NULL, NULL, NULL),
(14, 9948, '09-05-2018 10:00 PM', 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, '2018-10-05 06:22:11', 'true', NULL, NULL, NULL, NULL),
(15, 9949, '09-05-2018 10:00 PM', 1, 2, 0, 1, 0, 0, 1, 1, 0, 1, '2018-10-05 06:32:02', 'false', NULL, NULL, NULL, NULL),
(16, 9950, '09-05-2018 10:00 PM', 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, '2018-10-05 06:56:31', 'true', NULL, NULL, NULL, NULL),
(17, 9951, '09-05-2018 10:00 PM', 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, '2018-10-05 07:03:30', 'true', NULL, '4,6,4', NULL, NULL),
(18, 9952, '09-05-2018 10:00 PM', 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, '2018-10-05 07:09:55', 'true', NULL, '2,3,4', NULL, NULL),
(19, 9953, '16-10-2018 1:30 AM', 5, 14, 0, 4, 1, 2, 5, 4, 0, 4, '2018-10-05 07:12:47', 'false', NULL, '4,5,13,15,', NULL, NULL),
(23, 9960, '09-05-2018 10:00 PM', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2018-10-10 06:06:12', 'true', NULL, NULL, NULL, NULL),
(24, 9960, '09-05-2018 10:00 PM', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2018-10-10 06:10:18', 'true', NULL, NULL, NULL, NULL),
(25, 9961, '09-05-2018 10:00 PM', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2018-10-10 07:59:27', 'true', '4', NULL, NULL, NULL),
(26, 9962, '16-10-2018 1:30 AM', 1, 30, 0, 11, 10, 2, 0, 0, 0, 2, '2018-10-10 09:10:52', 'false', NULL, '3,4,8,11,', NULL, NULL),
(27, 9963, '23-10-2018 12:30 AM', 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, '2018-10-22 09:42:09', 'true', NULL, NULL, NULL, NULL),
(33, 9969, '27-10-2018 2:30 AM', 1, 30, 0, 11, 10, 2, 0, 0, 0, 13, '2018-10-25 08:38:56', 'false', NULL, '4,8,12,', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `users_id` int(10) UNSIGNED NOT NULL,
  `id` int(11) DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `mode` enum('active','Inactive') DEFAULT NULL,
  `flag` enum('true','false') DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `self_registration` enum('false','true') NOT NULL DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`users_id`, `id`, `name`, `password`, `mode`, `flag`, `email`, `self_registration`) VALUES
(0, NULL, 'admin', '1234', 'active', 'true', 'g@h.com', 'false'),
(9936, 7645, 'hhhh', 'h77881', 'active', 'false', 'narasimham.i@iiitb.ac.in', 'false'),
(9937, 234, 'narasimham', '1234', 'Inactive', 'false', 'h@h.com', 'false'),
(9939, 567, 'simha1', '1234', 'active', 'false', 'H@gmail.com', 'false'),
(9941, 657, 'newuser', '1234', 'Inactive', 'false', 'D@h.com', 'false'),
(9942, 6572, 'newuser1', '1234', 'active', 'false', 'D@h.com', 'false'),
(9943, NULL, 'simhaTest', '1234', 'active', 'false', 'h@h.com', 'false'),
(9944, NULL, 'simha31', '1234', 'active', NULL, 'bn@H.com', 'false'),
(9945, NULL, 'hhhsds', 'asasas', 'active', NULL, 'dsdss@gmail.co', 'false'),
(9946, NULL, 'simha3', '1234', 'active', NULL, 'H@j.com', 'false'),
(9947, NULL, 'simha4', '1234', 'active', NULL, 'f@g.com', 'false'),
(9948, NULL, 'simha5', '1234', 'active', NULL, 'd@g.com', 'false'),
(9949, NULL, 'simha6', '1234', 'active', NULL, 'ddsdsdsd', 'false'),
(9950, NULL, 'simha7', '1234', 'active', NULL, 'njjnnjj', 'false'),
(9951, NULL, 'simha8', '1234', 'active', NULL, 'njnjnjn', 'false'),
(9952, NULL, 'simha9', '1234', 'active', NULL, 'sdsdsdsd', 'false'),
(9953, NULL, 'simha10', '1234', 'active', NULL, 'sdsd', 'false'),
(9961, NULL, 'narasimham1231@gmail.com', '543', 'active', NULL, 'narasimham1231@gmail.com', 'false'),
(9962, NULL, '123456', '123456', 'active', 'false', 'h@g.com', 'false'),
(9966, NULL, 'jjsdkjsdksdk', '12345', 'active', NULL, 'W@H.com', 'false'),
(9967, NULL, 'lotus1216@gmail.com', '1234', 'active', NULL, 'lotus1216@gmail.com', 'true'),
(9968, NULL, 'adminuser', '1234', 'active', NULL, 'g@j.com', 'false'),
(9969, NULL, 'narasimham.iyenaparthi@gmail.com', '1234', 'active', NULL, 'narasimham.iyenaparthi@gmail.com', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `user_info_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `checkpoint` varchar(100) DEFAULT NULL,
  `fname` varchar(100) DEFAULT NULL,
  `livingArrangement` varchar(100) DEFAULT NULL,
  `education` varchar(100) DEFAULT NULL,
  `gender` enum('male','female') NOT NULL,
  `mobileNumber` varchar(100) DEFAULT NULL,
  `significantOther` varchar(100) DEFAULT NULL,
  `age` int(11) NOT NULL,
  `maritalStatus` varchar(100) DEFAULT NULL,
  `agreed` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`user_info_id`, `user_id`, `checkpoint`, `fname`, `livingArrangement`, `education`, `gender`, `mobileNumber`, `significantOther`, `age`, `maritalStatus`, `agreed`, `created_at`) VALUES
(1, 62, 'false', 'simha', 'yes', 'b.tech', 'male', '9010160431', 'NOONE', 25, 'single', 'false', '2018-09-29 14:55:14'),
(2, 9936, 'false', 'hhh', 'jjjjj', 'jjjj', 'male', '567899', 'njjj', 34, 'Single', 'true', '2018-09-29 12:05:14'),
(3, 9937, 'true', 'Simha', 'kkkjk', 'b.tech', 'male', '987600000', 'njnjn', 45, 'Single', 'true', '2018-09-29 15:26:48'),
(4, 62, '0', 'nara', 'yes', 'b.tech', 'male', '9876543210', 'no', 23, 'single', '0', '2018-09-29 09:02:46'),
(5, 9938, 'true', 'narasimha1231', 'yes', 'b.tech 4 years', 'female', '8861357885', 'no', 25, 'Single', 'true', '2018-10-04 12:24:59'),
(6, 9939, 'true', 'narasimham', 'Yes', 'b.tech4', 'male', '8861357885', 'No', 26, 'Single', 'true', '2018-09-30 13:42:37'),
(7, 9941, 'true', 'jjhjhjh', 'xssdsd', 'jjhjh', 'male', '89765432', 'sds', 45, 'Single', 'true', '2018-10-01 09:29:36'),
(8, 9942, 'true', 'jjhjhjh', 'xssdsd', 'jjhjh', 'male', '89765432', 'sds', 45, 'Single', 'true', '2018-10-05 04:58:44'),
(9, 9946, 'true', 'kdksdksdk', 'mmmm', 'kmkm', 'male', 'kmkmkmk', 'mmkmk', 34, 'Married', 'true', '2018-10-05 05:53:18'),
(10, 9947, 'true', 'sdsasas', 'aaAA', 'fdds', 'female', 'asasass', 'asasasas', 23, 'Single', 'true', '2018-10-05 06:13:27'),
(11, 9948, 'true', 'ndnsdmnsd', 'nnnnnjn', 'skdmkmsd', 'male', 'kkkmkmkmk', 'nmmmmm', 43, 'Married', 'true', '2018-10-05 06:25:42'),
(12, 9949, 'true', 'ssasas', 'asasas', 'ssss', 'male', 'asasasasas', 'asasas', 43, 'Single', 'true', '2018-10-05 06:40:46'),
(13, 9950, 'true', 'hjjjj', 'nnn', 'ewee', 'male', 'nnnmnm', 'kkkdk', 23, 'Single', 'true', '2018-10-05 06:58:02'),
(14, 9951, 'true', 'nndndnjdn', 'njnjnjnjn', 'nknnn', 'male', 'nnjjnjnjnjn', 'njjjn', 32, 'Single', 'true', '2018-10-05 07:04:35'),
(15, 9952, 'true', 'sdsdsdsd', 'dsdsdsd', '3333', 'male', 'ddfdds', 'sdsdsd', 54, 'Single', 'true', '2018-10-05 07:11:10'),
(16, 9953, 'true', 'dsssdsd', 'sdsdsd', 'dsdsd', 'male', 'sdsdsd', 'sdsds', 43, 'Single', 'true', '2018-10-05 07:15:13'),
(21, 9960, 'false', NULL, NULL, '1', 'female', NULL, NULL, 23, 'single', 'false', '2018-10-10 06:10:18'),
(22, 9961, 'false', NULL, NULL, '1', 'female', NULL, NULL, 45, 'married', 'false', '2018-10-10 07:59:27'),
(23, 9962, 'true', 'sfssdsdsd', 'ddd', 'b.tech', 'male', '987654321', 'dfdfdf', 45, 'Single', 'true', '2018-10-10 09:12:54'),
(24, 9962, 'true', 'sfssdsdsd', 'ddd', 'b.tech', 'male', '987654321', 'dfdfdf', 45, 'Single', 'true', '2018-10-10 09:12:54'),
(25, 9963, 'false', NULL, NULL, '2', 'male', NULL, NULL, 34, 'married', 'false', '2018-10-22 09:42:09'),
(26, 9964, 'false', NULL, NULL, '1', 'male', NULL, NULL, 23, 'single', 'false', '2018-10-23 09:28:55'),
(27, 9965, 'false', 'sdssdsd', 'sdsdsd', 'sddssd', 'male', 'dssdsdsd', 'sdsdd', 23, 'Single', 'false', '2018-10-23 09:31:49'),
(28, 9965, 'false', 'sdssdsd', 'sdsdsd', 'sddssd', 'male', 'dssdsdsd', 'sdsdd', 23, 'Single', 'false', '2018-10-23 09:31:49'),
(29, 9966, 'false', 'jjjwjjj', 'njsdsd', 'dksdk', 'male', 'jdksdksdkj', 'odsdjkjdk', 43, 'Single', 'false', '2018-10-23 09:50:54'),
(30, 9966, 'false', 'jjjwjjj', 'njsdsd', 'dksdk', 'male', 'jdksdksdkj', 'odsdjkjdk', 43, 'Single', 'false', '2018-10-23 09:50:54'),
(31, 9967, 'false', NULL, NULL, '1', 'male', NULL, NULL, 45, 'single', 'false', '2018-10-23 10:07:17'),
(32, 9968, 'true', 'assdsd', 'sdsdsdsd', 'dsdsdsd', 'female', 'sdsdsdsd', 'dsdsdssd', 24, 'Single', 'true', '2018-10-25 08:33:02'),
(33, 9968, 'true', 'assdsd', 'sdsdsdsd', 'dsdsdsd', 'female', 'sdsdsdsd', 'dsdsdssd', 24, 'Single', 'true', '2018-10-25 08:33:02'),
(34, 9969, 'true', NULL, NULL, '1', 'male', NULL, NULL, 34, 'married', 'true', '2018-10-25 08:41:19');

-- --------------------------------------------------------

--
-- Table structure for table `user_reg_info`
--

CREATE TABLE `user_reg_info` (
  `user_reg_info_1_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `reg_form_num` int(11) NOT NULL,
  `response` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_reg_info`
--

INSERT INTO `user_reg_info` (`user_reg_info_1_id`, `user_id`, `reg_form_num`, `response`) VALUES
(12, 9961, 1, 'ddd#@@#1#@@#yes#@@#yes#@@#1'),
(13, 9961, 2, 'undefined0#1#2#3#2#2#2#2#1##@@#No@Yes@Somewhat likely@No#@@#$(''input[name=radio_long]:checked'').val()#@@#no infer'),
(14, 9961, 3, '0#1#2#2#1#1#1#@@#undefined0@1@2@2@1@1@1@'),
(15, 9961, 4, 'Yes#Yes#@@#undefined4@5@6@'),
(16, 9963, 1, 'narasimham#@@#1#@@#yes#@@#no#@@#1'),
(17, 9963, 2, 'undefined0#1#2#2#2#2#1#1#1##@@#Yes@No@Somewhat likely@Yes#@@#$(''input[name=radio_long]:checked'').val()#@@#no infer'),
(18, 9963, 3, '0#1#1#1#0#1#1#@@#undefined0@1@1@1@0@1@1@'),
(19, 9963, 4, 'Yes#Yes#@@#undefined2@3@5@13@'),
(20, 9964, 1, 'sdsddss#@@#2#@@#yes#@@#yes#@@#1'),
(21, 9964, 2, 'undefined0#1#2#2#2#1#0#1#1##@@#Yes@Yes@Somewhat likely@No#@@#$(''input[name=radio_long]:checked'').val()#@@#no infer'),
(22, 9964, 3, '0#1#2#3#2#1#0#@@#undefined0@1@2@3@2@1@0@'),
(23, 9964, 4, 'No#Yes#@@#undefined3@7@9@10@13@'),
(24, 9967, 1, 'jjjhjh#@@#1#@@#yes#@@#yes#@@#1'),
(25, 9967, 2, 'undefined1#1#1#1#1#2#2#2#1##@@#Yes@Yes@Somewhat likely@Yes#@@#$(''input[name=radio_long]:checked'').val()#@@#undefined'),
(26, 9967, 3, '1#1#1#1#1#1#1#@@#undefined1@1@1@1@1@1@1@'),
(27, 9967, 4, 'Yes#Yes#@@#undefined1@2@8@9@13@'),
(28, 9969, 1, 'dsdsd#@@#1#@@#yes#@@#yes#@@#1'),
(29, 9969, 2, 'undefined0#1#2#2#1#0#1#1#1##@@#No@No@Somewhat likely@No#@@#$(''input[name=radio_long]:checked'').val()#@@#undefined'),
(30, 9969, 3, '0#1#1#1#1#1#1#@@#undefined0@1@1@1@1@1@1@'),
(31, 9969, 4, 'Yes#Yes#@@#undefined1@2@9@');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `depressed_res`
--
ALTER TABLE `depressed_res`
  ADD PRIMARY KEY (`depressed_res_id`);

--
-- Indexes for table `pushd_notes`
--
ALTER TABLE `pushd_notes`
  ADD PRIMARY KEY (`pushd_notes_id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`sections_pk_id`);

--
-- Indexes for table `section_feedback`
--
ALTER TABLE `section_feedback`
  ADD PRIMARY KEY (`section_feedback_id`);

--
-- Indexes for table `sessionstats`
--
ALTER TABLE `sessionstats`
  ADD PRIMARY KEY (`sessionStats_id`),
  ADD KEY `users_id` (`users_id`),
  ADD KEY `stats_id` (`stats_id`);

--
-- Indexes for table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`stats_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`user_info_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_id_2` (`user_id`);

--
-- Indexes for table `user_reg_info`
--
ALTER TABLE `user_reg_info`
  ADD PRIMARY KEY (`user_reg_info_1_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `depressed_res`
--
ALTER TABLE `depressed_res`
  MODIFY `depressed_res_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `pushd_notes`
--
ALTER TABLE `pushd_notes`
  MODIFY `pushd_notes_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `sections_pk_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `section_feedback`
--
ALTER TABLE `section_feedback`
  MODIFY `section_feedback_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `sessionstats`
--
ALTER TABLE `sessionstats`
  MODIFY `sessionStats_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;
--
-- AUTO_INCREMENT for table `stats`
--
ALTER TABLE `stats`
  MODIFY `stats_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `users_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9970;
--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `user_info_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `user_reg_info`
--
ALTER TABLE `user_reg_info`
  MODIFY `user_reg_info_1_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
