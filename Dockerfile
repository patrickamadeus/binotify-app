FROM php:8.0-apache
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y libpq-dev
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pgsql pdo_pgsql
ADD ./src /var/www/html/
EXPOSE 80