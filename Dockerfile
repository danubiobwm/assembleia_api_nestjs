# imagem base
FROM node:18

# Diretório onde ficará a aplicação
WORKDIR /app

#Copia a pasta do código fonte
COPY . .

#Executa o comando para baixar as dependencias
RUN npm install

#Executar o comando de Build
RUN npm run build

CMD ["node", "dist/main.js"]


#Para criar o Banco em mysql Comando
#docker run --name assembleia-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=assembleia  -p 3306:3306 mysql