---
title: deploy-flask
categories:
  - BackEnd
  - Python
  - Flask
category_bar: true
---

# 部署 Flask

Flask 是使用 Python 作为后端语言的 Web 微框，旨在帮助开发者快速开发出一个小型网站。个人示例项目就采用了 Flask 框架，前端直接使用 Flask 自带的 Jinja2 进行渲染，数据库采用 MySQL。项目地址 [YunJinWeb](https://github.com/Explorer-Dong/YunJinWeb)，下面为以此项目为 demo 进行云服务器部署的过程

## 远程连接服务器

服务器信息

```bash
[root@DwjDemo1 ~]# cat /etc/os-release

NAME="Alibaba Cloud Linux"                             发行版的名称
VERSION="3 (Soaring Falcon)"                           发行版的版本号
ID="alinux"                                            唯一的标识符
ID_LIKE="rhel fedora centos anolis"                    一些类似的发行版
VERSION_ID="3"                                         发行版的版本编号
PLATFORM_ID="platform:al8"                             平台的标识符
PRETTY_NAME="Alibaba Cloud Linux 3 (Soaring Falcon)"   可读的发行版名称和版本号
ANSI_COLOR="0;31"                                      ANSI终端输出的颜色: "0;31"，通常用于表示错误或警告信息
HOME_URL="https://www.aliyun.com/"                     发行版的官方网站链接
```

连接方法

- 方法一：利用阿里云自带的服务器连接入口，远程连接服务器。输入 username 和 password
- 方法二：使用 MobaXterm 端口连接工具并使用 `yum update` 命令更新全局软件。输入 username 和 password


## 配置 MySQL

### (1) 放通端口

服务器放通端口 3306

### (2) 安装 MySQL 并启动

CentOS：[Linux 安装 mysql8.0（官方教程！）](https://blog.csdn.net/weixin_55914667/article/details/126410095)

Ubuntu：[在Ubuntu 22.04 LTS 上安装 MySQL两种方式：在线方式和离线方式](https://blog.csdn.net/weixin_45626288/article/details/133220238)

### (3) 配置 MySQL

- 在服务器中连接 MySQL

    ```mysql
    mysql -uroot -p
    ```

- 重置密码

    ```mysql
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
    ```

- 使用数据库

    ```mysql
    use mysql
    ```

- 允许远程登录数据库

    ```mysql
    update user set host = '%' where user = 'root';
    ```

- 刷新更新配置

    ```mysql
    FLUSH PRIVILEGES;
    ```


### (4) 构造数据库信息

由于数据库相关的资源已经被我存储在了本地 Windows，故直接在本地开发环境中利用 DataGrip 数据库管理工具将相应的信息复制到这台服务器的 MySQL 数据库中即可。

- 首先我们需要在本地的 DataGrip 上连接服务器的 MySQL 数据库

    ![选择 MySQL 数据库](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126613.png)

    ![填写服务器信息并测试连接](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126614.png)

- 然后我们拷贝本地资源至数据库即可

    ![拷贝本地资源至数据库](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126615.png)


## 配置 Nginx

参考：[Linux 安装 Nginx（超详细步骤）](https://blog.csdn.net/qq_45752401/article/details/122660965)

### (1) 放通端口

服务器安全组放通 80 端口

### (2) 安装 Nginx 并启动

进入 [nginx 官网](http://nginx.org/en/download.html) 并找到以下内容：

![下载](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126616.png)

可以通过 wget 命令下载压缩包

```bash
wget https://nginx.org/download/nginx-1.24.0.tar.gz
```

也可以直接通过 MobaXterm 拖拽上传服务器，解压到当前目录下并进入 nginx 文件夹

```bash
tar -zxvf nginx-1.24.0.tar.gz
cd /home/nginx-1.24.0/
```

配置 nginx 并编译安装。

Ubuntu 需要额外手动安装 Nginx 的依赖库，详见 [ubuntu下安装nginx时PCRE库、zlib库、OpenSSL库的安装](https://blog.csdn.net/somanlee/article/details/69808788)

```bash
# 配置configure
# --prefix 代表安装的路径
# --with-http_ssl_module 安装ssl
# --with-http_stub_status_module 查看nginx的客户端状态
./configure --prefix=/usr/local/nginx-1.24.0 --with-http_ssl_module --with-http_stub_status_module

# 编译 安装
make && make install
```

进入 /usr/local/nginx-1.24.0/sbin/ 目录，启动 nginx

```bash
./nginx
```

{% fold info @解决：80 端口被占用的问题 %}

> 解决：端口被占用的问题
>
> ![解决启动遇到的端口占用](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126617.png)
>
> 解决方案：`killall -9 nginx` 杀掉 nginx 的进程，然后重启
>
> 最终结果：然后浏览器通过 http 协议默认的 80 端口访问公网 ip，就可以看到欢呼雀跃的一幕
>
> ![最终结果](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126618.png)

{% endfold %}

## 配置 Python

### (1) 安装 python

参考：[linux 安装 python](https://blog.csdn.net/weixin_64940494/article/details/126266917)

命令集合

```bash
# 本地下载拖拽上传至服务器或 wget 命令下载 py 压缩包，并解压安装包
tar -xvf Python-3.11.tgz

# 进入安装包，配置安装路径
cd Python-3.11
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

### (2) 安装 python 环境管理包

安装 python 虚拟环境管理依赖

```bash
pip install virtualenvwrapper
```

配置虚拟环境

```bash
# 在 /root/ 目录下进入.bashrc文件进行编辑
vi .bashrc

# ctrl+f进入末尾，粘贴以下文字，保存并退出
export WORKON_HOME=$HOME/.virtualenvs
VIRTUALENVWRAPPER_PYTHON=/usr/bin/python311
source /usr/local/bin/virtualenvwrapper.sh

# 刷新配置文件
source ~/.bashrc
```

{% fold info @解决：virtualenvwrapper.sh: There was a problem running the initialization hooks. 报错 %}

> 解决 `virtualenvwrapper.sh: There was a problem running the initialization hooks.` 报错
>
> - 解决方案二：注意上述 `VIRTUALENVWRAPPER_PYTHON=/usr/bin/python311` 中的路径是否正确
> - 解决方案一：[virtualenvwrapper.sh 报错: There was a problem running the initialization hooks.解决](https://www.cnblogs.com/cpl9412290130/p/10019231.html)

{% endfold %}

## 项目相关

### (1) 创建 py 虚拟环境

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

### (2) Git 版本管理

进入 python 虚拟环境目录 \<EnvName>

- 初次部署：拉取远程源文件

    ```bash
    git clone https://github.com/Explorer-Dong/YunJinWeb.git
    ```

- 后续更新：覆盖原始代码并重新运行应用

    ```bash
    git pull
    ```

### (3) 配置 Flask 运行环境

安装所需 py 模块

```bash
pip install -r requirements.txt
```

### (4) 更改项目配置文件 `config.py`

修改项目中 `config.py` 中的配置信息

```python
'''
配置文件：(模板文件，自定义)
	1. 数据库配置信息
	2. ...
'''

# 数据库的配置信息
HOSTNAME = '127.0.0.1'      # 数据库 ip 地址
PORT = '3306'               # 数据库端口，默认 3306
DATABASE = ''               # 数据库名
USERNAME = ''               # 数据库用户名
PASSWORD = ''               # 数据库密码

DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8mb4'.format(USERNAME, PASSWORD, HOSTNAME, PORT, DATABASE)
SQLALCHEMY_DATABASE_URI = DB_URI
```

### (5) 运行 Flask 应用

**内测阶段**：使用 Flask 自带的服务器运行

运行 Flask 主接口文件 `app.py`，之后就可以通过 ip 地址 + 端口号的方式进行访问了

```bash
python app.py
```

{% fold info @解决：Flask 的 5000 端口被占用的问题 %}

> 解决：Flask 的 5000 端口被占用的问题
>
> [杀死其余的端口占用进程，重启应用](https://blog.csdn.net/weixin_45753080/article/details/124114096)
>
> ```bash
># 检测端口占用
> netstat -npl | grep "5000"
> 
> # 查找占用端口的进程的PID
>    sudo lsof -i:"端口"
> 
> # 根据PID杀死该进程
>    sudo kill -9 <PID>
> ```

{% endfold %}

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
    chdir           = /root/.virtualenvs/<VirtualEnvName>/<ProjectName>/
    
    # Flask的uwsgi文件配对的应用
    wsgi-file       = /root/.virtualenvs/<VirtualEnvName>/<ProjectName>/app.py
    
    # 回调的app对象
    callable        = app
    
    # Python虚拟环境的路径
    home            = /root/.virtualenvs/<VirtualEnvName>
    
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

    [uwsgi 启动 Flask 项目(venv 虚拟环境)](https://www.cnblogs.com/pengpengdeyuan/p/14742090.html)

    ```bash
    # 初始启动uwsgi指令
    uwsgi --ini uwsgi.ini
    ```

- [退出 uwsgi 但是不停止服务的操作](https://blog.csdn.net/wjwj1203/article/details/105336943)

    ```bash
    # 退出uwsgi但是不停止服务的操作
    uwsgi -d --ini uwsgi.ini
    ```
    
    此时想要停止就需要找到uwsgi的进程并全部杀死
    
    ```bash
    # 找到所有uwsgi进程
    ps -ef|grep uwsgi
    
    # 杀死所有进程
    kill -9 <进程号>
    ```
