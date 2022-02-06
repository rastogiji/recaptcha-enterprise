FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .
ENTRYPOINT export GOOGLE_APPLICATION_CREDENTIALS="/config/concise-rune-302709-8b1061d23b8a.json"
EXPOSE 80
CMD [ "node", "server.js" ]