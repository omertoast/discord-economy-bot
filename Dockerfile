FROM node:15.6.0-alpine3.10 as builder

WORKDIR /usr/app

COPY . .
RUN npm ci

RUN npm run build

FROM node:15.6.0-alpine3.10

WORKDIR /usr/app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/prisma ./prisma

RUN npm run prisma:generate

WORKDIR /usr/app/dist

CMD [ "node", "app.js"]