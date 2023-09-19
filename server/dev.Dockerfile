FROM node:18

WORKDIR /usr/src/server

COPY . .

RUN npm install

RUN npx prisma generate

CMD ["npm", "run", "dev"]