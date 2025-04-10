const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = 3000;

// Lidhja me Supabase
const supabaseUrl = 'https://wxsktbfkltjzkkwzrucq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4c2t0YmZrbHRqemtrd3pydWNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNzM0NzgsImV4cCI6MjA1OTg0OTQ3OH0.HT0dMhTjqe_LFAQhUDa-POPykLX02UyVwIy4HZ723sE';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// GET all products
app.get('/api/products', async (req, res) => {
  console.log("GET /api/products");
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error("GET error:", error.message);
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// GET product by ID
app.get('/api/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`GET /api/products/${id}`);
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("GET by ID error:", error.message);
    return res.status(404).json({ message: "Produkt nuk u gjet." });
  }
  res.json(data);
});

// POST a new product
app.post('/api/products', async (req, res) => {
  const { name, price, description } = req.body;
  console.log("POST /api/products me:", { name, price, description });

  const { data, error } = await supabase
    .from('products')
    .insert([{ name, price, description }])
    .select();

  console.log("Supabase response:", { data, error });

  if (error) {
    console.error("POST error:", error.message);
    return res.status(400).json({ error: error.message });
  }
  res.status(201).json(data[0]);
});

// PUT update product
app.put('/api/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, description } = req.body;
  console.log(`PUT /api/products/${id} me:`, { name, price, description });

  const { data, error } = await supabase
    .from('products')
    .update({ name, price, description })
    .eq('id', id)
    .select();

  if (error || !data.length) {
    console.error("PUT error:", error?.message || "Produkt nuk ekziston");
    return res.status(404).json({ message: "Produkt nuk ekziston." });
  }
  res.json(data[0]);
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`DELETE /api/products/${id}`);

  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    console.error("DELETE error:", error.message);
    return res.status(400).json({ error: error.message });
  }
  res.status(204).send();
});

// Run server
app.listen(port, () => {
  console.log(`Product API running at http://localhost:${port}/api/products`);
});
