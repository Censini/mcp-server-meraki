# MCP Server Meraki

Serveur MCP (Model-Context-Protocol) pour l'API Meraki. Ce projet fournit une interface standardisée pour interagir avec l'infrastructure Meraki en utilisant le protocole MCP.

## 📋 Prérequis

- Node.js 18 ou supérieur
- npm
- Clé API Meraki

## 🔧 Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/Censini/mcp-server-meraki.git
cd mcp-server-meraki
```

2. Installez les dépendances :
```bash
npm install
```

## ⚙️ Configuration

1. Créez un fichier `.env` à la racine du projet avec les variables suivantes :
```bash
MERAKI_API_KEY=votre_clé_api
```

## 🚀 Démarrage

Pour lancer le serveur en mode développement :
```bash
npm start
```

## 🧪 Tests

Pour exécuter les tests :
```bash
npm test
```

## 🛠️ Technologies utilisées

- TypeScript
- Model Context Protocol SDK (@modelcontextprotocol/sdk)
- Zod pour la validation des données
- Jest pour les tests

## 📁 Structure du projet

```
src/
├── __tests__/     # Tests unitaires
├── services/      # Services métier
├── types/         # Types TypeScript
├── errors.ts      # Gestion des erreurs
└── server.ts      # Point d'entrée du serveur
```

## 🔍 Fonctionnalités

Le serveur MCP Meraki permet d'interagir avec l'API Meraki de manière standardisée en utilisant le protocole MCP. Il offre :

- Une interface cohérente pour la gestion des ressources Meraki
- Une validation stricte des données avec Zod
- Une gestion des erreurs robuste
- Une architecture modulaire et extensible

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout de ma fonctionnalité'`)
4. Push sur la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. 
