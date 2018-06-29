FROM postgres

ENV POSTGRES_PASSWORD 123456
ENV POSTGRES_DB dumpach

COPY init.sql /docker-entrypoint-initdb.d/