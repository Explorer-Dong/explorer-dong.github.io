git push

mkdocs build
ossutil rm -r oss://wiki-website/ -f
ossutil cp oss://dwj-oss/cdn-files/BingSiteAuth.xml oss://wiki-website/
ossutil cp -r ./site/ oss://wiki-website/
