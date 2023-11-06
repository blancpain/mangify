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

# remove old containers & images (volumes should persist)
docker compose down
docker stop $(docker ps -aq)
docker rm -f $(docker ps -aq)
docker volume rm $(docker volume ls -q)
docker system prune -a

docker compose up -d
