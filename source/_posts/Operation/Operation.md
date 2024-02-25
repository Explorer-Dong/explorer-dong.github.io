---
title: Operation
categories: Operation
category_bar: true
---

# Operation

## 前言

### 1. 内容大纲

全栈开发之 Linux 运维学习。在有了一定的前端的基础上，进行云计算运维相关知识的学习，内容包括但不限于

1. Linux基础：常用命令、文件及用户管理、文本处理、Vim工具使用
2. 网络基础：网络基础知识、TCP/IP协议、七层网络模型、Linux网络管理与配置
3. 服务器基础：SSH远程连接、文件上传下载、Nginx和MySQL服务器搭建、LVS负载均衡配置以及服务器优化经验
4. 自动化基础：Shell脚本编写、自动化运维工具Ansible的使用

- 部署流程

### 2. 学习资源

- 路线：[Linux运维学习路线 - 阿里云](https://developer.aliyun.com/learning/roadmap/linux)
- 文档：[菜鸟 Linux 教程](https://www.runoob.com/linux/linux-tutorial.html)
- 部署：[搭建一个自己的网站？看这个就够了！](https://www.bilibili.com/video/BV16A4y1X7vg/)

## 一、Linux 基础

Linux 是操作系统的一种，是便于用户与计算机资源进行交互的媒介

> [!note]
>
> - 操作系统的地位。在正式开始 Linux 操作系统的学习之前，有必要了解一下整个计算机组成中，操作系统的地位（如下图）。可以发现，操作系统其实为用户搭建了访问硬件资源、网络资源的桥梁，使用户能够方便地与计算机进行交互
>
>     <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402092306641.png" alt="image-20240209230617073" style="zoom:50%;" />
>
> - Linux 发展史。有必要了解一下 Linux 的发展史：Unix $\to$ Minix $\to$​ Linux (linux is not unix) ，因此往往称 Linux 为 类Unix。Unix 为最开始的操作系统，在此基础之上开发了只在教育界开源使用的 Minix 操作系统，最后由于 Minix 停止更新维护，一个学生在 Minix 的基础之上创造了 Linux 操作系统并且已经成为了当下最为流行的开源操作系统
> - Linux 发行版本。正因为其开源，从而诞生了很多的版本，其中的广为流行的发行版本主要有 Ubuntu、CentOS、Debian 等



## 二、网络基础



## 三、服务器基础

服务器 server 就是类似于一台台低配版电脑，量产后在全球各地通过网络为用户提供高质量的便捷服务。在学习服务器相关知识之前，有必要先了解计算机网络相关的概念，有助于后续理解代理系统等的运作逻辑与开发逻辑。在正式开始之前，首先罗列一下最基本的概念：

> [!note]
>
> - 云服务器：
>
>     - 实例：一个云服务器相当于一个抽象的类，在其中购买配置了指定的实例后相当于实例化一个类，从而一个云服务器对应一个实例
>     - ip 地址：一台云服务器对应唯一的一个 ip 地址。其中 IPv4 为
>     - 备案：所谓的网站备案其实是对云服务器进行备案。当前的形式是，对于指向中国大陆 ip 的云服务器需要备案，如果指向的是非中国大陆的 ip，就不需要备案了。一般而言，中文的指向 HK，英文的指向 UK
>     - 端口：一台电脑能做的肯定不止一种，ip 地址端口的概念就好比一台电脑可以有不同的功能模块，不同的端口对应服务器不同的数据通道，开发者可以通过不同的端口开发不同的功能，用户可以通过不同的端口使用一台服务器上的不同服务
>     - [宝塔面板](https://www.bt.cn/new/download.html)：由于 linux 操作系统的命令行操作方式与 windows 的图形化界面操作方式差别较大，对于习惯图形化操作的用户不友好，故有一系列**图形化管理** linux 操作系统的工具，宝塔面板就是其中的一个代表
>
> - 域名：
>
>     - 概念：代替 ip 地址访问的一种更加容易记忆与推广的媒介，通过 DNS 服务器将域名与 ip 地址进行绑定后，用户通过域名 domain 即可访问相应的服务器的资源
>     - 顶级域名：即 **域名+后缀** 的组合
>     - 二级域名：即 **主机名+域名+后缀** 的组合
>
> - 协议：
>
>     - 概念：服务器与用户进行数据传输的一种约定规则
>
>     - http：传统的数据传输协议，默认服务器 80 端口进行访问
>     - https：即 http + ssl，传统协议 + ssl 加密证书，默认服务器 443 端口访问
>     - ssl：即 Secret Sockets Layer 安全套件层，用于加密服务器与用户之间传输的数据。其中证书文件为 pem 文件，密钥文件为 key 文件
>
> - 网站框架：
>
>     - 目前两款主流的网站框架分别为 LNMP 与 LAMP，都是用于搭建 Web 服务器环境的**软件堆栈**
>     - LNMP：表示使用 Linux 操作系统、Nginx 作为 Web 服务器、MySQL 作为数据库、PHP 作为服务器端脚本语言的技术堆栈
>     - LAMP：表示使用 Linux 操作系统、Apache 作为 Web 服务器、MySQL 作为数据库、PHP 作为服务器端脚本语言的技术堆栈

### 3.1 网络系统



### 3.2 代理系统

简单来说就是连接用户与服务器的中间媒介，有正向代理、反向代理等实际应用，与以往传统的用户与服务器直连的方式不同，通过代理系统可以完成很多前者无法完成的任务，同时也有性能上质的飞跃，下面从理论的角度介绍代理系统的实际应用示例以及优势

#### 3.2.1 基本概念

- 正向代理：所谓的正向代理其实就是**面向用户**进行运作。常见的正向代理应用比如 VPN 服务就是很典型的一种。

- 反向代理：所谓的反向代理的与上述正向代理对应，就是**面向服务器**进行运作。常见的反向代理应用比如 Nginx 与 Apache 服务器就是典型的应用。通过选择性的配置性的从服务器获取数据返回给前端渲染给用户，来实现负载均衡、加速优化等效果

#### 3.2.2 反向代理应用举例

> 单服务器 + 单顶级域名 = 多网站

参考：[通过Nginx在一台服务器部署多个Web应用](https://blog.csdn.net/qq_38431321/article/details/123018259)

##### (1) 创建多个二级域名

多个网站可以通过**二级域名**的形式只依赖一个**顶级域名**，从而实现一个域名衍生出多个子域名的形式，即一级域名为 `baidu.com`，二级域名为 `mcn.baidu.com`、`career.baidu.com` 等等

##### (2) 解析二级域名绑定到服务器上

每一个**二级域名**都需要解析到相应的**IP地址**，即**主机记录**对应**记录值**，才能进行后续的访问。其实可以理解为，将不同的二级域名都绑定到当前的服务器上，像这样：

<img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126611.png" alt="image-20230826011106105" style="zoom:50%;" />

##### (3) 理解二级域名的访问

我们通过不同的二级域名访问网站时，其实就是访问不同的文件夹中的文件信息，像这样：

![image-20230826011328462](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126612.png)

##### (4) 实现不同的域名访问不同的文件

这时我们就需要配置 Nginx 的代理服务器了， Nginx 中的 nginx.conf 文件示例配置如下

```bash
#----- example project -----#
server {
    listen       443 ssl; # 监听的端口
    server_name  test.cn; # 监听的网址(domain)

    # ssl证书的相关文件路径
    ssl_certificate      /usr/local/nginx/ssl/test.cn_bundle.pem;
    ssl_certificate_key  /usr/local/nginx/ssl/test.cn.key;

    # ssl相关配置
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    # 项目路径
    location / {
        proxy_pass https://localhost:8080/; # 转向“本地”8080端口
        # root path;  						# 网站根目录
        # index demo.html;  				# 设置默认页
        # deny 127.0.0.1;  					# 拒绝的ip
        # allow 172.18.5.54; 				# 允许的ip       
    }
}
```

假如此时我们需要 `docs.example.com` 访问文档分站，`www.example.com` 与 `example.com` 都访问主站，我们就需要配置 Nginx 中的 nginx.conf 文件，如下

```bash
#----- docs.example.com 访问文档分站 -----#
server {
    listen       443 ssl; 			# 监听的端口
    server_name  docs.example.com; 	# 监听的网址

    # ssl证书的相关文件路径
    ssl_certificate      /usr/local/nginx/ssl/test.cn_bundle.pem;
    ssl_certificate_key  /usr/local/nginx/ssl/test.cn.key;

    # ssl相关配置
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    # 项目路径
    location / {
        root /usr/web/docs; 		# 网站根目录
    }
}

#----- www.example.com 访问主站 -----#
server {
    listen       443 ssl; 			# 监听的端口
    server_name  www.example.com; 	# 监听的网址

	# ssl证书的相关文件路径
    ssl_certificate      /usr/local/nginx/ssl/b.test.cn_bundle.pem;
    ssl_certificate_key  /usr/local/nginx/ssl/b.test.cn.key;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
		root /usr/web/www;  				# 根目录
    }
}

#----- example.com 通过重定向的方式也访问主站 -----#
server {
    listen       443 ssl; 			# 监听的端口
    server_name  www.example.com; 	# 监听的网址

	# ssl证书的相关文件路径
    ssl_certificate      /usr/local/nginx/ssl/b.test.cn_bundle.pem;
    ssl_certificate_key  /usr/local/nginx/ssl/b.test.cn.key;

    # ssl相关配置
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
		proxy_pass  https://www;  			# 请求转向 mysvr 定义的服务器列表
    }
}
```

## 四、自动化基础



## 部署

### 1. 部署 Flask

Flask 是使用 Python 作为后端语言的 Web 微框，旨在帮助开发者快速开发出一个小型网站。个人示例项目就采用了 Flask 框架，前端直接使用 Flask 自带的 Jinja2 进行渲染，数据库采用 MySQL。项目地址 [YunJinWeb](https://github.com/Explorer-Dong/YunJinWeb)，下面为以此项目为 demo 进行云服务器部署的过程

#### 1.1 远程连接服务器

服务器信息

```bash
[root@DwjDemo1 ~]# cat /etc/os-release

NAME="Alibaba Cloud Linux"								发行版的名称
VERSION="3 (Soaring Falcon)"							发行版的版本号
ID="alinux"												唯一的标识符
ID_LIKE="rhel fedora centos anolis"						一些类似的发行版
VERSION_ID="3"											发行版的版本编号
PLATFORM_ID="platform:al8"								平台的标识符
PRETTY_NAME="Alibaba Cloud Linux 3 (Soaring Falcon)"	可读的发行版名称和版本号
ANSI_COLOR="0;31"										ANSI终端输出的颜色: "0;31"，通常用于表示错误或警告信息
HOME_URL="https://www.aliyun.com/"						发行版的官方网站链接
```

连接方法

- 方法一：利用阿里云自带的服务器连接入口，远程连接服务器。输入 username 和 password
- 方法二：使用 MobaXterm 端口连接工具并使用 `yum update` 命令更新全局软件。输入 username 和 password


#### 1.2 配置 MySQL

##### (1) 放通端口

服务器放通端口3306

##### (2) 安装 MySQL 并启动

参考：[Linux安装mysql8.0（官方教程！）](https://blog.csdn.net/weixin_55914667/article/details/126410095)

##### (3) 配置 MySQL

设置 mysql 登录密码

在服务器中连接 mysql

```mysql
mysql -uroot -p
```

授予权限给自己

```mysql
# MySQL 5 版本
GRANT ALL ON *.* TO root@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

```mysql
# MySQL 8 版本
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

使用数据库

```mysql
use mysql
```

允许远程登录数据库

```mysql
update user set host = '%' where user = 'root';
```

刷新更新配置

```my
FLUSH PRIVILEGES;
```

#### 1.3 更改项目文件 config.py

修改项目中 `config.py` 中的配置信息

```python
# @Time   : 2023-12-03 23:25
# @File   : config.py
# @Author : Mr_Dwj

'''
配置文件：
	1. 数据库配置信息
	2. ...
'''

# 数据库的配置信息
HOSTNAME = ''
PORT = '3306'
DATABASE = 'test1'
USERNAME = ''
PASSWORD = ''
DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8mb4'.format(USERNAME, PASSWORD, HOSTNAME, PORT, DATABASE)
SQLALCHEMY_DATABASE_URI = DB_URI
```

#### 1.4 构造服务器数据库信息

由于数据库相关的资源已经被我存储在了本地 Windows，故直接在本地开发环境中利用 DataGrip 数据库管理工具将相应的信息复制到这台服务器的数据库中。

##### (1) 连接服务器数据库

<img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126613.png" alt="image-20231207232537233" style="zoom:50%;" />

<img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126614.png" alt="image-20231207232615304" style="zoom:50%;" />

##### (2) 拷贝本地资源至数据库

直接在 DataGrip 中将本地已经构建好的数据拷贝到远程服务器即可

<img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126615.png" alt="image-20231207232434015" style="zoom:50%;" />

#### 1.5 配置 Nginx

参考：[Linux安装Nginx（超详细步骤）](https://blog.csdn.net/qq_45752401/article/details/122660965)

##### (1) 放通端口

服务器放通80端口

##### (2) 安装 Nginx 并启动

进入 [nginx官网](http://nginx.org/en/download.html) 并下载稳定版至本地

<img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126616.png" alt="image-20231208234403083" style="zoom: 50%;" />

上传服务器（直接通过 MobaXterm 拖拽）后，解压到当前目录下并进入 nginx 文件夹

```bash
tar -zxvf nginx-1.20.tar.gz
cd "/home/nginx-1.20/"
```

配置 nginx 并编译安装

```bash
# 配置configure
# --prefix 代表安装的路径
# --with-http_ssl_module 安装ssl
# --with-http_stub_status_module 查看nginx的客户端状态
./configure --prefix=/usr/local/nginx-1.20 --with-http_ssl_module --with-http_stub_status_module

# 编译 安装
make && make install
```

进入 sbin 目录，启动 nginx

```bash
./nginx
```

> 遇到问题：解决启动遇到的端口占用的问题
>
> <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126617.png" alt="image-20231209001749320" style="zoom:67%;" />
>
> 解决方案：`killall -9 nginx` 杀掉 nginx 的进程，然后重启
>
> 最终结果：然后浏览器通过 http 协议默认的 80 端口访问公网 ip，就可以看到欢呼雀跃的一幕
>
> <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126618.png" alt="image-20231209001703919" style="zoom:67%;" />

#### 1.6 配置 python

##### (1) 安装 python

参考：[linux安装python](https://blog.csdn.net/weixin_64940494/article/details/126266917)

命令集合

```bash
# 安装python依赖
If you want a release build with all stable optimizations active (PGO, etc),please run ./configure --enable-optimizations

# 本地下载拖拽上传至服务器，解压安装包
tar -xvf Python-3.11.tgz

# 进入安装包，配置安装路径
cd Python-3.10.6
./configure --prefix=/usr/local/python311

# 编译 安装
make && make install

# 将最新的 python 创建软链链接
ln -s /usr/local/python311/bin/python3.11 /usr/bin/python311

# 修改 yum 依赖默认的 python 版本
vi /usr/libexec/urlgrabber-ext-down
vi /usr/bin/yum

# 修改防火墙
vi /usr/bin/firewall-cmd
vi /usr/sbin/firewalld

# 创建 pip 软连接
ln -s /usr/local/python311/bin/pip3.11 /usr/bin/pip311
```

vim 的编辑指令

```bash
# 进入编辑模式
i

# 退出编辑模式进入命令模式
Esc

# 保存并关闭文件
:w

# 退出vim编辑模式
:q
```

##### (2) 安装 python 环境管理包

安装 python 虚拟环境管理依赖

```bash
pip install virtualenvwrapper
```

配置虚拟环境

```bash
# 在根目录下进入.bashrc文件进行编辑
vi .bashrc
i

# ctrl+f进入末尾，粘贴一下文字，保存并退出
export WORKON_HOME=$HOME/.virtualenvs
VIRTUALENVWRAPPER_PYTHON=/usr/bin/python311
source /usr/local/bin/virtualenvwrapper.sh

# 刷新配置文件
source ~/.bashrc
```

> 刷新配置文件时报错：`virtualenvwrapper.sh: There was a problem running the initialization hooks.`
>
> 解决方案参考：[virtualenvwrapper.sh报错: There was a problem running the initialization hooks.解决](https://www.cnblogs.com/cpl9412290130/p/10019231.html)

#### 1.7 项目相关

##### (1) 创建 py 虚拟环境

创建虚拟 py 环境

```bash
mkvirtualenv --python=/usr/bin/python311 <EnvName>
```

启动虚拟环境

```bash
workon <EnvName>
```

退出虚拟环境

```bash
deactivate
```

##### (2) Git 版本管理

进入 python 虚拟环境目录 \<EnvName>

- 初次部署：拉取远程源文件

    ```bash
    git clone https://github.com/Explorer-Dong/YunJinWeb.git
    ```

- 后续更新：覆盖原始代码并重新运行应用

    ```bash
    git pull
    ```

##### (3) 配置 Flask 运行环境

安装所需py模块

```bash
pip install -r requirements.txt
```

##### (4) 运行 Flask 应用

**内测阶段**：使用 Flask 自带的服务器运行

运行 Flask 主接口文件 `app.py`，之后就可以通过 ip 地址 + 端口号的方式进行访问了

```bash
python app.py
```

> 运行app.py时报错，端口已被占用，解决方案：
>
> - 方法一：换一个端口运行
>
> - [方法二：](https://blog.csdn.net/weixin_45753080/article/details/124114096)杀死其余的端口占用进程，重启应用
>
>     ```bash
>     # 检测端口占用 
>     netstat -npl | grep "端口"
>                                                                                         
>     # 查找占用端口的进程的PID
>     sudo lsof -i:"端口"
>                                                                                         
>     # 根据PID杀死该进程
>     sudo kill -9 <PID>
>     ```

**公测阶段**：使用 uwsgi 应用服务器运行

安装配置 uwsgi 应用服务器后运行，之后就可以通过 ip 地址 + 端口号的方式进行访问了

- 安装 uwsgi 包

    ```bash
    pip install uwsgi
    ```

- 创建 uwsgi.ini 文件并编辑

    ```bash
    touch uwsgi.ini
    ```

    ```bash
    [uwsgi]
    
    # -------------------- 路径相关的设置 --------------------
    
    # 项目的路径
    chdir           = /root/.virtualenvs/test111/demo/
    
    # Flask的uwsgi文件配对的应用
    wsgi-file       = /root/.virtualenvs/test111/demo/app.py
    
    # 回调的app对象
    callable        = app
    
    # Python虚拟环境的路径
    home            = /root/.virtualenvs/test111
    
    # -------------------- 进程相关的设置 --------------------
    
    # 主进程
    master          = true
    
    # 最大数量的工作进程
    processes       = 10
    
    # 监听5000端口（或监听socket文件，与nginx配合）
    http            = :5000 
    
    # socket监听
    # socket        = /srv/[项目名称]/[项目名称].sock
    
    # 设置socket的权限
    # chmod-socket    = 666
    
    # 退出的时候是否清理环境
    vacuum          = true
    ```

- 通过 uwsgi 应用服务器运行 Flask 应用

    [uwsgi启动Flask项目(venv虚拟环境)](https://www.cnblogs.com/pengpengdeyuan/p/14742090.html)

    ```bash
    # 初始启动uwsgi指令
    uwsgi --ini uwsgi.ini
    ```

- [退出uwsgi但是不停止服务的操作](https://blog.csdn.net/wjwj1203/article/details/105336943)

    ```bash
    # 退出uwsgi但是不停止服务的操作
    uwsgi -d --ini uwsgi.ini
    
    # 此时想要停止就需要找到uwsgi的进程并全部杀死
    	# 找到所有uwsgi进程
    	ps -ef|grep uwsgi
    	
    	# 杀死所有进程
    	kill -9 <进程号>
    ```

##### (5) 一些 bug

问题一：读取json时出现问题

> error: UnicodeDecodeError: 'utf-8' codec can't decode byte 0xc3 in position 39: invalid continuation byte
>
> reason: 对 string 解码时出现错误
>
> solve: 
>
> 将app.py中的
>
> ```python
> with open('static/json/image_text.json', 'r') as f:
> 	image_text = json.load(f)
> ```
>
> 改为
>
> ```python
> with open('static/json/image_text.json', 'r', encoding='gbk') as f:
> 	image_text = json.load(f)
> ```
>
> 参考：<https://bobbyhadz.com/blog/python-unicodedecodeerror-utf-8-codec-cant-decode-byte>
