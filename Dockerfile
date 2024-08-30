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

# Copier la configuration Nginx et les certificats SSL
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/certificat.cer /etc/nginx/certificat.cer
COPY nginx/Codesphere_key.key /etc/nginx/Codesphere_key.key

# Définir les permissions de la clé privée
RUN chmod 600 /etc/nginx/Codesphere_key.key \
    && chown nginx:nginx /etc/nginx/Codesphere_key.key

# Exposer les ports HTTP et HTTPS
EXPOSE 80 443

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
