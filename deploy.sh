echo "部署到 GitHub Pages..."
git push


echo "部署到 Aliyun Server..."
# 构建
mkdocs build

# 压缩传输
tar -czf site.tar.gz site/
sftp git@47.100.217.241 << EOF
put -r site.tar.gz /home/www/
bye
EOF
rm site.tar.gz

# 云端解压
ssh git@47.100.217.241 << EOF
cd /home/www/
rm -rf mkdocs-material-site/
mkdir mkdocs-material-site/
chown -R git:git mkdocs-material-site/
tar -xzf site.tar.gz -C mkdocs-material-site/ --strip-components=1
rm site.tar.gz
exit
EOF


echo "done."
