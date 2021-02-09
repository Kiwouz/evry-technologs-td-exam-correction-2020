# Image de base
FROM node:current-alpine

# Repertoire de travail
WORKDIR /usr/app/

# Copier mes fichiers dans l'images [to do : a optmiser]
#COPY server.js server.js
#COPY package.json package.json
#COPY Salad.js Salad.js
#COPY data data

# Installation des modules
RUN npm install
RUN npm install -g nodemon

# Lancement de l'application
CMD ["npm", "start"]
