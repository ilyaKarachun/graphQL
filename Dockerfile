FROM node:19.7

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4004

CMD ["npm", "dev"]