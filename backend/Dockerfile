FROM node:17-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD [ "yarn", "start" ]
