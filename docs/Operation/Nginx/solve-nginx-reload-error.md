---
title: 解决 Nginx 重启报错
categories: 
  - 运维
  - Nginx
category_bar: true
index_img: https://dwj-oss.oss-cn-nanjing.aliyuncs.com/web-imgs/img-artical/nginx.png
---

## 前言

SSL 证书过期后尝试更新证书。

## 复现

重新上传 key 和 pem 文件后使用 `nginx -s reload` 命令尝试软重启 nginx，报错：

```bash
nginx: [error] invalid PID number "" in "/run/nginx.pid"
```

猜测应该是更新 nginx 后配置文件的路径被重置了，使用 `nginx -c "etc/nginx/nginx.conf"` 命令尝试更新配置文件路径，报错：

```bash
nginx: [emerg] bind() to 0.0.0.0:443 failed（98：Unknow Error）
```

猜测应该是 443 端口被占用

## 解决

- 使用 `netstat -anon | grep 443` 命令检查 443 端口占用情况
- 使用 `fuser -k 443/tcp` 命令杀死占用 443 端口的进程
- 重新运行 `nginx -c "/etc/nginx/nginx.conf"` 命令没有报错
- 重新运行 `nginx -s reload` 命令没有报错，nginx 重启成功，网站可以使用 https 加密访问

## 参考

[Nginx报错：nginx: [error] invalid PID number "" in "/run/nginx.pid" 解决方法](https://zhuanlan.zhihu.com/p/514997796)

[nginx: [emerg] bind() to 0.0.0.0:443 failed（98：Address already in use）解决方法](https://blog.51cto.com/u_15127641/4114557)