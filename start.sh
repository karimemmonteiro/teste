#!/bin/bash

# Cria o diretório do banco de dados, se não existir
echo "Verificando se o diretório do banco de dados existe..."
mkdir -p ./data

# Verifica se o diretório foi criado com sucesso
if [ -d "./data" ]; then
  # Tenta criar o banco de dados
  echo "Criando o banco de dados..."
  touch ./data/dev.db

  # Verifica se o banco de dados foi criado com sucesso
  if [ -f "./data/dev.db" ]; then
    # Executa o Prisma Client e inicia o servidor Next.js
    echo "Gerando Prisma Client..."
    yarn prisma generate
    echo "Iniciando o servidor Next.js..."
    yarn next start
  else
    echo "Erro: O arquivo do banco de dados não pôde ser criado."
    exit 1
  fi
else
  echo "Erro: O diretório do banco de dados não pôde ser criado."
  exit 1
fi
