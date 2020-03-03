FROM postgres:11.6

COPY ./docker-entrypoint-init.d/001-init-user-db.sh /docker-entrypoint-initdb.d/001-init-user-db.sh
RUN chmod +x /docker-entrypoint-initdb.d/001-init-user-db.sh
