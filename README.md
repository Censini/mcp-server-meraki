# MCP Server Meraki

Serveur MCP (Model-Controller-Provider) pour l'API Meraki. Ce projet fournit une interface standardisée pour interagir avec l'infrastructure Meraki via des outils MCP.

## 📋 Prérequis

- Python 3.8 ou supérieur
- Clé API Meraki
- Docker (optionnel, pour le déploiement conteneurisé)

## 🔧 Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/Censini/mcp-server-meraki.git
cd mcp-server-meraki
```

2. Installez les dépendances :
```bash
pip install -r requirements.txt
```

## ⚙️ Configuration

1. Créez un fichier `.env` à la racine du projet :
```bash
MERAKI_API_KEY=votre_clé_api
MERAKI_BASE_URL=https://api.meraki.com/api/v1
```

2. Configurez les paramètres de votre environnement dans `config.yaml`

## 🚀 Fonctionnalités

### Disponibles
- Configuration de base du serveur MCP
- Intégration avec l'API Meraki
- Gestion des erreurs et logging

### À venir
- Liste des organisations Meraki
- Liste des réseaux par organisation
- Liste des équipements par réseau
- Gestion des interfaces
- Configuration des ports switch
- Gestion du sans-fil
- Statistiques de performance

## 🐳 Déploiement Docker

```bash
# Construire l'image
docker build -t mcp-server-meraki .

# Lancer le conteneur
docker run -d -p 8000:8000 --env-file .env mcp-server-meraki
```

## 🔍 Utilisation

Le serveur expose une API REST sur le port 8000 par défaut. Voici quelques exemples d'utilisation :

```bash
# Obtenir la liste des organisations
curl http://localhost:8000/api/organizations

# Obtenir les détails d'un réseau
curl http://localhost:8000/api/networks/{network_id}
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est sous licence MIT.