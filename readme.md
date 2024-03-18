# CodeSphere

CodeSphere est une application web de développement de code collaboratif qui permet aux utilisateurs de créer, éditer et prévisualiser du code en temps réel.

## Installation

### Clonage et installation depuis Git

1. Ouvrez un terminal ou une ligne de commande.

2. Utilisez la commande suivante pour cloner le projet depuis Git :

    ```bash
    git clone https://github.com/danou294/CodeSphere.git
    ```

3. Accédez au répertoire du projet cloné en utilisant la commande `cd`.

    ```bash
    cd CodeSphere
    ```

4. Installez les dépendances en utilisant npm ou yarn. Utilisez l'une des commandes suivantes :

   Avec npm :

    ```bash
    npm install
    ```

### Configuration de Firebase

5. Configurez Firebase en ajoutant les informations de configuration dans un fichier `firebaseConfig.js`. Voici un exemple de contenu pour ce fichier :

    ```javascript
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
        measurementId: "YOUR_MEASUREMENT_ID"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth(app);

    export { app, firestore, auth };
    ```

6. Assurez-vous également de configurer les règles Firestore. Voici un exemple de règles Firestore :

    ```javascript
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // Autoriser la lecture à tous les utilisateurs.
        match /{document=**} {
          allow read: if true;
        }
        
        // Autoriser l'écriture dans la collection "projects" uniquement si l'utilisateur est authentifié.
        match /projects/{projectId} {
          allow read, write: if request.auth != null;
        }
        
        // Autoriser l'écriture dans la collection "miniIDEProjects" uniquement si l'utilisateur est authentifié.
        match /miniIDEProjects/{document=**} {
          allow read, write: if request.auth != null;
        }

        // Permet à chaque utilisateur authentifié d'accéder à son propre document dans la collection "users".
        match /users/{userId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }
    ```

### Démarrage de l'application

7. Lancez l'application en utilisant la commande suivante :

    ```bash
    npm run dev
    ```

   Cela démarrera l'application en mode développement. Vous pourrez y accéder depuis votre navigateur à l'adresse `http://localhost:5173/`.

Si vous avez des questions ou des problèmes lors de l'installation ou de l'utilisation, n'hésitez pas à demander de l'aide.
