FROM rabbitmq:3.11.11-management-alpine

ARG DK_UID

ARG DK_GID

RUN apk --no-cache add shadow && \
  usermod -u ${DK_UID:-1000} rabbitmq && \
  groupmod -g ${DK_GID:-1000} rabbitmq
