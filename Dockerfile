FROM node:latest

RUN mkdir -p /var/www

WORKDIR /var/www

COPY . /var/www

EXPOSE 3003

CMD ["npm", "install", "&&", "gulp"]