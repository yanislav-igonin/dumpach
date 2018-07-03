FROM postgres

ENV POSTGRES_PASSWORD prod-local
ENV POSTGRES_DB dumpach

COPY init.sql /docker-entrypoint-initdb.d/