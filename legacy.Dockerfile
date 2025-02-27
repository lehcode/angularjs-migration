FROM node:6.17.1

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
