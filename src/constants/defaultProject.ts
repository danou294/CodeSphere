export const defaultProject = {
  html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mon Projet CodeSphere</title>
</head>
<body>
  <div class="container">
    <h1>Bienvenue sur CodeSphere !</h1>
    <p>Commencez à coder dès maintenant avec votre nouveau projet.</p>
    <button id="demo-btn" class="btn">Cliquez-moi !</button>
  </div>
</body>
</html>`,

  css: `/* Styles pour votre projet CodeSphere */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  text-align: center;
  padding: 2rem;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #a8edea);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.btn {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1.1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(238, 90, 36, 0.4);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(238, 90, 36, 0.6);
}

.btn:active {
  transform: translateY(0);
}`,

  js: `// JavaScript pour votre projet CodeSphere

// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("demo-btn");
  const container = document.querySelector(".container");
  
  let clickCount = 0;
  
  if (btn) {
    btn.addEventListener("click", function() {
      clickCount++;
      
      // Effet de clic
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
      
      // Messages dynamiques
      const messages = [
        "🎉 Première interaction !",
        "✨ Vous maîtrisez déjà !",
        "🔥 Vous êtes en feu !",
        "🚀 Prêt pour l'espace !",
        "💎 Développeur diamant !"
      ];
      
      const message = messages[Math.min(clickCount - 1, messages.length - 1)];
      
      // Créer une notification
      const notification = document.createElement("div");
      notification.textContent = message;
      notification.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 255, 127, 0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
      \`;
      
      document.body.appendChild(notification);
      
      // Supprimer la notification après 2 secondes
      setTimeout(() => {
        notification.remove();
      }, 2000);
      
      // Changer la couleur de fond du container
      const colors = [
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
      ];
      
      document.body.style.background = colors[clickCount % colors.length];
    });
  }
  
  // Animation CSS pour les notifications
  const style = document.createElement("style");
  style.textContent = \`
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  \`;
  document.head.appendChild(style);
});

// Fonction utilitaire pour déboguer
function debug(message) {
}

// Message de bienvenue
debug("Projet CodeSphere initialisé avec succès !");`
}
