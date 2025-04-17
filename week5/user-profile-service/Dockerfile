# 1. Image bazë për Node.js
FROM node:18

# 2. Working directory brenda container-it
WORKDIR /app

# 3. Kopjo vetëm varësitë për instalim më efikas
COPY package*.json ./

# 4. Instalo varësitë
RUN npm install

# 5. Kopjo të gjithë kodin tjetër
COPY . .

# 6. Shfaq portin që aplikacioni përdor
EXPOSE 3000

# 7. Starto aplikacionin
CMD ["node", "server.js"]
