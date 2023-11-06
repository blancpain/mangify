FROM node:16-alpine

WORKDIR /usr/src/server

COPY --chown=node:node . .
ENV NODE_ENV production

RUN npm ci --only=production
RUN npx prisma generate

USER node
CMD ["npm", "run", "start:migrate:prod"]
