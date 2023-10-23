FROM node:18

WORKDIR /usr/src/client

COPY . .

RUN npm install

ENV VITE_BACKEND_URL=/api

CMD ["npm", "run", "dev"]
