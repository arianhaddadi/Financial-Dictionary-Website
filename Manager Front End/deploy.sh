git pull origin master
npm run build
rm -rf  /usr/share/nginx/html/*
cp -r build/*  /usr/share/nginx/html/
sudo nginx -s reload