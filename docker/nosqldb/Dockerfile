FROM mongo:5.0.3

ARG DK_UID
ARG DK_GID
ARG NOSQLDB_INITDB_DATABASES

RUN usermod -u ${DK_UID:-1000} mongodb
RUN groupmod -g ${DK_GID:-1000} mongodb

CMD ["mongod", "--bind_ip_all"]
