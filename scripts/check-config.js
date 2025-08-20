#!/usr/bin/env node

/**
 * Script de vérification de la configuration CodeSphere
 * Vérifie que toutes les variables d'environnement sont définies
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const requiredEnvVars = [
  'VITE_API_BASE_URL',
  'VITE_STRIPE_PUBLIC_KEY',
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_MEASUREMENT_ID'
];

function checkEnvFile() {
  const envFiles = ['.env', '.env.local', '.env.production'];
  let envContent = '';
  
  for (const file of envFiles) {
    const filePath = join(process.cwd(), file);
    if (existsSync(filePath)) {
      try {
        envContent = readFileSync(filePath, 'utf8');
        console.log(`✅ Fichier ${file} trouvé`);
        break;
      } catch (error) {
        console.log(`❌ Erreur lecture ${file}:`, error.message);
      }
    }
  }
  
  if (!envContent) {
    console.log('❌ Aucun fichier .env trouvé');
    return false;
  }
  
  return envContent;
}

function checkEnvVars(envContent) {
  const missingVars = [];
  
  for (const varName of requiredEnvVars) {
    if (!envContent.includes(varName + '=')) {
      missingVars.push(varName);
    }
  }
  
  if (missingVars.length > 0) {
    console.log('❌ Variables manquantes:');
    missingVars.forEach(varName => console.log(`   - ${varName}`));
    return false;
  }
  
  console.log('✅ Toutes les variables d\'environnement sont définies');
  return true;
}

function checkFiles() {
  const requiredFiles = [
    'src/services/http.js',
    'src/services/chatService.js',
    'src/services/stripeService.js',
    'src/services/userService.js',
    'src/firebaseConfig.js',
    'src/hoc/withSubscriptionCheck.js'
  ];
  
  let allFilesExist = true;
  
  for (const file of requiredFiles) {
    const filePath = join(process.cwd(), file);
    if (existsSync(filePath)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} manquant`);
      allFilesExist = false;
    }
  }
  
  return allFilesExist;
}

function main() {
  console.log('🔍 Vérification de la configuration CodeSphere...\n');
  
  // Vérifier les fichiers .env
  const envContent = checkEnvFile();
  if (!envContent) {
    process.exit(1);
  }
  
  // Vérifier les variables d'environnement
  if (!checkEnvVars(envContent)) {
    process.exit(1);
  }
  
  // Vérifier les fichiers requis
  if (!checkFiles()) {
    process.exit(1);
  }
  
  console.log('\n🎉 Configuration validée avec succès !');
  console.log('Vous pouvez maintenant lancer l\'application avec: npm run dev');
}

main();
