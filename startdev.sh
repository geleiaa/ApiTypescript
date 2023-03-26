#!/bin/bash

# Comandos necessarios para rodar o ambiente de desenvolvimento
# Criei para facilitar minha vida kk
# 
# Esse arquivo precisa estar no mesmo diretório do package.json
# 
# Para parar o server: Ctrl + C
# Para matar os containers: docker compose down

echo "Start dev environment... \n"

echo "\n Up docker containers \n"
sudo docker compose up -d

echo "\n Runing migrations \n"
npm run typeorm migration:run -- -d ./src/shared/infra/database/index.ts

echo "\n Start Server \n"
npm run dev
