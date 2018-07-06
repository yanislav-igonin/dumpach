# Stage 1 - the build process
FROM node:9 as build-deps
WORKDIR /client
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY prod-local-nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-deps /client/build /etc/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
