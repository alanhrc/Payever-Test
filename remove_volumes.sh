docker compose down
find ./docker/volumes/rabbitmq ! -name '.gitignore' -delete
find ./docker/volumes/nosqldb ! -name '.gitignore' -delete
docker container prune --force
docker network prune --force
docker volume prune --force
docker rmi -f $(docker images -aq)
docker builder prune --force
