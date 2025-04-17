# 1. Image bazë për Node.js
FROM node:18

# 2. Vendos direktorinë e punës në container
WORKDIR /app

# 3. Kopjo vetëm varësitë për instalim më efikas
COPY package*.json ./

# 4. Instalimi i varësive
RUN npm install

# 5. Kopjo pjesën tjetër të kodit
COPY . .

# 6. Deklaro portin që përdor aplikacioni
EXPOSE 3001

# 7. Starto aplikacionin
CMD ["node", "index.js"]
