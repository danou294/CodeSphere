# 🚀 CodeSphere Frontend

**Plateforme de développement moderne avec IA intégrée**

CodeSphere est une application web révolutionnaire qui combine un éditeur de code avancé, un chatbot IA intelligent, et des fonctionnalités de collaboration en temps réel. Créez, éditez et déployez vos projets avec une expérience utilisateur exceptionnelle.

## ✨ Fonctionnalités

### 🎯 **IDE Moderne**
- **Monaco Editor** intégré (même moteur que VS Code)
- **Support multi-langages** (JavaScript, Python, HTML, CSS, etc.)
- **Auto-sauvegarde** intelligente
- **Thème sombre/clair** adaptatif
- **Gestion des onglets** avancée

### 🤖 **Chatbot IA Premium**
- **Conversations illimitées** avec l'IA
- **Support Markdown** complet avec coloration syntaxique
- **Copie de code** en un clic
- **Génération automatique** de titres de conversations
- **Interface ChatGPT-like** moderne

### 🔐 **Authentification & Sécurité**
- **Firebase Authentication** (Google, Email/Mot de passe)
- **Gestion des sessions** persistantes
- **Sécurité premium** avec vérification de statut

### 💳 **Système Premium**
- **Intégration Stripe** pour les paiements
- **Accès premium** au chatbot IA
- **Interface de paiement** sécurisée

## 🛠️ Installation

### Prérequis
- **Node.js** 18+ 
- **npm** ou **yarn**
- **Compte Firebase** (gratuit)
- **Compte Stripe** (pour les paiements)

### 1. Cloner le projet
```bash
git clone https://github.com/danou294/CodeSphere.git
cd CodeSphere
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration Firebase

Créez un fichier `.env` à la racine du projet :

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe Configuration
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
VITE_API_BASE_URL=http://localhost:8000/api

# App Configuration
VITE_APP_NAME=CodeSphere
VITE_APP_VERSION=1.0.0
```

### 4. Configuration Firebase Firestore

Déployez ces règles dans votre console Firebase :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Règles pour les projets utilisateur
    match /projects/{projectId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Règles pour les utilisateurs
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == userId;
    }
    
    // Règles pour les projets mini IDE
    match /miniIDEProjects/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 5. Démarrer l'application
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 🏗️ Architecture

### **Frontend (React + Vite)**
```
src/
├── components/           # Composants React
│   ├── chat/            # Interface chatbot IA
│   ├── IDE/             # Éditeur de code Monaco
│   ├── Auth/            # Authentification
│   └── pages/           # Pages de l'application
├── hooks/               # Hooks personnalisés
├── services/            # Services API et Firebase
├── store/               # Gestion d'état Zustand
└── styles/              # Styles CSS personnalisés
```

### **Technologies Utilisées**
- **React 18** - Framework frontend
- **Vite** - Build tool moderne
- **Tailwind CSS** - Framework CSS
- **Monaco Editor** - Éditeur de code
- **Firebase** - Backend as a Service
- **Stripe** - Paiements
- **Zustand** - Gestion d'état
- **Framer Motion** - Animations
- **React Markdown** - Rendu Markdown

## 🎨 Interface Utilisateur

### **Design System**
- **Mode sombre/clair** adaptatif
- **Animations fluides** avec Framer Motion
- **Responsive design** mobile-first
- **Composants réutilisables** modulaires

### **Expérience Utilisateur**
- **Navigation intuitive** avec React Router
- **Notifications toast** pour le feedback
- **Chargement progressif** des composants
- **Gestion d'erreurs** robuste

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement

# Build
npm run build        # Build de production
npm run preview      # Prévisualisation du build

# Linting
npm run lint         # Vérification du code
npm run lint:fix     # Correction automatique
```

## 📱 Fonctionnalités Détaillées

### **Éditeur de Code**
- **Coloration syntaxique** pour 50+ langages
- **Auto-complétion** intelligente
- **Formatage automatique** du code
- **Recherche et remplacement** avancé
- **Gestion des erreurs** en temps réel

### **Chatbot IA**
- **Interface moderne** style ChatGPT
- **Support Markdown** avec rendu riche
- **Copie de code** avec boutons intégrés
- **Historique des conversations** persistant
- **Génération de titres** automatique

### **Gestion des Projets**
- **Création/édition** de projets
- **Sauvegarde automatique** en Firebase
- **Prévisualisation** en temps réel
- **Export** des projets

## 🚀 Déploiement

### **Vercel (Recommandé)**
```bash
npm run build
# Déployez le dossier 'dist' sur Vercel
```

### **Netlify**
```bash
npm run build
# Déployez le dossier 'dist' sur Netlify
```

### **Variables d'environnement de production**
Configurez les mêmes variables `.env` dans votre plateforme de déploiement.

## 🤝 Contribution

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

- **Issues** : [GitHub Issues](https://github.com/danou294/CodeSphere/issues)
- **Documentation** : [Wiki du projet](https://github.com/danou294/CodeSphere/wiki)
- **Email** : danielevy29@gmail.com

## 🎯 Roadmap

- [ ] **Collaboration en temps réel** (WebRTC)
- [ ] **Déploiement automatique** (Vercel/Netlify)
- [ ] **Extensions** personnalisées
- [ ] **Thèmes** supplémentaires
- [ ] **API** publique pour développeurs

---

**Fait avec ❤️ en France** 🇫🇷

*CodeSphere - Révolutionnez votre façon de développer*