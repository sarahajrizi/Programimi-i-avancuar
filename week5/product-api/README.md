Project Description

This API allows users to manage a simple product catalog through standard HTTP methods: GET, POST, PUT, and DELETE. The data is stored and retrieved from a Supabase PostgreSQL database.

🧰 Technologies Used

Node.js with Express.js for API creation

Supabase for PostgreSQL database hosting

Postman for API testing

📊 API Endpoints

1. GET /api/products

Retrieves all products

Response Example:

[
  {
    "id": 1,
    "name": "kamera",
    "price": 20.99,
    "description": "Kufje wireless me bass të thellë"
  }
]

2. GET /api/products/:id

Retrieves a single product by its ID

Response Example:

{
  "id": 1,
  "name": "kamera",
  "price": 20.99,
  "description": "Kufje wireless me bass të thellë"
}

3. POST /api/products

Creates a new product

Request Body Example:

{
  "name": "kamera",
  "price": 20.99,
  "description": "Kufje wireless me bass të thellë"
}

Status: 201 Created

4. PUT /api/products/:id

Updates an existing product

Request Body Example:

{
  "name": "kamera HD",
  "price": 25.99,
  "description": "Kamerë e përditësuar me cilësi të lartë"
}

Status: 200 OK

5. DELETE /api/products/:id

Deletes a product by ID

Status: 204 No Content

📁 Database: Supabase Table - products

id

name

price

description

1

kamera

20.99

Kufje wireless me bass të thellë

RLS: DisabledSchema: public

📈 Testing with Postman

🔹 POST request:

Successfully added product kamera

Status: 201 Created

🔹 Supabase Response in Terminal:

Supabase response: {
  data: [ { id: 1, name: 'kamera', price: 20.99, description: 'Kufje wireless me bass të thellë' } ],
  error: null
}

🔹 Product visible in Supabase Table Editor:

Confirmed insertion of product in products table.

🔼 Conclusion

The Product Catalog API is fully functional. All CRUD operations were successfully tested using Postman and persisted in the Supabase database. The integration between Node.js backend and Supabase works as expected.

Prepared by: Sara Hajrizi

