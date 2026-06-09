---
title: "解决服务器入侵攻击"
date: 2024-06-21
tags:
  - 网络安全
  - 云服务器
  - SSH 爆破
summary: "刚想登录阿里云看看云 GPU 怎么租的，结果给我报了个安全问题。平时都是直接忽略，今天有兴致看了一眼，不看不知道一看吓一跳，尼玛被一个从没去过且没有挂 VPN 的 IP 登陆了。虽然不是 root 用户登的并且机子上也没啥机密文件，但是还是..."
index_img: https://cdn.dwj601.cn/images/202406152121682.png
---

刚想登录阿里云看看云 GPU 怎么租的，结果给我报了个安全问题。平时都是直接忽略，今天有兴致看了一眼，不看不知道一看吓一跳，尼玛被一个从没去过且没有挂 VPN 的 IP 登陆了。虽然不是 root 用户登的并且机子上也没啥机密文件，但是还是有一种被人看光的感觉。他爹的，我也不知道该怎么报复，记录一下修复的过程。

## 1 确认被入侵

本来的公钥文件 `authorized_keys` 没了：

![本来的公钥文件 authorized_keys 没了](https://cdn.dwj601.cn/images/202406152117426.png)

本地进行 ssh 免密传输就失效了：

![需要输入密码说明 ssh 免密传输失效](https://cdn.dwj601.cn/images/202406152121682.png)

查看系统日志 `/var/log/auth.log` 发现被腾讯云的上海 IP 爆破了：

![发现真凶！](https://cdn.dwj601.cn/images/202406152121637.png)

## 2 调整鉴权信息

### 2.1 更改所有用户的密码

一共就创建了 root 超级用户和 git 普通用户。root 用户就没改了，把 git 用户的改了：

```bash
sudo passwd git

# 之后输入新密码即可
```

### 2.2 重新配置 ssh 密钥对

```bash
# 本地生成新的密钥对
ssh-keygen
```

然后在 `/home/git/.ssh/` 路径下重新创建了 `authorized_keys` 文本文件用来存放刚才本地生成的公钥信息。本地测试连接：

```bash
ssh git@xxx.xxx.xxx.xxx
```

不需要输入密码即连接成功，表明 ssh 通信建立成功。接下来使用 hexo 的部署就不需要输入密码了。

### 2.3 禁用密码登录

由于 root 用户我还需要使用密码登录，因此我仅仅禁用 git 用户的密码登录，只能通过 ssh 进行主机连接。

1）编辑 ssh 配置文件。编辑 `/etc/ssh/sshd_config` 文件，在末尾添加：

```bash
Match User git
PasswordAuthentication no
```

2）重启 ssh 服务。保存上述修改文件后运行：

```bash
sudo systemctl restart sshd
```

3）测试密码连接。禁用后换一台机子尝试进行 ssh 连接，连接失败说明设置成功：

![连接失败说明禁用密码登录设置成功](https://cdn.dwj601.cn/images/202406152152670.png)

## 3 问题溯源

曾经在新建 git 用户时没有设置登录密码？之前在创建这个 git 用户时，没有注意到密码是怎么设置的，可能设置的太简单了？或者没有设置密码？当时还记录了，如下：

![翻车原罪](https://cdn.dwj601.cn/images/202406152158086.png)

## 参考

[Error: Permission denied (publickey) - github.com](https://docs.github.com/en/authentication/troubleshooting-ssh/error-permission-denied-publickey?platform=linux)
