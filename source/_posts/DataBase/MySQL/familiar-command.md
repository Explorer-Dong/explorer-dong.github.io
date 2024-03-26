---
title: familiar-command
categories: 
  - DataBase
  - MySQL
category_bar: true
---

# MySQL 常见命令

登录

```bash
mysql -uroot -p
```

启动

```bash
sudo systemctl start mysql
```

开机自启动

```bash
sudo systemctl enable mysql
```

检查是否在运行

```bash
sudo systemctl status mysql
```

重启

```bash
sudo systemctl restart mysql
```

刷新配置

```mysql
FLUSH PRIVILEGES;
```

