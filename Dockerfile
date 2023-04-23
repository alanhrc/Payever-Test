FROM node:18.12.0-alpine3.15

ARG DK_UID=1000

ARG DK_GID=1000

RUN apk --no-cache add shadow && \
  usermod -u ${DK_UID:-1000} node && \
  groupmod -g ${DK_GID:-1000} node

RUN npm install -g @nestjs/cli

USER node

RUN mkdir /home/node/project

WORKDIR /home/node/project
