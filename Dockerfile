# Utiliser une image Node.js officielle
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

RUN npm start

# Exposer le port sur lequel Vite écoute en mode de développement
EXPOSE 3000

# Commande pour démarrer l'application en mode production
CMD ["npm", "run", "preview"]
