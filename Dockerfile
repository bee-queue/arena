FROM node:9

WORKDIR /app

COPY ./ /app

RUN npm install && npm i -g pm2@^3

EXPOSE 4567

CMD ["pm2", "start", "server.js", "--no-daemon"]