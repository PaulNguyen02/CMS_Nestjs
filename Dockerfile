FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY dist ./dist

RUN addgroup -g 1001 -S company && \
    adduser -S vtcode -u 1001

RUN chown -R vtcode:company /app
USER vtcode

EXPOSE 3000 

CMD ["node", "dist/main.js"]