echo "部署到 GitHub Pages..."
git push


echo "部署到 Aliyun Server..."
# 构建
mkdocs build

# 在 OSS 中同步 search_index.json
ossutil cp e:/_notes/Wiki/site/search/search_index.json oss://dwj-oss/search-files/ --force

# 修改 js 中的 search url
OLD_STRING="search/search_index.json"
NEW_STRING="https://cdn.dwj601.cn/search-files/search_index.json"
for file in site/assets/javascripts/bundle.*.min.js; do
    if [[ -f "$file" ]]; then
        sed -i "s|$OLD_STRING|$NEW_STRING|g" "$file"
        echo "已替换文件: $file"
    fi
done

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
