FROM node:8.1.2

EXPOSE 4567

RUN mkdir -p /opt/arena
WORKDIR /opt/arena
COPY package.json /opt/arena
RUN npm --no-color install --production

COPY . /opt/arena/

CMD ["npm", "start"]
