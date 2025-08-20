# Configuration et Déploiement CodeSphere

## 🚀 Configuration des Variables d'Environnement

### 1. Créer le fichier `.env` local

Copiez le fichier `env.example` vers `.env` et remplissez les valeurs :

```bash
cp env.example .env
```

### 2. Variables requises

```env
# Backend API
VITE_API_BASE_URL=http://localhost:8000/api

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_votre_cle_publique

# Firebase (clés publiques)
VITE_FIREBASE_API_KEY=votre_api_key
VITE_FIREBASE_AUTH_DOMAIN=votre_projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre_projet_id
VITE_FIREBASE_STORAGE_BUCKET=votre_projet.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
VITE_FIREBASE_APP_ID=votre_app_id
VITE_FIREBASE_MEASUREMENT_ID=votre_measurement_id
```

## 🔧 Configuration Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Créez un nouveau projet ou sélectionnez un existant
3. Ajoutez une application web
4. Copiez les clés de configuration dans votre `.env`

## 💳 Configuration Stripe

1. Créez un compte sur [Stripe](https://stripe.com/)
2. Récupérez votre clé publique de test
3. Ajoutez-la dans `VITE_STRIPE_PUBLIC_KEY`

## 🏗️ Déploiement

### Développement local

```bash
npm install
npm run dev
```

### Build de production

```bash
npm run build
npm run preview
```

### Déploiement Netlify

1. Connectez votre repository GitHub à Netlify
2. Configurez les variables d'environnement dans Netlify
3. Le fichier `netlify.toml` gère automatiquement le routage SPA

## 📁 Structure des Services

- `src/services/http.js` - Client HTTP commun avec token Firebase
- `src/services/chatService.js` - API chat
- `src/services/stripeService.js` - Intégration Stripe
- `src/services/userService.js` - Gestion utilisateurs et abonnements

## 🔐 Sécurité

- ✅ Aucune clé en dur dans le code
- ✅ Token Firebase automatiquement ajouté aux requêtes API
- ✅ Validation premium côté backend uniquement
- ✅ Variables d'environnement sécurisées

## 🧪 Tests

```bash
npm test
```

## 📝 Notes Importantes

- Le fichier `.env` ne doit JAMAIS être commité
- Les clés Firebase sont publiques mais centralisées
- La validation premium se fait via le backend (webhook Stripe)
- Firestore reste utilisé pour les projets utilisateur
