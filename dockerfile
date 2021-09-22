FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./

ARG port=3000

#Se crean las variables de entorno necesarias
ENV PORT=${port}
ENV BD=mongodb://mongo:27017/pokemon
ENV NODE_ENV=production
ENV TOKEN_SECRET = MiClavetoken
ENV TOKEN_EXPIRED_VALUE = 14
ENV TOKEN_EXPRIRED_TIMEDESCRIPTION = days
ENV BD=mongodb://Host.docker.internal:27017/pokemones
ENV MYSQL=Host.docker.internal,root,,test
ENV LISTA_BLANCA=localhost:${port},localhost:4200


ARG DOCKER_ENV
ENV NODE_ENV=${DOCKER_ENV} 

RUN npm install
COPY . .
EXPOSE ${port}
CMD ["npm", "start" ]