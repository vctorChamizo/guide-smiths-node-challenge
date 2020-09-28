FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn install

RUN yarn global add nodemon

COPY . .

EXPOSE 3000

CMD [ "yarn", "run", "dev" ]