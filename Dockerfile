FROM node:18 as builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM nginx:1.21-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist /usr/share/nginx/html
