FROM node:gallium-alpine3.17

LABEL name="api-vendas"
LABEL version="3.0"

WORKDIR /app

COPY . /app
RUN npm install --omit=dev

CMD ["npm", "run" , "prod"]