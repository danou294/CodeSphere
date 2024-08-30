# Étape de construction
FROM node:18-alpine AS builder

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

# Étape de production
FROM nginx:alpine

# Copier les fichiers de build depuis le conteneur de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port sur lequel Nginx écoute
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
