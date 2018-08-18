FROM node:9

WORKDIR /usr/src/app

COPY package.json ./

ARG CACHEBUST=1

RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 9229

CMD ["npm", "run", "dev"]