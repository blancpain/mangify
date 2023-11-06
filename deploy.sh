#!/bin/bash

# Source NVM environment
source /home/admin/.nvm/nvm.sh

cd /home/admin/mangify

cd client/
npm install

cd ../server/
npm install
npm run build

cd ..

# remove old containers, images and volumes
docker compose down
docker stop $(docker ps -aq)
docker system prune -a -f
docker volume rm $(docker volume ls -q)

docker compose up -d
