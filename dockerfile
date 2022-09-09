FROM node

WORKDIR .
COPY package*.json ./

COPY . .

RUN yarn start

RUN apk add bash

EXPOSE 3000
CMD ["yarn", "start"]