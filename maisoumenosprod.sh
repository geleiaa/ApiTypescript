#!/bin/bash

# Comandos para transpile da app, buildar uma imagem docker com a app,
# subir os containers necessarios, rodar as migrations
# e deixar tudo funcionando para testar o código transpilado

# Esse arquivo precisa estar no mesmo diretório do package.json

echo "Startando o "mais ou menos production" \n "

echo " \n Transpile do código \n "

npm run biudi

echo " \n Rodando Docker-Compose... \n "

sudo docker compose up -d

echo " \n Rodando Migrations... \n "

# rodar migrations com o código TS 
# porque não funcionou com o código transpilado

npm run typeorm migration:run -- -d ./src/shared/infra/database/index.ts

echo " \n Finished!!! \n "
