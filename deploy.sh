echo "部署到 GitHub Pages..."
git push

echo "部署到 Aliyun OSS..."
mkdocs build
ossutil rm -r oss://wiki-website/ -f
ossutil cp oss://dwj-oss/cdn-files/BingSiteAuth.xml oss://wiki-website/
ossutil cp -r ./site/ oss://wiki-website/
