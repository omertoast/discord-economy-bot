FROM node:15.6.0-alpine3.10

WORKDIR /usr/app
COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

WORKDIR /usr/app/dist/

CMD ["node", "app.js"]