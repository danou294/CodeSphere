# Guide de Style Apple pour CodeSphere

Ce guide documente l'implémentation des styles Apple-style dans CodeSphere, basés sur les principes de design d'iOS et macOS.

## 🎨 Palette de Couleurs

### Surfaces (Grays)
- **Surface-0**: Blanc pur / Gris quasi-noir (dark)
- **Surface-50**: Blanc cassé / Gris très sombre (dark)
- **Surface-100-200**: Gris très clairs pour les fonds
- **Surface-300-400**: Gris moyens pour les bordures
- **Surface-500-600**: Gris pour le texte secondaire
- **Surface-700-800**: Gris sombres pour le texte principal
- **Surface-900-950**: Gris très sombres pour les titres

### Couleurs Principales
- **Primary**: Bleu système iOS/macOS (#0A84FF)
- **Accent**: Indigo doux pour les highlights (#5856D6)
- **Success**: Vert iOS (#34C759)
- **Warning**: Jaune iOS (#FFCC00)
- **Error**: Rouge iOS (#FF3B30)

## 🔘 Système de Boutons

### 1. Filled (CTA Principal)
```css
.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700 shadow-sm;
}
```
- Utilisation : Actions principales, CTA
- Style : Fond bleu plein, texte blanc, ombre légère
- Hover : Légèrement plus sombre + translate-y(-0.5)

### 2. Tinted (Secondaire)
```css
.btn-secondary {
  @apply bg-surface-100 text-surface-950 border border-surface-200;
}
```
- Utilisation : Actions secondaires, navigation
- Style : Fond gris clair, bordure subtile, texte très sombre
- Hover : Fond légèrement plus sombre + translate-y(-0.5)

### 3. Plain (Texte Seul)
```css
.btn-ghost {
  @apply text-primary-600 hover:bg-primary-50;
}
```
- Utilisation : Actions discrètes, liens
- Style : Texte coloré, fond transparent
- Hover : Fond très léger + translate-y(-0.5)

## 📝 Hiérarchie Typographique Apple

### Titres Principaux
```css
h1 {
  @apply text-6xl md:text-7xl font-bold leading-tight tracking-tight;
}
```
- Mode clair : Gris très sombre (#0A0A0A)
- Mode sombre : Blanc pur (#FFFFFF)
- **tracking-tight** pour un rendu net et professionnel

### Titres Secondaires
```css
h2 {
  @apply text-4xl md:text-5xl font-bold leading-tight tracking-tight;
}
```
- Mode clair : Gris sombre (#171717)
- Mode sombre : Blanc cassé (#F5F5F5)

### Titres Tertiaires
```css
h3 {
  @apply text-2xl md:text-3xl font-semibold leading-tight tracking-tight;
}
```
- Mode clair : Gris foncé (#262626)
- Mode sombre : Gris clair (#E5E5E5)

### Texte Principal
```css
p {
  @apply leading-relaxed text-surface-700 dark:text-surface-300;
}
```
- Mode clair : Gris moyen (#404040)
- Mode sombre : Gris moyen (#D4D4D4)

### Texte Secondaire
```css
text-surface-600 dark:text-surface-400
```
- Mode clair : Gris clair (#525252)
- Mode sombre : Gris sombre (#A3A3A3)

## 📏 Grille & Espacements (8pt)

### Marges Verticales
- **16px** : Espacement minimal (py-4)
- **24px** : Espacement standard (py-6)
- **32px** : Espacement confortable (py-8)
- **48px** : Espacement section (py-12)
- **64px** : Espacement large (py-16)

### Zones Cliquables
```css
min-h-[44px] /* Minimum Apple pour les zones tactiles */
```

## 🎭 Animations & Interactions

### Transitions Spring Apple
```tsx
transition={{ 
  type: "spring", 
  stiffness: 320, 
  damping: 30, 
  mass: 0.8 
}}
```

### Hover Effects
- **Scale** : Éviter, privilégier translate-y(-0.5)
- **Y** : -0.5px pour les boutons, -2px pour les cartes
- **Duration** : 200ms pour les couleurs

### Active States
```tsx
whileTap={{ scale: 0.98 }} /* Très subtil, 50-80ms */
```

### Focus Rings
```css
*:focus-visible {
  @apply ring-2 ring-primary-500 ring-offset-0;
}
```

## 🃏 Composants Apple

### Cards
```css
.card {
  @apply rounded-2xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-sm;
}
```
- Bordures très subtiles avec transparence
- Ombres légères (shadow-sm max)
- Coins arrondis généreux (rounded-2xl)
- Backdrop blur pour l'effet de verre

### Badges
```css
.badge-primary {
  @apply bg-primary-600/10 text-primary-800 dark:text-primary-300 border border-primary-600/15;
}
```
- Fond très transparent (10-15%)
- Bordures subtiles avec transparence
- Couleurs sémantiques avec bon contraste

### Glassmorphism
```css
.glass {
  @apply bg-white/80 dark:bg-white/6 backdrop-blur-xl border border-white/40 dark:border-white/10;
}
```
- Fond semi-transparent (80% en clair, 6% en sombre)
- Backdrop blur prononcé
- Bordures subtiles avec transparence

## 🚀 Motion-Safe & Accessibilité

### Motion-Safe Utilities
```css
.motion-safe\:animate-float {
  @apply animate-float;
}

@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-pulse-slow {
    animation: none;
  }
}
```

### Focus Management
- **Ring-offset-0** pour un rendu Apple
- **Ring-primary-500** pour la cohérence
- **Focus-visible** pour l'accessibilité

## 📱 Responsive & Dark Mode

### Dark Mode
- Surfaces : Gris très sombres avec transparence
- Textes : Blancs et gris clairs pour un contraste optimal
- Bordures : Blanc avec très faible opacité (10-40%)

### Responsive
- Espacement généreux sur mobile (multiples de 8)
- Grilles adaptatives
- Boutons pleine largeur sur mobile
- Zones cliquables minimum 44px

## 🎯 Micro-Polish Apple

### Navbar
- **Hauteur** : h-20 (80px) pour plus d'espace
- **Translucide** : bg-white/80 dark:bg-surface-0/80
- **Backdrop-blur** : backdrop-blur-xl
- **Bordures** : border-white/40 dark:border-white/10

### Menu Profil
- **Largeur** : w-64 (256px) pour plus d'espace
- **Translucide** : bg-white/70 dark:bg-surface-0/70
- **Backdrop-blur** : backdrop-blur-xl
- **Fermeture** : onBlur/clickOutside pour UX propre

### Hero Section
- **Espacement** : pt-24 pb-16 (96px/64px)
- **Gradient subtil** : from-surface-100/80 to-transparent
- **Bouton Plain** : "En savoir plus" discret

### Features Cards
- **Icônes** : 24px (w-6 h-6) pour un rythme Apple
- **Espacement** : p-7 (28px) pour plus d'air
- **Hover** : y: -4px, scale: 1.01 très subtil

## 🚀 Utilisation

### Dans les Composants
```tsx
// Titre principal avec tracking-tight
<h1 className="text-6xl md:text-7xl font-bold tracking-tight">
  Titre Principal
</h1>

// Bouton avec hover translate-y
<motion.button
  whileHover={{ y: -0.5 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
  className="btn-primary px-6 py-3"
>
  Commencer
</motion.button>

// Card Apple-style
<div className="card p-7">
  <h3 className="text-xl font-semibold tracking-tight">Titre</h3>
  <p className="text-surface-600 dark:text-surface-400">Description</p>
</div>
```

### Animations Motion-Safe
```tsx
<motion.div
  className="motion-safe:animate-float"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
>
  Contenu animé
</motion.div>
```

## 🎯 Bonnes Pratiques

1. **Couleurs** : Utiliser primary pour les actions, accent pour les highlights
2. **Typographie** : Toujours tracking-tight pour les titres
3. **Espacements** : Multiples de 8 (16/24/32/48/64)
4. **Animations** : Spring avec stiffness 260-320, damping 28-34
5. **Hover** : Privilégier translate-y(-0.5) au lieu de scale
6. **Bordures** : Toujours très subtiles avec transparence
7. **Ombres** : shadow-sm maximum, jamais shadow-lg+
8. **Motion** : Respecter prefers-reduced-motion
9. **Focus** : ring-2 ring-primary-500 ring-offset-0
10. **Zones cliquables** : Minimum 44px de hauteur

## 🔧 Personnalisation

### Modifier les Couleurs
```css
:root {
  --primary-500: 212 100% 55%; /* Bleu système */
  --accent-500: 249 56% 54%;   /* Indigo */
}
```

### Ajouter de Nouveaux Styles
```css
.btn-custom {
  @apply btn bg-custom-500 text-white hover:bg-custom-600;
}
```

## 📚 Ressources

- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- [iOS Design Patterns](https://developer.apple.com/design/tips/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Ce guide est basé sur les principes de design d'Apple et adapté pour CodeSphere.*
