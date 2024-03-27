# Verwende die offizielle Node.js-Image als Basis
FROM node:20

# Setze das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopiere die package.json und package-lock.json Dateien
COPY package*.json ./

# Installiere die Projektabhängigkeiten
RUN npm install

# Kopiere den Rest der Anwendungsquelle
COPY . .


# Starte einen einfachen Server für die statischen Inhalte
CMD ["npm", "start"]
