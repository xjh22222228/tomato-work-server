create table bill_types
(
    id         char(36) collate utf8_bin default '' not null
        primary key,
    uid        int                                  not null,
    sort_index tinyint                   default 0  not null comment '排序',
    name       varchar(20)               default '' not null,
    type       tinyint                   default 1  not null comment '1=收入, 2=支出',
    created_at datetime                             not null,
    updated_at datetime                             not null
)
    comment '资金流动类型' charset = utf8;

create table bills
(
    id         char(36) collate utf8_bin   not null
        primary key,
    uid        int                         not null,
    price      decimal(19, 2) default 0.00 not null,
    date       bigint(13)                  not null,
    type_id    char(36) collate utf8_bin   null,
    remark     varchar(250)                null,
    created_at datetime                    not null,
    updated_at datetime                    not null,
    imgs       longtext                    null,
    constraint bills_ibfk_1
        foreign key (type_id) references bill_types (id)
            on update cascade
)
    comment '资金流动' charset = utf8mb4;

create index type_id
    on bills (type_id);

create table company
(
    id                char(36) collate utf8mb4_bin not null comment '唯一ID'
        primary key,
    uid               int                          not null comment '用户ID',
    company_name      varchar(30) default ''       not null comment '单位名称',
    start_date        datetime                     not null comment '入职日期',
    end_date          datetime                     null comment '离职日期, null 为至今',
    remark            text                         not null comment '描述、备注信息',
    amount            decimal(19, 2)               not null comment '薪资',
    created_at        datetime                     not null,
    updated_at        datetime                     not null,
    expect_leave_date datetime                     null comment '期望（计划）离职日期'
)
    comment '公司单位' charset = utf8mb4;

create table inner_messages
(
    id         char(36) collate utf8_bin default '' not null
        primary key,
    uid        int                                  not null,
    content    varchar(250)              default '' not null,
    type       tinyint                   default 0  not null comment '消息类型, 0=系统消息',
    has_read   tinyint(1)                default 0  not null comment '是否已读',
    created_at datetime                             not null,
    updated_at datetime                             not null
)
    comment '站内消息' charset = utf8;

create table logs
(
    id              char(36) collate utf8mb4_bin not null comment '唯一ID'
        primary key,
    uid             int                          not null comment '用户ID',
    company_id      varchar(255)                 not null comment '单位ID, -1=无',
    log_type        tinyint                      not null comment '日志类型, 1=日报、2=周报、3=月报',
    done_content    text                         not null comment '完成内容',
    undone_content  text                         not null comment '未完成内容',
    plan_content    text                         not null comment '计划内容',
    summary_content text                         not null comment '工作总结',
    created_at      datetime                     not null,
    updated_at      datetime                     not null
)
    comment '日志管理' charset = utf8mb4;

create table memorandums
(
    id         char(36) collate utf8_bin           not null
        primary key,
    uid        int                                 not null,
    sort_index tinyint                  default 0  not null comment '排序',
    title      varchar(50) charset utf8 default '' not null,
    markdown   longtext                            null,
    created_at datetime                            not null,
    updated_at datetime                            not null
)
    comment '备忘录' charset = utf8mb4;

create table reminders
(
    id         char(36) collate utf8_bin default '' not null
        primary key,
    uid        int                                  not null comment '用户ID',
    content    varchar(200)              default '' not null,
    date       bigint(13)                           not null,
    type       tinyint(1)                default 1  null comment '事项类型, 1=待提醒, 2=已提醒',
    created_at datetime                             not null,
    updated_at datetime                             not null
)
    comment '事项提醒' charset = utf8;

create table tasks
(
    id         char(36) collate utf8_bin default '' not null
        primary key,
    uid        int                                  not null comment '用户ID',
    content    varchar(200)              default '' not null,
    date       bigint(13)                           not null,
    type       tinyint(1)                default 1  not null comment '进度类型: 1=待作业, 2=作业中, 3=已完成, 4=未完成',
    count      tinyint(1)                default 0  not null,
    created_at datetime                             not null,
    updated_at datetime                             not null
)
    comment '今日待办' charset = utf8;

create table todo_lists
(
    id         char(36) collate utf8_bin default '' not null
        primary key,
    uid        int                                  not null,
    content    text                                 not null comment '备注信息',
    status     tinyint                   default 1  not null comment '状态, 1=进行中, 2=完成',
    created_at datetime                             not null,
    updated_at datetime                             not null
)
    comment '活动清单' charset = utf8;

create table user_configures
(
    id                char(36) collate utf8_bin default '' not null
        primary key,
    uid               int                                  not null,
    is_task_notify    tinyint(1)                default 1  not null comment '待办任务通知',
    is_matter_notify  tinyint(1)                default 1  not null comment '提醒事项通知',
    created_at        datetime                             not null,
    updated_at        datetime                             not null,
    server_chan_sckey varchar(200)              default '' not null comment 'server酱SCKEY',
    constraint uid
        unique (uid)
)
    comment '用户配置表' charset = utf8;

create table users
(
    id         char(36) collate utf8_bin    default ''       not null
        primary key,
    uid        int                                           not null,
    provider   varchar(10)                  default 'github' not null,
    login_name varchar(50)                  default ''       not null,
    username   varchar(50)                  default ''       not null,
    password   varchar(32)                  default ''       not null,
    token      varchar(255)                 default ''       not null,
    avatar_url varchar(255)                 default ''       not null,
    location   varchar(255)                 default ''       not null,
    bio        varchar(255) charset utf8mb4 default ''       not null,
    email      varchar(50)                  default ''       not null,
    ip_addr    varchar(20)                  default ''       not null,
    role       tinyint(1)                   default 1        not null comment '权限，1=正常',
    created_at datetime                                      not null,
    updated_at datetime                                      not null
)
    charset = utf8;

