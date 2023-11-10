FROM node:16-alpine as build-stage
WORKDIR /usr/src/client

COPY . .

RUN npm ci
ENV VITE_BACKEND_URL=/api
ENV NODE_ENV production

RUN npm run build

# copy to nginx for serving static files
FROM nginx:1.20.1

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/client/build /usr/share/nginx/html
