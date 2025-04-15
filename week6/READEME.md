READE ME # Microservices: User Profile & Product Catalog

# Microservices: User Profile & Product Catalog

Ky projekt përbëhet nga **dy mikroshërbime** të ndara që komunikojnë në mënyrë të sigurt duke përdorur **JWT authentication**. Të dhënat ruhen në **Supabase**.


## 🧩 Mikroshërbimet

### 1. 🧍‍♀️ User Profile Microservice (Porti 3000)

- **Qëllimi**: Menaxhimi i përdoruesve dhe autentikimi
- **Teknologji**: Node.js, Express, Supabase, JWT

#### Rutat kryesore:
- `POST /users` – regjistron një përdorues të ri
- `POST /auth/login` – login dhe gjenerim token
- `GET /users/me` – merr të dhënat e përdoruesit nga token
- `GET /users/:id` – merr përdorues sipas ID-së
- `PUT /users/:id` – përditëson të dhënat e përdoruesit

---

### 2. 🛒 Product Microservice (Porti 3001)

- **Qëllimi**: Menaxhimi i produkteve (CRUD)
- **Teknologji**: Node.js, Express, Supabase
- Të gjitha kërkesat janë të mbrojtura me `JWT`

#### Rutat kryesore:
- `GET /api/products` – merr listën e produkteve
- `GET /api/products/:id` – merr një produkt specifik
- `POST /api/products` – shton një produkt të ri
- `PUT /api/products/:id` – përditëson një produkt
- `DELETE /api/products/:id` – fshin një produkt

---

## 🔐 Flow i prezantimit

1. **Regjistrim i përdoruesit** në `http://localhost:3000/users`
2. **Login** në `http://localhost:3000/auth/login` për të marrë token
3. **Marrja e profilit** me `GET /users/me` duke përdorur token
4. **Përdorimi i tokenit** për të aksesuar `product microservice`:
   - Shto produkt
   - Përditëso produkt
   - Merr produktet
   - Fshij produkt

> Nëse nuk dërgohet një token valid në header, microservice i produkteve kthen `401 Unauthorized`.

---

## 🧪 Testimi

- Testimi është bërë me **Postman** dhe përfshin:
  - User registration
  - Login
  - JWT auth në të dy microservices
  - CRUD për produkte

---

## 🔗 Teknologjitë

- Supabase (PostgreSQL + REST API)
- Express.js (backend framework)
- JSON Web Tokens (siguri/autentikim)
- Postman (testim dhe dokumentim)


## 📸 Screenshots

![alt text](<Screenshot 2025-04-15 192429.png>) ![alt text](<Screenshot 2025-04-15 184108.png>) ![alt text](<Screenshot 2025-04-15 191012.png>) ![alt text](<Screenshot 2025-04-15 191219.png>) ![alt text](<Screenshot 2025-04-15 191314.png>) ![alt text](<Screenshot 2025-04-15 191525.png>) ![alt text](<Screenshot 2025-04-15 191728.png>) ![alt text](<Screenshot 2025-04-15 192002.png>) ![alt text](<Screenshot 2025-04-15 192219.png>)