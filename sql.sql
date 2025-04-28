# ************************************************************
# Sequel Ace SQL dump
# 版本号： 20090
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# 主机: 8.134.210.237 (MySQL 5.7.44)
# 数据库: tomato_work
# 生成时间: 2025-04-28 08:52:02 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# 转储表 bill_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bill_types`;

CREATE TABLE `bill_types` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `uid` int(11) NOT NULL,
  `sort_index` tinyint(4) NOT NULL DEFAULT '0' COMMENT '排序',
  `name` varchar(20) NOT NULL DEFAULT '',
  `type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1=收入, 2=支出',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资金流动类型';



# 转储表 bills
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bills`;

CREATE TABLE `bills` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `uid` int(11) NOT NULL,
  `price` decimal(19,2) NOT NULL DEFAULT '0.00',
  `date` bigint(13) NOT NULL,
  `type_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `remark` varchar(250) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `imgs` longtext,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `bill_types` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='资金流动';



# 转储表 company
# ------------------------------------------------------------

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一ID',
  `uid` int(11) NOT NULL COMMENT '用户ID',
  `company_name` varchar(30) NOT NULL DEFAULT '' COMMENT '单位名称',
  `start_date` datetime NOT NULL COMMENT '入职日期',
  `end_date` datetime DEFAULT NULL COMMENT '离职日期, null 为至今',
  `remark` text NOT NULL COMMENT '描述、备注信息',
  `amount` decimal(19,2) NOT NULL COMMENT '薪资',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expect_leave_date` datetime DEFAULT NULL COMMENT '期望（计划）离职日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='公司单位';



# 转储表 inner_messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `inner_messages`;

CREATE TABLE `inner_messages` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `uid` int(11) NOT NULL,
  `content` varchar(250) NOT NULL DEFAULT '',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '消息类型, 0=系统消息',
  `has_read` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否已读',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='站内消息';



# 转储表 logs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `logs`;

CREATE TABLE `logs` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '唯一ID',
  `uid` int(11) NOT NULL COMMENT '用户ID',
  `company_id` varchar(255) NOT NULL COMMENT '单位ID, -1=无',
  `log_type` tinyint(4) NOT NULL COMMENT '日志类型, 1=日报、2=周报、3=月报',
  `done_content` text NOT NULL COMMENT '完成内容',
  `undone_content` text NOT NULL COMMENT '未完成内容',
  `plan_content` text NOT NULL COMMENT '计划内容',
  `summary_content` text NOT NULL COMMENT '工作总结',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='日志管理';



# 转储表 memorandums
# ------------------------------------------------------------

DROP TABLE IF EXISTS `memorandums`;

CREATE TABLE `memorandums` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `uid` int(11) NOT NULL,
  `sort_index` tinyint(4) NOT NULL DEFAULT '0' COMMENT '排序',
  `title` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `markdown` longtext,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='备忘录';



# 转储表 reminders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `reminders`;

CREATE TABLE `reminders` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `uid` int(11) NOT NULL COMMENT '用户ID',
  `content` varchar(200) NOT NULL DEFAULT '',
  `date` bigint(13) NOT NULL,
  `type` tinyint(1) DEFAULT '1' COMMENT '事项类型, 1=待提醒, 2=已提醒',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='事项提醒';



# 转储表 tasks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `uid` int(11) NOT NULL COMMENT '用户ID',
  `content` varchar(200) NOT NULL DEFAULT '',
  `date` bigint(13) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '进度类型: 1=待作业, 2=作业中, 3=已完成, 4=未完成',
  `count` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='今日待办';



# 转储表 todo_lists
# ------------------------------------------------------------

DROP TABLE IF EXISTS `todo_lists`;

CREATE TABLE `todo_lists` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `uid` int(11) NOT NULL,
  `content` text NOT NULL COMMENT '备注信息',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态, 1=进行中, 2=完成',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动清单';



# 转储表 user_configures
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_configures`;

CREATE TABLE `user_configures` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `uid` int(11) NOT NULL,
  `is_task_notify` tinyint(1) NOT NULL DEFAULT '1' COMMENT '待办任务通知',
  `is_matter_notify` tinyint(1) NOT NULL DEFAULT '1' COMMENT '提醒事项通知',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `server_chan_sckey` varchar(200) NOT NULL DEFAULT '' COMMENT 'server酱SCKEY',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户配置表';



# 转储表 users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `uid` int(11) NOT NULL,
  `provider` varchar(10) NOT NULL DEFAULT 'github',
  `login_name` varchar(50) NOT NULL DEFAULT '',
  `username` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(32) NOT NULL DEFAULT '',
  `token` varchar(255) NOT NULL DEFAULT '',
  `avatar_url` varchar(255) NOT NULL DEFAULT '',
  `location` varchar(255) NOT NULL DEFAULT '',
  `bio` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `ip_addr` varchar(20) NOT NULL DEFAULT '',
  `role` tinyint(1) NOT NULL DEFAULT '1' COMMENT '权限，1=正常',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
