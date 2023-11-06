#!/bin/bash

# Source NVM environment
source /home/admin/.nvm/nvm.sh

cd /home/admin/mangify

cd frontend/
npm install

cd ../backend/
npm install
npm run build

cd ..

# remove old containers & images (volume should persist)
docker compose down
docker stop $(docker ps -aq)
docker rm -f $(docker ps -aq)
docker image prune -a -f

docker compose up -d
