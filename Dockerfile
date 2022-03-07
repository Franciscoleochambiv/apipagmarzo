FROM node:10.13-alpine

WORKDIR /home/Descargas/paginafinal/apipagina

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 7008

CMD npm start
