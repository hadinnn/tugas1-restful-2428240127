const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
});

app.use(express.json());

let articles = [
  { id: 1, judul: 'Mengenal REST API', isi: 'REST adalah gaya arsitektur ...', penulis: 'Nadia Putri', kategori: 'Teknologi', dipublikasikan: true},
  { id: 2, judul: 'Tragedi Dibalik Asap di Palembang', isi: 'Isi artikel tentang tragedi di Palembang', penulis: 'Aldi Wijaya', kategori: 'Tragedi', dipublikasikan: false },
  { id: 3, judul: 'Pentingnya Edukasi Digital', isi: 'Edukasi digital sangat penting di era modern', penulis: 'Siti Nurhaliza', kategori: 'Pendidikan', dipublikasikan: true }
];
let nextId = 4;

// GET /articles 
// Body: {"id":1,"judul":"Mengenal REST API","isi":"REST adalah gaya arsitektur ...","penulis":"Nadia Putri","kategori":"Teknologi","dipublikasikan":true},{"id":2,"judul":"Tragedi Dibalik Asap di Palembang","isi":"Isi artikel tentang tragedi di Palembang","penulis":"Aldi Wijaya","kategori":"Tragedi","dipublikasikan":false},{"id":3,"judul":"Pentingnya Edukasi Digital","isi":"Edukasi digital sangat penting di era modern","penulis":"Siti Nurhaliza","kategori":"Pendidikan","dipublikasikan":true}
// app.get('/articles', (req, res) => {
//   res.json(articles);
// });

// GET /articles?kategori=Teknologi
// Body: {"id":1,"judul":"Mengenal REST API","isi":"REST adalah gaya arsitektur ...","penulis":"Nadia Putri","kategori":"Teknologi","dipublikasikan":true}
app.get('/articles', (req, res) => {
  const { kategori } = req.query;

  if (kategori) {
    const hasil = articles.filter((a) => a.kategori === kategori);
    return res.json(hasil);
  }

  res.json(articles);
});

// GET /articles/1
// Body: {"id":1,"judul":"Mengenal REST API","isi":"REST adalah gaya arsitektur ...","penulis":"Nadia Putri","kategori":"Teknologi","dipublikasikan":true}
app.get('/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = articles.find((a) => a.id === id);

  if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });
  res.json(data);
});

// POST /articles
// Body: {"judul":"Judul Artikel Baru","isi":"Isi artikel baru","penulis":"Nama Penulis","kategori":"Kategori Artikel","dipublikasikan":true/false}
app.post('/articles', (req, res) => {
  const { judul, isi, penulis, kategori, dipublikasikan } = req.body;

  if (!judul || !isi || !penulis || !kategori) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  const baru = { id: nextId++, judul, isi, penulis, kategori, dipublikasikan };

  articles.push(baru);
  res.status(201).json(baru);
});

// PUT /articles/1
// Body: {"judul":"Judul Artikel Diperbarui","isi":"Isi artikel diperbarui","penulis":"Nama Penulis Diperbarui","kategori":"Kategori Artikel Diperbarui","dipublikasikan":true/false}
app.put('/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = articles.findIndex((a) => a.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }

  articles[index] = { ...articles[index], ...req.body, id };
  res.json(articles[index]);
});

// DELETE /articles/1
// Body: {}
app.delete('/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = articles.findIndex((a) => a.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }

  articles.splice(index, 1);
  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).json({ message: `Rute ${req.method} ${req.originalUrl} tidak ditemukan` });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

