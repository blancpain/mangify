FROM node:16-alpine

WORKDIR /usr/src/server

COPY --chown=node:node . .

# Create postgres and redis data directories
RUN mkdir -p /var/lib/postgresql/data
RUN chown -R node:node /var/lib/postgresql/data
RUN mkdir -p /data
RUN chown -R node:node /data

ENV NODE_ENV production

RUN npm ci --only=production
RUN npx prisma generate

USER node
CMD ["npm", "run", "start:migrate:prod"]
