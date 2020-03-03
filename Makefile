include .env
export $(shell sed 's/=.*//' .env)

postgresContainerName = kaf42-mephi-postgres
minioContainerName = kaf42-mephi-minio
nodejsContainerName = kaf42-nodejs

dev-server:
mkdir -p ./docker-data/minio/data/kaf42
docker-compose up -d ${postgresContainerName} ${minioContainerName}
yarn dev
postgres-cli:
docker-compose exec ${postgresContainerName} psql -d ${DB_NAME} -U ${DB_USER}
postgres-init-extensions:
docker-compose exec ${postgresContainerName} psql -U postgres -d ${DB_NAME} -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
kill-all:
docker kill $(docker ps -q)
sync:
yarn schema:sync
prod-server:
mkdir -p ./docker-data/minio/data/kaf42
docker-compose up -d
prod-server-build:
mkdir -p ./docker-data/minio/data/kaf42
docker-compose up -d —build
prod-yarn-install:
docker-compose run ${nodejsContainerName} yarn install
prod-schema-sync:
docker-compose run ${nodejsContainerName} yarn schema:sync