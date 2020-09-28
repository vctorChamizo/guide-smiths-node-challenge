FROM node:10-alpine

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn global add nodemon

EXPOSE 3000

CMD yarn run dev