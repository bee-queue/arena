FROM node:8-alpine

# - Upgrade alpine packages to avoid possible os vulnerabilities
# - Tini for Handling Kernel Signals https://github.com/krallin/tini
#   https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#handling-kernel-signals
RUN apk --no-cache upgrade && apk add --no-cache tini

WORKDIR /opt/arena

COPY package.json package-lock.json /opt/arena/
RUN npm ci --production && npm cache clean --force

COPY . /opt/arena/

EXPOSE 4567

USER node

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]
